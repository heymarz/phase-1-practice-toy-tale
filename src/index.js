let addToy = false;
let postToy ={
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
  }
  
  //fetch ***************************
function getToys(url){
   fetch(url)
  .then(response => response.json())
  .then(data => {(data.forEach(renderInCard))})
  .catch(error => console.error("Error:", error))
}

//event Listener******************
 //select the form
 //add an event listener
 //pass the event listener a call back
 //have that callback prevent the refresh
 document.querySelector(".add-toy-form").addEventListener("submit",(e) => {
   e.preventDefault();
 let newToy = {
  name: e.target[0].value,
  img: e.target[1].value
 } 
 renderInCard(newToy)
 postData(newToy)
})

const renderInCard = function(toy){
  const toyCollection = document.querySelector("#toy-collection")
  const h2 = document.createElement("h2")
  h2.innerText = toy.name
  
  const img = document.createElement("img")
  img.setAttribute("src", [toy.image])
  img.setAttribute("class", "toy-avatar")
  
  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes` //comeback w post fetch

  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.id =[toy.id]
  button.innerText = "Like"
  button.addEventListener("click", (e) => {
    console.log("hello", e.target.likes) //comes w post fetch
  })

  let div = document.createElement("div")
  div.classList.add("card")
  div.append(h2, img, p, button)
  toyCollection.append(div)
}

document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector("#new-toy-btn")
const toyFormContainer = document.querySelector(".container")
const toyForm = document.querySelector(".add-toy-form")
  
getToys("http://localhost:3000/toys");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})

function postData(postToy){
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
 },
 body: JSON.stringify(postToy)
})
.then(resp => resp.json())
.then(postToy =>{
 console.log("success:", postToy)
})
.catch((error) => {
  console.error("Error:", error)
})
}

function updateLikes(event) {
  event.preventDefault();
  fetch("http://localhost:3000/toys/:id", {
  method: "PATCH",
  headers:{
    "Content-type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    "likes": more
  })
 })
.then(resp => console.log(resp.json()))
}