var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;
var ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
 
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
 
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
 
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x =ground.width/2;
  
  score = 0;
  survivalTime = 0;
  
}


function draw() {
  
  background ("lightblue");
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Score:"+  score, 300, 100);
  
  stroke("black");
  fill("black");
  textSize(20);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time:"+  survivalTime, 110, 50);
   
  monkey.collide(ground);
 
  if(gameState === PLAY){
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score +  1;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  obstacleGroup.setLifetimeEach(-1);
  
  
  food();
  obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
    }
  }
   if (gameState === END) {
     obstacleGroup.destroyEach();
     foodGroup.destroyEach();
     ground.visible = false;
     monkey.visible = false;
     
     stroke("red");
     fill("red");
     textSize(30);
     text("Game Over", 110, 200);
   }
 
  drawSprites();
}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}


function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    
    obstacleGroup.add(obstacle);
  }

}