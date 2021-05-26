var tower,towerImg;
var door,doorImg,doorsG;
var climber,climberImg,climbersG;
var ghost,ghostImg;
var invisibleB,invisibleBsG;
var gamestate="play"

function preload(){
  towerImg= loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
 ghostImg=loadImage("ghost-standing.png")

}


function setup(){
  
  createCanvas(600,600);
  
 tower=createSprite(300,300);
  tower.addImage(towerImg);
   tower.velocityY=1;
  
  ghost=createSprite(300,300,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  
  doorsG=new Group();
  climbersG=new Group(); 
  invisibleBsG=new Group();
  
}


function draw(){
  background('black');
  console.log(tower.y)
  if(gamestate==="play"){
  
  if(tower.y> 400){
    tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5; 
  }
  
  ghost.velocityY=ghost.velocityY+0.8  ;          
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("left")){ 
    ghost.x=ghost.x-3;
  }        
  
  if(climbersG.isTouching(ghost)){ 
    ghost.velocityY=0;  
  }
  
  if(invisibleBsG.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    
    gamestate="end";
  }
  
  spawnDoors()
  
 drawSprites();
  }
  if(gamestate==="end"){
    fill("white")
  textSize(30)
    text("Gameover",250,300)
  }
}

function spawnDoors(){
  
  if(frameCount%240 === 0){
    door=createSprite(200,-50)
    door.addImage(doorImg);
    
   climber=createSprite(200,10)
    climber.addImage(climberImg);
    
    invisibleB=createSprite(200,15)
    invisibleB.width=climber.width;
    invisibleB.height=2;
    
    door.velocityY=1;         
    door.x=Math.round(random(120,400));
    
    climber.velocityY=1;
    climber.x=door.x;
    
    invisibleB.x=door.x;
    invisibleB.velocityY=1
    invisibleB.lifetime=800;
    invisibleBsG.add(invisibleB);
    
    invisibleB.visible=false;
    
    ghost.depth=door.depth;
    ghost.depth+=1; 
    
    door.lifetime =800;
    doorsG.add(door);
     
    climber.lifetime =800;
    climbersG.add(climber);
    
     }
  
}
