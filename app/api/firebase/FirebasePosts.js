import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/storage';

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

let dbFireStore = firebase.firestore();

export async function createTextPost({ title, description, type, category, content, username, time }) {
    try {
        const db = firebase.firestore();
        db.collection("posts")
            .doc(uuidv4())
            .set({
                title: title,
                description: description,
                content: content,
                type: type,
                category: category,
                content: content,
                username: username,
                time: time,
            });
    } catch (err) {
        Alert.alert("Could not create post right now.", err.message);
    }
}

async function uploadImgStorage(imageURI, imagesDB, id, count) {

    // grab name of image, which is the last part of the path
    const splitArr = imageURI.split("/")
    let newURI = splitArr[splitArr.length - 1]

    console.log(newURI)

    // get db path to image
    const imageRef = imagesDB.ref(newURI)

    console.log("asfasdf", imageRef)

    // comvert image to blob
    const response = await fetch(imageURI);
    const blob = await response.blob();

    console.log("here")

    let urlRes
    // insert blob into db and return the download path
    await imageRef.put(blob).on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
        console.log("total bytes transferring:", snap.totalBytes)
    }, (err) => {
        console.log(err)
    }, async () => {
        const url = await imageRef.getDownloadURL();
        dbFireStore.collection("posts")
            .doc(id)
            .update({
                [count]: url
            })
    })

}


export async function createImagePost({ title, description, type, category, content, username, time }) {
    let id = uuidv4()
    try {
        dbFireStore.collection("posts")
            .doc(id)
            .set({
                title: title,
                description: description,
                type: type,
                category: category,
                username: username,
                time: time,
            });
    } catch (err) {
        Alert.alert("Could not create post right now.", err.message);
    }

    
    // firebase storage, which is differen than firestore
    const imagesDB = firebase.storage();

    let count = 0

    // upload each image, then update the document with the urls 
    // (really ugly, but needed due to async function calls being annoying)
    if (content["first"]) {
        await uploadImgStorage(content["first"], imagesDB, id, count++)
    }

    if (content["second"]) {
        await uploadImgStorage(content["second"], imagesDB, id, count++)
    }

    if (content["third"]) {
        await uploadImgStorage(content["third"], imagesDB, id, count++)
    }

    if (content["fourth"]) {
        await uploadImgStorage(content["fourth"], imagesDB, id, count++)
    }

    if (content["fifth"]) {
       await uploadImgStorage(content["fifth"], imagesDB, id, count++)
    }


}



export async function getPosts() {
    try {
        const db = firebase.firestore();
        db.collection("posts")
            .get()
            .then((data) => {
                return data
            })
    } catch (err) {
        Alert.alert("Could not fetch posts right now.", err.message);
    }
}

