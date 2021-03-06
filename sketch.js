
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var ground
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,600);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);  
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.veolcityX = -4;
  ground.x = ground.width/2
  console.log(ground.x)

  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
     background(240);
   background("white");
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
    
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  monkey.collide(ground); 

  
  
  if(ground.x<0) { 
    ground.x=ground.width/2; }
  
  if(monkey.isTouching(foodGroup)) {
     foodGroup.destroyEach();
     }
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX=0
    monkey.velocityX = 0
    obstacleGroup.setVelocityXEach (0);
    foodGroup.setVelocityXEach (0);
    obstacleGroup.setLifetimeEach (-1);
    foodGroup.setLifetimeEach (-1);

  }
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:" + survivalTime,100,50); 
  
  
  
  drawSprites();
  spawnFood();
  spawnObstacles();
  
  
}


function spawnFood() {
    if (frameCount%80 === 0){ 
   var  banana=createSprite (600,400,100,10);
    banana.y = Math.round(random(100,200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-8;          
    banana.lifetime = 200;
    monkey.depth = banana.depth +1  
    foodGroup.add(banana)
  }
}


function spawnObstacles() {
  if(frameCount%200 === 0){
    var obstacle = createSprite(400,328,10,10);
    obstacle.addImage("obstacle", obstacleImage)
    obstacle.scale = 0.1;
    obstacle.velocityX = -7;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
      
}





