import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration({ email, password, username, last, first, ig, twitter, portfolio }) {
    let doc = await firebase
        .firestore()
        .collection('users')
        .get();

    let dataObj = doc.docs.map(doc => doc.data());
    let userNames = dataObj.map(user => user.username);
    if (userNames.includes(username)) {
        Alert.alert('This username already exists. Please try another username.')
    } else {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currentUser = firebase.auth().currentUser;

            const db = firebase.firestore();
            db.collection("users")
                .doc(currentUser.uid)
                .set({
                    email: currentUser.email,
                    last: last,
                    first: first,
                    username: username,
                    ig: ig ?? "",
                    twitter: twitter ?? "",
                    portfolio: portfolio ?? "",
                    bio: "",
                    pic: "",
                    chats: [],
                    liked: [],
                    following: [],
                    // followers: [],
                    id: currentUser.uid
                });
        } catch (err) {
            Alert.alert("Error in account registration.", err.message);
        }
    }
}


/* export async function registration({ email, password, username, last, first, ig, twitter, portfolio }) {
     try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
  
      const db = firebase.firestore();
      db.collection("users")
        .doc(currentUser.uid)
        .set({
          email: currentUser.email,
          last: last,
          first: first,
          username: username,
          ig: ig ?? "",
          twitter: twitter ?? "",
          portfolio: portfolio ?? "",
          bio: "",
          pic: "",
        });
    } catch (err) {
      Alert.alert("Error in account registration.", err.message);
    } 
} */

export async function updateProfile({ email, password, username, last, first, ig, twitter, portfolio, bio }) {
    try {
        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection("users")
            .doc(currentUser.uid)
            .update({
                email: email,
                last: last,
                first: first,
                username: username,
                ig: ig,
                twitter: twitter,
                portfolio: portfolio,
                bio: bio,

            });

    } catch (err) {
        Alert.alert("Error in updating profile.", err.message);
    }
}


export async function updatePic(pic) {
    try {
        console.log(pic)
        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();

        // grab name of image, which is the last part of the path
        const splitArr = pic.split("/")
        let newURI = splitArr[splitArr.length - 1]

        // get db path to image
        const imageRef = firebase.storage().ref(newURI)


        // comvert image to blob
        const response = await fetch(pic);
        const blob = await response.blob();

        // insert blob into db and return the download path
        imageRef.put(blob).on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
            console.log("total bytes transferring:", snap.totalBytes)
        }, (err) => {
            console.log(err)
        }, async () => {
            const url = await imageRef.getDownloadURL();
            console.log("url", url)
            db.collection("users")
                .doc(currentUser.uid)
                .update({
                    pic: url
                });
        })

    } catch (err) {
        console.log(err.message);
        Alert.alert("Error in updating profile.", err.message);
    }
}

export async function signIn({ email, password }) {
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    } catch (err) {
        Alert.alert("Error in account sign in.", err.message);
    }
}

export async function signOut() {
    try {
        await firebase.auth().signOut();
    } catch (err) {
        Alert.alert('Error in account sign out.', err.message);
    }
}