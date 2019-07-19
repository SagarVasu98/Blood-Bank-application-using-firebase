// Database and Storage

let database = firebase.database().ref(`/`);
const ref = firebase.storage().ref();


// Current user Node From LocalStorage

let current = localStorage.getItem(`CureentUser`);
current = JSON.parse(current);

// Current user Node from Databse using id of user 

database.child(`users/${current.id}`).on(`value`, snap => {

  let user = snap.val();

  // Changing  the innerhtml for current User

  document.getElementById(`profile`).src = user.file; 
  document.getElementById(`name`).innerHTML = user.name;
  document.getElementById(`age`).innerHTML = user.age;
  document.getElementById(`phone`).innerHTML = user.phone;
  document.getElementById(`email`).innerHTML = user.email;
  document.getElementById(`city`).innerHTML = user.city;
  let blood = (document.getElementById(`blood`).innerHTML = user.bloodGroup);

  // Condition to show blood group only when heor she select the bloodgroup

  if (blood == undefined) {
    document.getElementById(`show`).style.display = `none`;
  }


});


// Update Profile

let edit = () => {

  // Dashboard  hides and edit form show on screen
  document.getElementById(`dashboard`).style.display = `none`;
  document.getElementById(`edit`).style.display = `block`;

    document.getElementById(`name1`).value = current.name;
    document.getElementById(`email1`).value = current.email;
    document.getElementById(`pass1`).value = current.password;
    document.getElementById(`phone1`).value = current.phone;
    document.getElementById(`city1`).value = current.city;
    document.getElementById(`age1`).value = current.age;

    // show already selected blood group in dropdown

    for (var i = 0; i < document.getElementById("blood1").options.length; i++) {
      if ( document.getElementById("blood1").options[i].text == current.bloodGroup) {
        document.getElementById("blood1").options[document.getElementById("blood1").selectedIndex].text = current.bloodGroup;
        break;
      }
    }
};

// Update Button Changes

document.getElementById(`update`).addEventListener(`click`, () => {
      
  let name = document.getElementById(`name1`).value;
  let email = document.getElementById(`email1`).value;
  let password = document.getElementById(`pass1`).value;
  let phone = document.getElementById(`phone1`).value;
  let city = document.getElementById(`city1`).value;
  let age = document.getElementById(`age1`).value;
  let bloodGroup = document.getElementById(`blood1`).value;
  let id = current.id;
  current.password = password;

  // Image for Storage

  const file1 = document.querySelector('#file1').files[0]
  const name1 = file1.name;
  console.log(name1)
  const metadata = {
    contentType: file1.type,
  };

// Object For User

  let LoginUser = {
    name,
    email,
    password,
    phone,
    city,
    age,
    id,
    bloodGroup
  };

let imageForStorage = ref.child(name1).put(file1, metadata);
imageForStorage.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
  LoginUser.file = url
  database.child(`users/${current.id}`).set(LoginUser);
  localStorage.setItem(`CureentUser`, JSON.stringify(LoginUser));

})
  
  document.getElementById(`dashboard`).style.display = `block`;
  document.getElementById(`edit`).style.display = `none`;

});




database.child(`users/${current.id}/request`).on(`child_added`, request => {
  let data = request.val();
  data.id = request.key;

  if (data.bloodOwner === current.name) {
    let div = document.getElementById(`box`);
    let msgDiv = document.createElement(`div`);
    let h42 = document.createElement(`h4`);
    let b2 = document.createElement(`b`);
    let bText2 = document.createTextNode(data.bloodReceiver + ` Need Blood`);
    b2.appendChild(bText2);
    h42.appendChild(b2);
    msgDiv.appendChild(h42);
    div.appendChild(msgDiv);

    let div2 = document.createElement(`div`);
    let yes = document.createElement(`input`);
    yes.setAttribute(`type`, `button`);
    yes.setAttribute(`value`, `Accept`);
    yes.setAttribute(`id`, data.id);
    yes.setAttribute(
      `style`,
      `width: 85px; height: 56px;background-color: #FE3C47;color: white;font-weight: 600px;cursor: pointer;font-size: 18px;border: 2px solid #FE3C47; margin-bottom: 30px;`
    );
    div2.appendChild(yes);
    div.appendChild(div2);

    let no = document.createElement(`input`);
    no.setAttribute(`type`, `button`);
    no.setAttribute(`value`, `Reject`);
    no.setAttribute(`id`, data.id);
    no.setAttribute(
      `style`,
      `width: 85px;margin-left: 20px; height: 56px;background-color: #FE3C47;color: white;font-weight: 600px;cursor: pointer;font-size: 18px;border: 2px solid #FE3C47; margin-bottom: 30px;`
    );

    div2.appendChild(no);
    div.appendChild(div2);

    if (data.answer === `Yes` && data.bloodOwner === current.name) {
      yes.parentNode.parentNode.parentNode.style.display = `none`;
    }

    if (data.answer === `No` && data.bloodOwner === current.name) {
      yes.parentNode.parentNode.parentNode.style.display = `block`;
    }

    yes.addEventListener(`click`, function() {

      var targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + 3);
      database.child(`users/${data.btnid}/request/${this.id}`).update({ answer: `Yes`, countDownDate : targetDate,owner : data.bloodOwner });
      database.child(`users/${data.userid}/response`).update({ answer: `Yes`, name :data.bloodOwner  });
      
      database.child(`users/${current.id}/request/`).on(`child_added`, request1 => {
        console.log(request1.key);
          if (!request1.val().answer){  
            console.log(request1.key);
            database.child(`users/${current.id}/request/${request1.key}`).remove();
          }
        });
      this.parentNode.parentNode.parentNode.style.display = `none`;
    });

    no.addEventListener(`click`, function() {
      database.child(`users/${data.btnid}/request/${this.id}`).remove();
      this.parentNode.parentNode.parentNode.style.display = `none`;
    });
  }
});

database.child(`users/${current.id}/response/`).on(`value`, check => {
  if (check.val().answer === `Yes`) {
    let div = document.getElementById(`div`);  
    let h4 = document.createElement(`h4`);
    let b = document.createElement(`b`);
    let bText = document.createTextNode(` ${check.val().name} Ready To Donate Blood`);
    b.appendChild(bText);
    h4.appendChild(b);
    div.appendChild(h4);
  }

  if (check.val().answer === `No`) {
    let div = document.getElementById(`div`);
    let h41 = document.createElement(`h4`);
    let b1 = document.createElement(`b`);
    let bText1 = document.createTextNode(`  Reject To Donate Blood`);
    b1.appendChild(bText1);
    h41.appendChild(b1);
    div.appendChild(h41);
  }
});

let delete1 = () => {
  var user = firebase.auth().currentUser;
  user
    .delete()
    .then(function() {
      database.child(`users/${current.id}`).remove();
      localStorage.removeItem(`CureentUser`);
      window.location.href = `login.html`;
      console.log(`delete Account ==>`, user);
    })
    .catch(function(error) {
      console.log(`delete Account ==>`, error);
    });
};

let join = () => {
  window.location.href = `../index.html`;
};

