let database = firebase.database().ref(`/`);

let current = localStorage.getItem(`userId`);
current = JSON.parse(current);

database.child(`users/`).on(`child_added`, snap => {

  let data = snap.val();
  data.id = snap.key;

  if (data.id === current) {

    let box = document.getElementById(`main`);

    let div1 = document.createElement(`div`);
    div1.setAttribute(`class`, `center`);

    box.appendChild(div1);

    let div2 = document.createElement(`div`);
    div2.setAttribute(`class`, `card`);

    div1.appendChild(div2);

    let div3 = document.createElement(`div`);
    div3.setAttribute(`class`, `additional`);

    div2.appendChild(div3);

    let div4 = document.createElement(`div`);
    div4.setAttribute(`class`, `user-card`);

    div3.appendChild(div4);

    let div5 = document.createElement(`div`);
    div5.setAttribute(`class`, `more-info`);

    div3.appendChild(div5);

    let div6 = document.createElement(`div`);
    div6.setAttribute(`class`, `coords`);

    let div7 = document.createElement(`div`);
    div7.setAttribute(`class`, `coords`);

    let h1 = document.createElement(`h1`);
    console.log(data.name);
    let h1Text = document.createTextNode(data.name);
    h1.appendChild(h1Text);

    div5.appendChild(h1);

    let span = document.createElement(`span`);
    let spanText = document.createTextNode(`Phone`);
    span.appendChild(spanText);

    div6.appendChild(span);

    let span1 = document.createElement(`span`);
    let span1Text = document.createTextNode(data.phone);
    span1.appendChild(span1Text);
    div6.appendChild(span1);

    let span2 = document.createElement(`span`);
    let span2Text = document.createTextNode(`City/Country`);
    span2.appendChild(span2Text);
    div7.appendChild(span2);

    let span3 = document.createElement(`span`);
    let span3Text = document.createTextNode(data.city);
    span3.appendChild(span3Text);
    div7.appendChild(span3);

    div5.appendChild(div6);
    div5.appendChild(div7);

    let div8 = document.createElement(`div`);
    div8.setAttribute(`class`, `general`);

    let heading = document.createElement(`h1`);
    let headingText = document.createTextNode(data.name);
    heading.appendChild(headingText);
    div8.appendChild(heading);

  

    let p = document.createElement(`p`);
    let pText = document.createTextNode( `I AM HAPPY THAT MY Blood Will BRING SMILE TO OTHER FACE !`);
    let blood = document.createElement(`h1`);
    let bloodtext = document.createTextNode(data.bloodGroup);
    blood.appendChild(bloodtext);
    
    p.appendChild(pText);
    div8.appendChild(heading);
    div8.appendChild(p);
    div8.appendChild(blood);
    div2.appendChild(div8);
  }
});
