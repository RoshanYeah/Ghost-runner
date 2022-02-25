var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){  
  towerImg = loadImage("tower.png")
  ghostImg = loadImage("ghost-standing.png")
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
}

function setup() {
  createCanvas(600,600)
  tower = createSprite(300,300)
  tower.addImage("tower",towerImg)
  tower.velocityY=1

  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghostStanding", ghostImg)
  ghost.scale=0.3

  invisibleBlockGroup= new Group()
  doorsGroup= new Group()
  climbersGroup= new Group()
}

function draw() {
  background(0);

  if(gameState=='play'){
    if(tower.y>400){
      tower.y=300
    }
    
      if(keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY+=0.8
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x+=3
    }
    
    if(keyDown("LEFT_ARROW")){
      ghost.x+=-3
    }
    SpawnDoors()
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy()
      gameState="end"
    }

    drawSprites()
  }

  if(gameState==="end"){
    fill("red")
    textSize(25)
    text("Game Over", 230,300)
  }
  
  
  
}

function SpawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50)
    door.x=Math.round(random(120,400))
    door.addImage("doors",doorImg)
    door.velocityY=1
    var climber = createSprite(200,10)
    climber.addImage("climbers",climberImg)
    climber.velocityY=1
    climber.x=door.x
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    climbersGroup.add(climber)
    doorsGroup.add(door)
    var invisibleBlock = createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.debug=true

    invisibleBlock.lifetime=800
    door.lifetime=800
    climber.lifetime=800
  }

}
