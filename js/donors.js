let database = firebase.database().ref(`/`);

/******************************   Getting Data From Firebase and Check all Donors     ********************************* */

database.child(`users/`).on(`child_added`, snap => {
  let check = snap.val();
  check.id = snap.key;

  // Checking Blood Group Property if exists than show

  if (check.bloodGroup) {
    let box = document.getElementById("row");
    let box1 = document.createElement("div");
    box1.setAttribute(`id`, check.name);
    box1.setAttribute("class", "column");

    let box2 = document.createElement("div");
    box2.setAttribute("class", "card");

    // Image

    var image1 = document.createElement("img");
    image1.setAttribute("src", check.file);
    image1.setAttribute("width", "200px");
    image1.setAttribute("height", "200px");
    image1.setAttribute("style", "margin-top:10px;cursor:pointer");
    box.appendChild(image1);
    box2.appendChild(image1);
    box1.appendChild(box2);
    box.appendChild(box1);

    // User Name

    var h1 = document.createElement("h1");
    h1.setAttribute("id", "head1");
    var h1_text = document.createTextNode(check.name);
    h1.appendChild(h1_text);
    box2.appendChild(h1);
    box1.appendChild(box2);
    box.appendChild(box1);

    var h3 = document.createElement("h3");
    h3.setAttribute("id", "head");
    h3.setAttribute("class", "bloods");
    var h3_text = document.createTextNode(check.bloodGroup);
    h3.appendChild(h3_text);

    box2.appendChild(h3);
    box1.appendChild(box2);
    box.appendChild(box1);

    detail = document.createElement("input");
    detail.setAttribute("type", "button");
    detail.setAttribute("value", "See More");
    detail.setAttribute(`id`, snap.key);
    detail.setAttribute("class", "button button3");
    detail.setAttribute(`style`,`width: 120px; height: 50px;background-color: #f44336;color: white;font-weight: 600px;cursor: pointer;font-size: 18px;border: 2px solid #f44336; margin-bottom: 30px;margin-left:30px;`);

    // Button For Checking Further Deatil

    detail.addEventListener(`click`, function() {
      localStorage.setItem(`userId`, JSON.stringify(this.id));
      window.location.href = `detail.html`;
    });

    box.appendChild(detail);
    box2.appendChild(detail);
    box1.appendChild(box2);
    box.appendChild(box1);

    // Request Button

    let request = document.createElement(`input`);
    request.setAttribute(`type`, `button`);
    request.setAttribute(`value`, `Send Request`);
    detail.setAttribute("class", "request");
    request.setAttribute(`id`, check.id);

    request.setAttribute(`style`,`width: 120px; height: 50px;background-color: #4285F4;color: white;font-weight: 600px;cursor: pointer;font-size: 18px;border: 2px solid #4285F4; margin-bottom: 30px;margin-left:10px;`);
    box.appendChild(request);
    box2.appendChild(request);
    box1.appendChild(box2);
    box.appendChild(box1);

    let currentUser = localStorage.getItem(`CureentUser`);
    currentUser = JSON.parse(currentUser);

    if(check.id === currentUser.id){
      console.log(78)
      request.value = `Own Card`
      request.disabled = true;
    }



    database.child(`users/${request.id}/request/`).on(`child_added`, request1 => {

      let requestCheck = request1.val();
      let currentUser = localStorage.getItem(`CureentUser`);
      currentUser = JSON.parse(currentUser);
   

        if (requestCheck.answer === `Yes` && request.id === requestCheck.btnid) {
          let yearmonths = [``,`January`, `Feburuary`, `March`,`April`,`May`,`June`,`July`,`August`,`September`,`Octomber`,`November`,`December`];
          let x1 = requestCheck.countDownDate;
          let month =  Number(x1.slice(0,-17).slice(5));
          let year = Number(x1.slice(0,4));
          let day = Number(x1.slice(0,-14).slice(8));
          let hour = Number(x1.slice(0,-11).slice(11));
          let mint = Number(x1.slice(0,-8).slice(14));
          let sec = Number(x1.slice(0,-5).slice(17))


          console.log(x1)
          console.log(month)
          console.log(year)
          console.log(day)
          console.log(mint)


          
          var countDownDate = new Date(`${yearmonths[month]} ${day}, ${year} ${hour}:${mint}:${sec}`);
          
          // Update the count down every 1 second
          var x = setInterval(function() {
            // Get today's date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Output the result in an element with id="demo"
            request.value = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text
            if (distance < 0) {
              clearInterval(x);
              request.value = `Request`
            }
          }, 1000);
          
          request.style.backgroundColor = "green";
          request.style.border = "2px solid green";
          request.disabled = true;
        }
        else {
          if (requestCheck.userid === currentUser.id) {
            request.value = `Requested`;
            request.disabled = true;
          }

        }
      });

    request.addEventListener(`click`, function() {
      if (currentUser === null) {
        alert(`Login to Donate`);
      } else {
        var ref = firebase.database().ref(`users/${request.id}/request/`);
        ref.once("value").then(function(snapshot) {
          if (snapshot.exists() === true) {
            database.child(`users/${request.id}/request/`).on(`child_added`, request1 => {
                let requestCheck = request1.val();
                let currentUser = localStorage.getItem(`CureentUser`);
                currentUser = JSON.parse(currentUser);
                if (requestCheck.userid === currentUser.id) {
                  request.style.disabled = true;
                } else {
                  let request = {
                    bloodOwner: check.name,
                    bloodReceiver: currentUser.name,
                    userid: currentUser.id,
                    btnid: check.id
                  };

                  database.child(`users/${check.id}/request/`).push(request);
                }
              });
          } else {
            let request = {
              bloodOwner: check.name,
              bloodReceiver: currentUser.name,
              userid: currentUser.id,
              btnid: check.id
            };
            database.child(`users/${check.id}/request/`).push(request);
          }
        });
      }
    });
   


    // Filter using Blood Group

    document.getElementById(`searchGroup`).addEventListener(`click`, function() {
        let search = document.getElementById(`searchGroup`);
        let searchValue = search.options[search.selectedIndex].value;

        if (searchValue === `Select Now`) {
          document.getElementById(box1.id).style.display = `block`;
        } else if (check.bloodGroup === searchValue) {
          document.getElementById(box1.id).style.display = `block`;
        } else if (check.bloodGroup !== searchValue) {
          document.getElementById(box1.id).style.display = `none`;
        }
      });

    // Filter using Blood city


    document.getElementById(`searchCity`).addEventListener(`click`, function() {
      let searchCity = document.getElementById(`searchCity`);
      let searCityValue = searchCity.options[searchCity.selectedIndex].value;

      if (searCityValue === `Select City`) {
        document.getElementById(box1.id).style.display = `block`;
      } else if (check.city === searCityValue) {
        document.getElementById(box1.id).style.display = `block`;
      } else if (check.bloodGroup !== searCityValue) {
        document.getElementById(box1.id).style.display = `none`;
      }
    });


    // Filter whom blood can donate his blood

    
    document.getElementById(`searchToDonate`).addEventListener(`click`, () => {
      var data1 = document.getElementById(`searchToDonate`);
      var blood2 = data1.options[data1.selectedIndex].value;

      let a = document.getElementsByClassName(`bloods`);

      for(var i = 0; i < a.length; i++ ){
        if (blood2 === `A+`) {
          if (a[i].innerHTML === `A+` ||a[i].innerHTML === `A-` ||a[i].innerHTML === `O+` ||a[i].innerHTML === `O-`) {
            a[i].parentNode.parentNode.style.display = `block`;
          }
          else {
            a[i].parentNode.parentNode.style.display = `none`;
          }
        }
    
        if (blood2 === `A-`) {
          if (a[i].innerHTML === `A-` || a[i].innerHTML === `O-`) {
            document.getElementById(box1.id).style.display = `block`;
          }
          else {
            document.getElementById(box1.id).style.display = `none`;
          }
        }
        if (blood2 === `B+`) {
          if (a[i].innerHTML === `B+` ||a[i].innerHTML === `B-` ||a[i].innerHTML === `O+` ||a[i].innerHTML === `O-`) {
            a[i].parentNode.style.display = `block`;
          }
          else {
            a[i].parentNode.style.display = `none`;
          }
        }
    
        if (blood2 === `B-`) {
          if (a[i].innerHTML === `B-` || a[i].innerHTML === `O-`) {
            a[i].parentNode.parentNode.style.display = `block`;
          } else {
            a[i].parentNode.parentNode.style.display = `none`;
          }
        }
    
        if (blood2 === `AB+`) {
          console.log(a[i].innerHTML)
          if (a[i].innerHTML === `AB+` ||a[i].innerHTML === `AB-` || a[i].innerHTML === `A+` ||a[i].innerHTML === `A-` ||a[i].innerHTML === `B+` ||a[i].innerHTML === `B+` ||a[i].innerHTML === `O+` ||a[i].innerHTML === `O-`) {
            a[i].parentNode.parentNode.style.display = `block`;
          }
          else {
            a[i].parentNode.parentNode.style.display = `none`;
          }
        }
    
        if (blood2 === `AB-`) {
          if (a[i].innerHTML === `AB-` ||a[i].innerHTML === `A-` ||a[i].innerHTML === `B-` ||a[i].innerHTML === `O-`) {
            a[i].parentNode.parentNode.style.display = `block`;
          }
          else {
            a[i].parentNode.parentNode.style.display = `none`;
          }
        }
    
        if (blood2 === `O+`) {
          if (a[i].innerHTML === `O+` || a[i].innerHTML === `O-`) {
            a[i].parentNode.parentNode.style.display = `block`;
          }
          else {
            a[i].parentNode.parentNode.style.display = `none`;
          }
        }
    
        if (blood2 === `O-`) {
          if (a[i].innerHTML === `O-`) {
            a[i].parentNode.parentNode.style.display = `block`;
          } 
          else {
            a[i].parentNode.parentNode.style.display = `none`;
          }
        }

    

      }
    })
  }
  })


  
let join = () => {
  window.location.href = `../index.html`;
};
