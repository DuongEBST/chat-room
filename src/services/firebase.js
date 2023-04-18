import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore"
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

        return {uid: user.displayName, displayName: user.displayName, avatar: user.photoURL}
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}

const sendMessage = async (roomId, user, text, image) => {
    try {
        let document = {
            uid: user.uid,
            displayName: user.displayName,
            timestamp: serverTimestamp(),
            avartar: user?.avatar
        }

        if(text){
            document.text = text.trim()
        }

        if(image){
            const storageRef = ref(storage, uuid())
            const uploadTask = uploadBytesResumable(storageRef, image)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                      Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                      console.log('progress', progress)
                  },
                (error) => {
                   //hanlde error 
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        document.img = downloadURL
                        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), document)
                    })
                }
            )
        }else{
            await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), document)
        }
    } catch (error) {
        console.error(error);
    }
}

const getMessages = (roomId, callback) => {
    console.log("vào")
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

            console.log("messages", messages)
            callback(messages)
        }
    )
}

export { loginWithGoogle, sendMessage, getMessages };
