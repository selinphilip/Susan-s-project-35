var dog, happyDog, foodS, foodStock
var dogImg, dogHappy;
var milk, milkImg;
var database;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy); 
  }

  drawSprites();
  //add styles here
  textSize(15);
  stroke(10);
  fill("white");
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",50,50);
  text("Food Remaining: "+foodS,170,440);

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}



