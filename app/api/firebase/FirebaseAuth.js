import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";


export async function registration({ email, password, username, last, first, ig, twitter, portfolio }) {
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
      });
  } catch (err) {
    Alert.alert("Error in account registration.", err.message);
  }
}

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