let database = firebase.database().ref(`/`);
const ref = firebase.storage().ref();

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//       window.location.href = `pages/home.html`;
//   } else {
//       window.location.href = `pages/login.html`;
//   }
// });
// ;

let signUp = () => {

  // Getting Data From Input Feilds
  
  var name = document.getElementById(`name`).value;
  let email = document.getElementById(`email`).value;
  let password = document.getElementById(`pass`).value;
  let phone = document.getElementById(`phone`).value;
  let city = document.getElementById(`city`).value;
  let age = document.getElementById(`age`).value;

  // Image for Storage

  const file1 = document.querySelector("#file").files[0];
  const imageName = file1.name;
  console.log(imageName);
  const metadata = {
    contentType: file1.type
  };

  let imageForStorage = ref.child(imageName).put(file1, metadata);
  imageForStorage.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
  console.log(url);

  let allUsers = {
    name,
    email,
    password,
    phone,
    city,
    age,
    file : url 
  };
  firebase.auth().createUserWithEmailAndPassword(allUsers.email, allUsers.password)
    .then(resolve => {
      database.child(`users/${resolve.user.uid}`).set(allUsers);
      alert(`User Signup Succesfully`);
      window.location.href = `pages/login.html`
    })
    .catch(function(error) {
      alert(error.code);
      alert(error.message);
    });

  console.log(allUsers);


});



  

  document.getElementById(`name`).value = ``;
  document.getElementById(`email`).value = ``;
  document.getElementById(`pass`).value = ``;
  document.getElementById(`phone`).value = ``;
  document.getElementById(`city`).value = ``;
  document.getElementById(`age`).value = ``;
};




let facebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
      'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(`result ==>`,result)
  }).catch(function (error) {
      console.log(`error ==>`,error)

    
  });
}

