import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";


export async function followHandler(myID, otherUsername, unfollow) {
    try {
        firebase
            .firestore()
            .collection('users')
            .doc(myID)
            .update({
                following: unfollow ? firebase.firestore.FieldValue.arrayRemove(otherUsername) : firebase.firestore.FieldValue.arrayUnion(otherUsername)
            })
    } catch (err) {
        Alert.alert("Error in following/unfollowing.", err.message);
    }
}

export async function chatAdd(myID, otherID, myUsername, otherUsername) {
    try {
        firebase
            .firestore()
            .collection('users')
            .doc(myID)
            .update({
                chats: firebase.firestore.FieldValue.arrayUnion(otherUsername)
            })
        firebase
            .firestore()
            .collection('users')
            .doc(otherID)
            .update({
                chats: firebase.firestore.FieldValue.arrayUnion(myUsername)
            })
    } catch (err) {
        Alert.alert("Error in adding to chat.", err.message);
    }
}

