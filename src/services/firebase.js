import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, setDoc, getDoc, doc, getDocs } from "firebase/firestore"
import {getDownloadURL, ref, uploadBytesResumable, getStorage} from "firebase/storage"
import { v4 as uuid } from "uuid";

const firebaseConfig = {
    apiKey: "AIzaSyDigieDvTRv0Zj5zXo840ikw3g2CUQqsxE",
    authDomain: "chat-room-f55c4.firebaseapp.com",
    projectId: "chat-room-f55c4",
    storageBucket: "chat-room-f55c4.appspot.com",
    messagingSenderId: "806775002952",
    appId: "1:806775002952:web:169b22cb5e2cd96f36457d"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        const {user} = await signInWithPopup(auth, provider)

        return {uid: user.uid, displayName: user.displayName, avatar: user.photoURL}
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}

const uploadFileToFirebase = async (file) => {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log("progress", progress);
        },
        (error) => {
            console.error("Failed to upload avatar:", error);
            throw error;
        }
    );

    await uploadTask;
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
}

const loginWithNormalUser = async (user) => {
    try {
        if (user.file) {
            const downloadURL = await uploadFileToFirebase(user?.file);
            user.avatar = downloadURL;

            delete user.file
        }

        user.avatarPreview && delete user.avatarPreview
        user.rePassword && delete user.rePassword
        user.uid = uuid()
      
        await setDoc(doc(db, "users", user.uid), user);

        const data = await getDoc(doc(db, 'users', user.uid))
      
        if(data.exists()){
            return data.data()
            // sessionStorage.setItem('user', JSON.stringify(data.data()))
        }
    } catch (error) {
       
    }
}

const sendMessage = async (roomId, user, text, files) => {
    try {
        let document = {
            uid: user.uid,
            displayName: user.displayName,
            timestamp: serverTimestamp(),
            avartar: user?.avatar
        }

        if(text){
            document.text = text.trim()
            await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), document)
            delete document.text
        }

        if(files?.length > 0){
            let newFiles = files.map(item => item.file)
            newFiles.map(async (fileItem) => {
                const downloadURL = await uploadFileToFirebase(fileItem);
                fileItem?.type.includes("image") ? document.img = downloadURL : document.video = downloadURL
               
                await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), document)

                document.img && delete document.img
                document.video && delete document.video
            })
        }
    } catch (error) {
        console.error(error);
    }
}

const getMessages = (roomId, callback) => {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            callback(messages)
        }
    )
}

const getAllUser = async () => {
    const snapshot = await getDocs(collection(db, 'users'))
    const uers = snapshot.docs.map((doc) => doc.data());

    return uers
}

export { loginWithGoogle, sendMessage, getMessages, loginWithNormalUser, getAllUser };
