let database = firebase.database().ref(`/`);

let login = () => {
  let email = document.getElementById(`email`).value;
  let password = document.getElementById(`pass`).value;

  let user = {
    email,
    password
  };
  console.log(user);

  firebase
    .auth().signInWithEmailAndPassword(user.email, user.password)
    .then(resolve => {
      console.log(resolve.user.uid);
      database.child(`users/${resolve.user.uid}`).on(`value`, snap => {
        let obj = snap.val();
        obj.id = resolve.user.uid;
        localStorage.setItem(`CureentUser`, JSON.stringify(obj));
        window.location.href = `home.html`

      });
    })
    .catch(error => {
        error.code
    });
};

