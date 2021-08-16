var ground;
var playingChar, villain, cactusImg1, cactusImg2, cactusImg3;
var obstacle1group, rand, bg, bgImg, button2, bgImg2;
var time, lives=3;
var score=0;
var gunGroup;

var gameState = "start";

function preload() {

  villainImg = loadAnimation("images/weirdBoy/tile000.png", "images/weirdBoy/tile001.png", "images/weirdBoy/tile002.png", "images/weirdBoy/tile003.png", "images/weirdBoy/tile005.png")
  cactusImg1=loadImage("images/cactus1.png");
  cactusImg2=loadImage("images/cactus2.png");
  cactusImg3=loadImage("images/cactus3.png");
  bgImg=loadImage("images/desertBackground.jpg");
  bgImg2=loadImage("images/Australian_Grasslands.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  var start = createButton("startButton");
  start.position(200, 200);
  start.mousePressed(() => {
    start.hide();
    bg=createSprite(width/2,height/2);
    bg.addImage("background",bgImg);
    bg.addImage("background",bgImg2);
    bg.scale=2.5;
    bg.velocityX=-2;
    gameState = "play";
    ground = createSprite(width / 2, height - 50, width, 22);

    playingChar = createSprite(width - 100, height - 100, 100, 50);

    villain = createSprite(100, height - 100, 100, 50);
    villain.addAnimation("villain", villainImg);
    obstacle1group = new Group();
    gunGroup=new Group();
     button2=createSprite(200,250,50,20);
    button2.visible=false;
  })



}

function draw() {
  console.log(score);
  background("skyblue");
  drawSprites();
  if (gameState === "play") {
    if(bg.x<150){
      bg.x=width/2;
    }
    spawnObstacleslev1();
    spawnGunslevel1();
    if (keyDown("UP_ARROW"))
      playingChar.y -= 30;
    if (keyDown("RIGHT_ARROW"))
      playingChar.x += 5;

    //if (playingChar.y <= height / 3)
    playingChar.velocityY += 0.9;

    playingChar.collide(ground);

    if (villain.isTouching(obstacle1group))
      villain.y -= 30;

    villain.velocityY += 1;

    villain.collide(ground);
    if(playingChar.isTouching(gunGroup)){
      gunGroup.destroyEach();
      score++;
    }
    if(score>=5){
      text("Proceed to next level?",200,200);
      button2.visible=true;
    if(mousePressedOver(button2)){
      gameState="level1";
    }
      
    }
  }
  if(gameState==="level1"){
    bg.changeImage("background",bgImg2);

    
  }
}

function spawnObstacleslev1() {
  if (frameCount % 95 === 0) {
    var obstacle1 = createSprite(0, height - 100, 20, 20);
    obstacle1.velocityX = 10;
    obstacle1group.add(obstacle1);
    rand=Math.round(random(1,3));
    
    obstacle1.lifetime=1000;
    if(rand===1){
     obstacle1.addImage("cactus1",cactusImg1);
    }
    else if(rand===2){
      obstacle1.addImage("cactus2",cactusImg2);
    }
    else 
      obstacle1.addImage("cactus3",cactusImg3);

      obstacle1.scale=0.1;
  }
}

  function spawnGunslevel1() {
    if (frameCount % 200 === 0) {
      var gun = createSprite(0, height - 350, 20, 20);
      gun.velocityX = 10;
      gunGroup.add(gun);
      /*
      rand=Math.round(random(1,3));
      console.log(rand);
      if(rand===1){
       gun.addImage("cactus1",cactusImg1);
      }
      else if(rand===2){
        gun.addImage("cactus2",cactusImg2);
      }
      else 
        gun.addImage("cactus3",cactusImg3);
  
        gun.scale=0.1;
        */
    }
     
  }
