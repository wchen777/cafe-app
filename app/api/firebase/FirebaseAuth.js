import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration({ email, password, username, last, first, ig, twitter, portfolio, extra1, extra2, extra3 }) {
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
        extra1: extra1 ?? "",
        extra2: extra2 ?? "",
        extra3: extra3 ?? ""
      });
  } catch (err) {
    Alert.alert("Error in account registration.", err.message);
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