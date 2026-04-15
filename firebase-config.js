const firebaseConfig = {
  apiKey: "AIzaSyAmR90IvNdJCoHIEurzw3HfOrc1qDOa77o",
  authDomain: "mybook-fced0.firebaseapp.com",
  databaseURL: "https://mybook-fced0-default-rtdb.firebaseio.com",
  projectId: "mybook-fced0",
  storageBucket: "mybook-fced0.firebasestorage.app",
  messagingSenderId: "556634853367",
  appId: "1:556634853367:android:ff6e7dd79acb3ebaae68f2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();