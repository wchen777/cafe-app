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

export async function updateProfile({ email, password, username, last, first, ig, twitter, portfolio, bio}) {
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
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        pic: pic
      });

  } catch (err) {
    console.log(err.message);
    Alert.alert("Error in updating profile.", err.message);
  }
}

export async function signIn({email, password}) {
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