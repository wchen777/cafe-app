import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/storage';

/* Text */

export async function createTextPost({ title, description, type, category, content, username, time, likes, id, comments }) {
    try {
        const db = firebase.firestore();
        db.collection("posts")
            .doc(id)
            .set({
                title: title,
                description: description,
                content: content,
                type: type,
                category: category,
                content: content,
                username: username,
                time: time,
                likes: likes,
                id: id,
                comments: comments,
            });
    } catch (err) {
        Alert.alert("Could not create post right now.", err.message);
    }
}

/* Image */

async function uploadImgStorage(imageURI, imagesDB, id, count, dbFirestore) {

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

    // insert blob into db and return the download path
    await imageRef.put(blob).on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
        console.log("total bytes transferring:", snap.totalBytes)
    }, (err) => {
        console.log(err)
    }, async () => {
        const url = await imageRef.getDownloadURL();
        dbFirestore.collection("posts")
            .doc(id)
            .update({
                [count]: url
            })
    })

}


export async function createImagePost({ title, description, type, category, content, username, time, likes, id }) {
    let db = firebase.firestore();
    try {
        db.collection("posts")
            .doc(id)
            .set({
                title: title,
                description: description,
                type: type,
                category: category,
                username: username,
                time: time,
                likes: likes,
                id: id,
            });
    } catch (err) {
        Alert.alert("Could not create post right now.", err.message);
    }


    // firebase storage, which is different than firestore
    const imagesDB = firebase.storage();

    let count = 0

    // upload each image, then update the document with the urls 
    // (really ugly, but needed due to async function calls being annoying)
    if (content["first"]) {
        await uploadImgStorage(content["first"], imagesDB, id, count++, db)
    }

    if (content["second"]) {
        await uploadImgStorage(content["second"], imagesDB, id, count++, db)
    }

    if (content["third"]) {
        await uploadImgStorage(content["third"], imagesDB, id, count++, db)
    }

    if (content["fourth"]) {
        await uploadImgStorage(content["fourth"], imagesDB, id, count++, db)
    }

    if (content["fifth"]) {
        await uploadImgStorage(content["fifth"], imagesDB, id, count++, db)
    }


}

/* Audio */

async function uploadAudioStorage(audioURI, audioDB, id, dbFirestore) {

    // grab name of audio, which is the last part of the path
    const splitArr = audioURI.split("/")
    let newURI = splitArr[splitArr.length - 1]

    console.log(newURI)

    // get db path to image
    const audioRef = audioDB.ref(newURI)

    console.log("asfasdf", imageRef)

    // comvert image to blob
    const response = await fetch(audioURI);
    const blob = await response.blob();

    console.log("here")

    let urlRes
    // insert blob into db and return the download path
    await audioRef.put(blob).on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
        console.log("total bytes transferring:", snap.totalBytes)
    }, (err) => {
        console.log(err)
    }, async () => {
        const url = await audioRef.getDownloadURL();
        dbFirestore.collection("posts")
            .doc(id)
            .set({
                count: url
            })
    })

}

export async function createAudioPost({ title, description, type, category, content, username, time, likes, id }) {
    let db = firebase.firestore();
    try {
        db.collection("posts")
            .doc(id)
            .set({
                title: title,
                description: description,
                type: type,
                category: category,
                username: username,
                time: time,
                likes: likes,
                id: id,
            });
    } catch (err) {
        Alert.alert("Could not create post right now.", err.message);
    }
    // firebase storage, which is different than firestore
    const audioDB = firebase.storage();

    await uploadAudioStorage(content, audioDB, id, db)

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

export async function updateLikes(id, likes) {
    try {
        const db = firebase.firestore();
        db.collection("posts")
            .doc(id)
            .update({
                likes: likes,
            });

    } catch (err) {
        Alert.alert("Error in updating likes.", err.message);
    }
}

export async function updateComments(id, comments) {
    try {
        const db = firebase.firestore();
        db.collection("posts")
            .doc(id)
            .update({
                comments: comments,
            });

    } catch (err) {
        Alert.alert("Error in updating comments.", err.message);
    }
}

