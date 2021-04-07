import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export async function createPost({title, description, type, category, content, username}) {
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
            username: username
          });
    } catch (err) {
        Alert.alert("Could not create post right now.", err.message);
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