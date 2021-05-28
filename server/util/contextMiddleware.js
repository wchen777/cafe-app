
const { uri } = require('../mongoDB');
const firebase = require('firebase');
const admin = require('firebase-admin');

module.exports = async (context) => {
  const token = context.req.headers.authorization;
  let tokenValid = false;
  
  if (token) {
    tokenValid = await admin.auth().verifyIdToken(token);
  }
  
  return { tokenValid }
}

