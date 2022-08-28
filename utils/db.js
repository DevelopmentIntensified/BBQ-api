import admin from 'firebase-admin';

const serviceAccount = process.env.firebase;
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: 'https://bible-quiz-e1ef4.firebaseio.com',
  storageBucket: 'bible-quiz-e1ef4.appspot.com',
});
const bucket = admin.storage().bucket();

const db = admin.firestore();
const usersref = db.collection('users');
const subsref = db.collection('subs');
const tscoresref = db.collection('typequizzingscores');
const chatref = db.collection('chats');
const { FieldValue } = admin.firestore;

const newD = function (c, n, data) {
  const docRef = db.collection(c).doc(n);
  data.createdAt = new Date().toISOString();
  data.updatedAt = FieldValue.serverTimestamp();
  docRef.set(data);
};
const newD2 = function (c, data, t) {
  data.createdAt = new Date().toISOString();
  data.updatedAt = FieldValue.serverTimestamp();
  const addDoc = db
    .collection(c)
    .add(data)
    .then((ref) => {
      if (t) {
        t(ref);
      }
    });
};
const updateOne = function (c, n, data) {
  const dRef = db.collection(c).doc(n);
  data.updatedAt = FieldValue.serverTimestamp();
  dRef.update(data);
};

module.exports = {
  newD,
  newD2,
  updateOne,
  chatref,
  FieldValue,
  db,
  usersref,
  subsres: subsref,
  tscoresref,
  chatref,
  bucket,
};
