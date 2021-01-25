var Bg,Bgimg,Bg1,Bg2;
var Monkey, Monkey_running;
var ground,ground_img;

var BananaGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var Poison,poison_img,PoisonGroup;

//var reset,resetimg;
var score=0;


function preload(){
  Bgimg=loadImage("jungle.jpg");
  Bg1 = loadImage("jungle1.jpg");
   Bg2 = loadImage("jungle2.jpg");
  Monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  poison_img  = loadImage("Poison.png");
  obstacle_img = loadImage("stone.png");
  
  
  
  
}

function setup() {
  createCanvas(800,400);
  
  Bg=createSprite(0,0,800,400);
  Bg.addImage("Backimg",Bgimg);
  Bg.addImage("bg1",Bg1);
  Bg.addImage("bg2",Bg2);
  Bg.scale=1.5;
  Bg.x=Bg.width/2;
  Bg.velocityX=-4;

  
 Monkey = createSprite(100,340,20,50);
 Monkey.addAnimation("Running",Monkey_running);
 Monkey.scale = 0.1;
  
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  BananaGroup = new Group();
  obstaclesGroup = new Group();
  PoisonGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(0);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(Bg.x<100){
    Bg.x=Bg.width/2;
  }
  
    if(BananaGroup.isTouching(Monkey)){
      BananaGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: Monkey.scale=0.12;
                break;
        case 20: Monkey.scale=0.14;
                break;
        case 30: Monkey.scale=0.16;
                break;
        case 40: Monkey.scale=0.18;
                break;
                
        default: break;
    }
  
    if(keyDown("space")&& Monkey.y>150) {
      Monkey.velocityY = -12;
    }
    Monkey.velocityY = Monkey.velocityY + 0.8;
  
    Monkey.collide(ground);
    spawnbanana();
    spawnObstacles();
    poisonBanana();
 
    if(obstaclesGroup.isTouching(Monkey)||
       PoisonGroup.isTouching(Monkey)){ 
       Monkey.scale=0.1;
       score=score-1;
       obstaclesGroup.destroyEach();
       PoisonGroup.destroyEach();
    }
  if(score===10){
     Bg.changeImage("bg1",Bg1);
     Bg.scale=2.5;
  }
  if(score===30){
     Bg.changeImage("bg2",Bg2);
    Bg.y=200;
    Bg.scale=1.3;
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time : "+ score, 300,50);
}

function spawnbanana() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
  
    banana.lifetime = 300;
    Monkey.depth = banana.depth + 1;
    
    BananaGroup.add(banana);
  }
}

function poisonBanana(){
  if (frameCount % 80 ===0){
    
    var Poison = createSprite(500,250,40,10);
    Poison.y = random(50,200);    
    Poison.addImage(poison_img);
    Poison.scale = 0.1;
    Poison.velocityX = -5;
  
    Poison.lifetime = 300;
    Monkey.depth = Poison.depth + 1;
    
    PoisonGroup.add(Poison);
  }
  
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,340,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
        
    obstacle.scale = random(0.12,0.21);
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}


  
