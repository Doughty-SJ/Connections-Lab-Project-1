// Bingo often associated with older demographics and the original pokemon is nearly a quarter century old now (2020)//

let Backgrounds = [];
let newCardbutton = document.getElementById("newCard");
let bingoButton = document.getElementById("Bingo");
let boxes = [];
let currentcard = [];  // array which becomes diplayed card.
pokemonArray = [];  //Full array of first gen pokemon
pokemonPictures = [];
console.log("Initialze Global Variables")


window.addEventListener('load', function(){
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
  .then(response => response.json())
  .then(data => {
    currentcard = data.results;
    console.log("Data Loaded")


    
  })



})


newCardbutton.addEventListener("click", function(){   //setup new card on click
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
  .then(response => response.json())
  .then(data => {
    currentcard = data.results;
    document.getElementById("overlay").style.display = "none"
    
  })

  console.log("Button Was Clicked");
  
  
  setup();
  
});

bingoButton.addEventListener("click",function(){  //bingo button
 document.getElementById("overlay").style.display = "flow-root"
})

function preload() {
  Background1 = loadImage('./Background1.png');
  Background2 = loadImage('./Background2.png');
  Background3 = loadImage('./Background3.png');
  PokeBall = loadImage('./PokeBall.png');

}


function setup() {
  console.log("Setup");
  console.log(currentcard.length, "Before Shuffle & Trim.");

  boxes = [];
  pressed = false;

  currentcard = shuffler(currentcard);   //Shuffle index of pokemon.
  
  for (let i = currentcard.length; i > 24; i--) {
    currentcard.splice(random((currentcard.length / 2) * -1, (currentcard.length / 2)), 1);

  }   //Trim card list. 
  
  console.log(currentcard.length, "After Shuffle & Trim.");

  Backgrounds.push(Background1, Background2, Background3);   //select random background.
  currentbackground = random(Backgrounds)
  currentbackground.resize(0, windowHeight * 0.60);
  createCanvas(currentbackground.width, currentbackground.height);
  
  dy = currentbackground.height * 0.141; //row height
  dx = currentbackground.width * 0.168; //column width

  PokeBall.resize(0, dx * 0.80); //Bingo stamp Resize

  offsetx = (0.08 * currentbackground.width);
  offsety = (0.245 * currentbackground.height);

  image(currentbackground, 0,0);

  let i = 0;
for (x = 0; x < 5; x++) {
    for (y = 0; y < 5; y++) {
      if (x == 2 && y == 2) {
        boxes.push(new Box((x * dx) + offsetx, (y * dy) + offsety, dx, dy, img = null, txt = "FREE SPACE"));

      } else {

        boxes.push(new Box((x * dx) + offsetx, (y * dy) + offsety, dx, dy, img = pokemonPictures[i], txt = currentcard[i].name));
        i++;
        
      }
    }
  }
}



function draw() {
  
  image(currentbackground, 0, 0);
  
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }









}

function shuffler(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Box {
  constructor(Xpos, Ypos, dx, dy = this.dx, img = null, txt = "", stamped = false) {
    this.stamped = stamped;
    this.Xpos = Xpos;
    this.Ypos = Ypos;
    this.dx = dx;
    this.dy = dy;
    this.img = img;
    if (this.img != null) {
      this.img.resize(this.dx * 0.95, 0)
    }
    this.txt = txt;

    textAlign(CENTER, CENTER);
    textStyle(BOLD);


  }
  show() {

    noStroke();
    fill(0, 0, 0, 0);

    rect(this.Xpos, this.Ypos, this.dx, this.dy);
    if (this.img != null) {
      image(this.img, this.Xpos, this.Ypos, this.dx, this.dy);
    }
    push();
    fill(0);
    text(this.txt, this.Xpos, this.Ypos, this.dx * 0.97, this.dy * 0.97);
    pop();


    if (this.stamped == true) {
      push();
      image(PokeBall, this.Xpos+(this.dx*0.1), this.Ypos+(this.dy*0.1));
      pop();
    } else if (this.stamped == false) {}

    if (this.stamped == false && dist(this.Xpos + (this.dx / 2), this.Ypos + (this.dy / 2), mouseX, mouseY) < this.dx / 2 && pressed == true) {

      this.stamped = true;
      pressed = false;

    } else if (this.stamped == true && dist(this.Xpos + (this.dx / 2), this.Ypos + (this.dy / 2), mouseX, mouseY) < this.dx / 2 && pressed == true) {
      this.stamped = false;
      pressed = false;
    }


  }
}

function mousePressed() {
  pressed = true;
}

function mouseReleased() {
  pressed = false;
}

   
 function bingoCall() {
  let randomNumber = Math.floor(Math.random()*151);

  fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
  .then(response => response.json())
  .then(data => {
      pokemonArray = data.results;
      nameElement = document.getElementById("pokemon_call");
      nameElement.innerHTML = pokemonArray[randomNumber].name;
  
  
      currentName = pokemonArray[randomNumber].name;
      
  
      let API_URL = "https://pokeapi.co/api/v2/pokemon/" + currentName;
      fetch(API_URL)
      .then(response => response.json())
      .then(data => {
      let imageElement = document.getElementById("pokemon_img");
      imageElement.src = data.sprites.front_default;

  })
})

     }
setInterval(bingoCall, 1000*5);
           

// https://www.tutorialrepublic.com/javascript-tutorial/javascript-timers.php