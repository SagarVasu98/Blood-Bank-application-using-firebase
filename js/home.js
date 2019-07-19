function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Slider

var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 3000);
}

let database = firebase.database().ref(`/`);

let current = localStorage.getItem(`CureentUser`);
current = JSON.parse(current);



// Donate Blood Group

let donate = () => {
  if (current === null) {
    alert(`LogIn to Donate Blood`)
    window.location.href = `login.html`
  }
  else {

    let data = document.getElementById(`bloods`);
    let blood = data.options[data.selectedIndex].value;

    if (current.bloodGroup) {
      alert(`Go to Edit Profile Section For Change Blood Group`);
    }
    else {
      database.child(`users/${current.id}`).update({ bloodGroup: blood });
      current.bloodGroup = blood;
      localStorage.setItem(`CureentUser`, JSON.stringify(current));
      alert(`Donated`)
    }
  }
};

let bP = 0;
let bN = 0;
let aP = 0;
let aN = 0;
let abP = 0;
let abN = 0;
let oP = 0;
let oN = 0;

let count = 0;

database.child(`users/`).on(`child_added`, snap => {
  count++;

  document.getElementById(`total`).innerHTML = count;

  if (snap.val().bloodGroup === `B+`) {
    database.child(`groups`).update({ BP: ++bP });
  }

  if (snap.val().bloodGroup === `B-`) {
    database.child(`groups`).update({ BN: ++bN });
  }

  if (snap.val().bloodGroup === `AB-`) {
    database.child(`groups`).update({ ABN: ++abN });
  }

  if (snap.val().bloodGroup === `AB+`) {
    database.child(`groups`).update({ ABP: ++abP });
  }

  if (snap.val().bloodGroup === `A+`) {
    database.child(`groups`).update({ AP: ++aP });
  }

  if (snap.val().bloodGroup === `A-`) {
    database.child(`groups`).update({ AN: ++aN });
  }

  if (snap.val().bloodGroup === `O-`) {
    // oN.push(snap.val().bloodGroup);
    database.child(`groups`).update({ ON: ++oN });
  }

  if (snap.val().bloodGroup === `O+`) {
    // oP.push(snap.val().bloodGroup);
    database.child(`groups`).update({ OP: ++oP });
  }

  database.child(`groups/`).on(`value`, snap1 => {
    
    let bloodaN = (document.getElementById(`a-`).innerHTML = snap1.val().AN);
    let bloodbP = (document.getElementById(`b+`).innerHTML = snap1.val().BP);
    let bloodaP = (document.getElementById(`a+`).innerHTML = snap1.val().AP);
    let bloodbN = (document.getElementById(`b-`).innerHTML = snap1.val().BN);
    let bloodabP = (document.getElementById(`ab+`).innerHTML = snap1.val().ABP);
    let bloodabN = (document.getElementById(`ab-`).innerHTML = snap1.val().ABN);
    let bloodoP = (document.getElementById(`o+`).innerHTML = snap1.val().OP);
    let bloodoN = (document.getElementById(`o-`).innerHTML = snap1.val().ON);

    if (bloodaP === undefined) {
      document.getElementById(`a+`).innerHTML = `Not Available`;
    }

    if (bloodabN === undefined) {
      document.getElementById(`ab-`).innerHTML = `Not Available`;
    }

    if (bloodaN === undefined) {
      document.getElementById(`a-`).innerHTML = `Not Available`;
    }
    if (bloodabP == undefined) {
      document.getElementById(`ab+`).innerHTML = `Not Available`;
    }
    if (bloodbN == undefined) {
      document.getElementById(`b-`).innerHTML = `Not Available`;
    }
    if (bloodbP == undefined) {
      document.getElementById(`b+`).innerHTML = `Not Available`;
    }
    if (bloodoN == undefined) {
      document.getElementById(`o-`).innerHTML = `Not Available`;
    }

    if (bloodoP == undefined) {
      document.getElementById(`o+`).innerHTML = `Not Available`;
    }
  });
});

let count1 = 0;
if(current === null){

}
else{
  database.child(`users/${current.id}/request/`).on(`child_added`, request => {
    let data = request.val();
    data.id = request.key;
  
    if (data.bloodReceiver === current.name) {
      if (data.answer === `Yes`) {
        document.getElementById(`snackbar`).style.display = `block`;
        document.getElementById(
          `snackbar`
        ).innerHTML = `<a href="account.html">You Have ${++count1} New Notification <a/>`;
        setTimeout(function() {
          document.getElementById(`snackbar`).style.display = `none`;
        }, 2800);
      }
      if (data.answer === `No`) {
        document.getElementById(`snackbar`).style.display = `block`;
        document.getElementById(
          `snackbar`
        ).innerHTML = `<a href="account.html">You Have ${++count1} New Notification <a/>`;
        setTimeout(function() {
          document.getElementById(`snackbar`).style.display = `none`;
        }, 2800);
      }
    }
  
    if (data.answer === `Yes` && data.bloodOwner === current.name) {
      document.getElementById(`snackbar`).style.display = `none`;
    } else if (data.bloodOwner === current.name) {
      document.getElementById(`snackbar`).style.display = `block`;
      document.getElementById(
        `snackbar`
      ).innerHTML = `<a href="account.html">You Have ${++count1} New Notification <a/>`;
      setTimeout(function() {
        document.getElementById(`snackbar`).style.display = `none`;
      }, 2800);
    }
  });


}


logout = () => {
  firebase.auth().signOut().then(res => {
      console.log(res, `signout`);
      localStorage.removeItem(`CureentUser`);
      window.location.href = `login.html`;
  }),
  err => {
    console.log(err, `signout error`);
  };
};


let facebookLogin = () =>{
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