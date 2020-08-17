var bananaImage;
var obstacleImage;
var obstacleGroup;
var foodGroup;
var background;
var backgroundImage;
var playerRunning;
var ground;
var monkey;
var score = 0;


function preload(){
  
  
  backgroundImage = loadImage("jungle.jpg");
  
  playerRunning =     loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","  Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
}


function setup() {
  createCanvas(800,400);
  
  background = createSprite(0,0,800,400);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  background.velocityX = -4;
  background.x = background.width/2;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", playerRunning);
  monkey.scale=0.1;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw(){
  
  if (background.x < 100) {
    background.x = background.width/2;
  }
  
  if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (foodGroup.isTouching(monkey)) {
    score = score + 2;
    foodGroup.destroyEach();
  }
  
  switch(score) {
    case 10 : monkey.scale = 0.12;
      break;
    case 20 : monkey.scale = 0.14;
      break;
    case 30 : monkey.scale = 0.16;
      break;
    case 40 : monkey.scale = 0.18;
      break;
    default : break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    monkey.scale = 0.2;
    foodGroup.destroyEach();
  }
  
  
  
  spawnFood();
  spawnObstacles();

 drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50); 
}

function spawnFood() {

  if (frameCount % 100 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    banana.addImage(bananaImage);
    banana.scale=0.05;

    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  
  if(frameCount % 150 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}