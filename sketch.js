var gameState = -1;
var wealthCount = 0;
var thief;
var thiefImg;
var bgrd1, bgrd2, bgrdImg, instructionsBGRD;
var gem, objectsArray;
var police1, police2;
var objectIndex = 0;
var lifeCount = 3;
var upperInvisible, lowerInvisible;
var playIcon, playIconImg, restartIcon, restartIconImg;
var naarangi1, naarangi2;
let gemCollectSound, policeSirenSound, naarangiComingSound, explosionSound;
var startSprite;
var startSpriteImg, endBGRDImg;

function preload()
{
  gemCollectSound = loadSound("gemCollectSound.wav");
  policeSirenSound = loadSound("policeSiren.wav");
  naarangiComingSound = loadSound("naarangiComingSound.wav");
  explosionSound = loadSound("explosion.wav");

  bgrdImg = loadImage("background.jpg");
  instructionsBGRD = loadImage("instructionsBGRD.jpg");
  playIconImg = loadImage("playIcon.png");
  startSpriteImg = loadImage("choruStartState.png");
  endBGRDImg = loadImage("ChoruBehindBars.jpg");
  restartIconImg = loadImage("restartIcon.png");
}
function setup()
{
  createCanvas(displayWidth, displayHeight);
  bgrd1 = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bgrd1.addImage(bgrdImg);
  bgrd1.scale = 2.2;
  bgrd1.visible = false;

  bgrd2 = createSprite(displayWidth + displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bgrd2.addImage(bgrdImg);
  bgrd2.scale = 2.2;
  bgrd2.visible = false;

  upperInvisible = createSprite(displayWidth/2, 5, displayWidth, 5);
  upperInvisible.visible = false;
  lowerInvisible = createSprite(displayWidth/2, displayHeight - 5, displayWidth, 5);
  lowerInvisible.visible = false;

  thief = new Thief(displayWidth/10, displayHeight/2);
  thief.display();

  playIcon = createSprite(displayWidth/2 + 100, displayHeight - 185);
  playIcon.addImage(playIconImg);
  playIcon.scale = 0.3;

  startSprite = createSprite(displayWidth - 200, displayHeight - 150, 20, 20);
  startSprite.addImage(startSpriteImg);
  startSprite.scale = 0.4;

  restartIcon = createSprite(displayWidth/2, displayHeight/2, 20, 20);
  restartIcon.addImage(restartIconImg);
  restartIcon.scale = 0.05;
  restartIcon.visible = false;
  objectsArray = new Array();

  gameState = 0;
}

function draw()
{
  background(255);

  if(gameState === 0)
  {
    background(instructionsBGRD);
    fill("white");
    textSize(30);
    textFont("Lucida Calligraphy");
    text("BHAAGH  CHORU  BHAAGH !!", displayWidth/3.5, 100);
    textSize(20);
    text("* You are a night-time Robinhood CHORU who robs wealth from the rich and gives it to the poor.", displayWidth/11, 200);
    text("* You need to accumulate as much wealth as possible without getting caught by the police.", displayWidth/11, 265);
    text("* You can use the UP and DOWN Arrow Keys to move CHORU.", displayWidth/11, 330);
    text("* CHORU can collect a variety of wealth like DIAMOND, GOLD, SILVER, BRONZE and CASH to become rich.", displayWidth/11, 395);
    text("* Choru has to be beware of the Demon NAARANGI who steals wealth from CHORU.", displayWidth/11, 460);
    text("* CHORU has 3 lives to escape from the cop.", displayWidth/11, 525);
    text("* Press the PLAY Button to help CHORU do a good deed.", displayWidth/11, 590);

    if(playIcon != null)
    {
      if(mousePressedOver(playIcon))
      {
        playIcon.destroy();
        startSprite.destroy();
        gameState = 1;
      }
    }
  }

  if(gameState === 1)
  {
    thief.sprite.visible = true;
    thief.sprite.collide(upperInvisible);  
    thief.sprite.collide(lowerInvisible);
    if(keyDown("up")) thief.sprite.velocityY = -10;

    if(keyDown("down")) thief.sprite.velocityY = 10;

    if(keyWentUp("up") || keyWentUp("down")) thief.sprite.velocityY = 0;
    bgrd1.visible = true;
    bgrd2.visible = true;
    
    bgrd1.velocityX = -2;
    bgrd2.velocityX = -2;

    if(bgrd2.x === displayWidth/2) bgrd1.x = displayWidth + displayWidth/2;  
    if(bgrd1.x === displayWidth/2) bgrd2.x = displayWidth + displayWidth/2;
    if(frameCount % 20 === 0)
    {
      var r = Math.round(random(1, 7));
      if(r < 6)
      {
        gem = new Gems(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
        objectsArray[objectIndex] = gem;
        gem.display();
        objectIndex = objectIndex + 1;
      }

      if(r === 6)
      {
        police1 = new Police(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
        objectsArray[objectIndex] = police1;
        objectIndex = objectIndex + 1;
        police1.display();

        police2 = new Police(displayWidth, police1.y + 100, r, objectIndex);
        objectsArray[objectIndex] = police2;
        objectIndex = objectIndex + 1;
        police2.display();

        policeSirenSound.play();
      }

      if(r === 7)
      {
        naarangi1 = new Naarangi(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
        objectsArray[objectIndex] = naarangi1;
        naarangi1.display();
        objectIndex = objectIndex + 1;

        naarangi2 = new Naarangi(displayWidth, naarangi1.y + 100, r, objectIndex);
        objectsArray[objectIndex] = naarangi2;
        naarangi2.display();
        objectIndex = objectIndex + 1;

        naarangiComingSound.play();
      }
    }

    for(var i = 0; i < objectsArray.length; i++)
    {
      if(objectsArray[i].sprite.isTouching(thief.sprite))
      {
        if(objectsArray[i].objNum === 1)
        {
          gemCollectSound.play();
          wealthCount = wealthCount + 100;
        }

        else if(objectsArray[i].objNum === 2)
        {
          gemCollectSound.play();
          wealthCount = wealthCount + 200;
        }

        else if(objectsArray[i].objNum === 3)
        {
          gemCollectSound.play();
          wealthCount = wealthCount + 300;
        }

        else if(objectsArray[i].objNum === 4)
        {
          gemCollectSound.play();
          wealthCount = wealthCount + 400;
        }

        else if(objectsArray[i].objNum === 5)
        {
          gemCollectSound.play();
          wealthCount = wealthCount + 50;
        }

        else if(objectsArray[i].objNum === 6)
        {
          explosionSound.play();
          lifeCount = lifeCount - 1;
          if(lifeCount === 0)
          {
            destroyAllSprites();
            gameState = 2;
          }
          
        }

        else if(objectsArray[i].objNum === 7)
        {
          explosionSound.play();
          wealthCount = Math.round(wealthCount - (wealthCount/2));
        }

        objectsArray[i].sprite.destroy();
      }
    }
  }

  if(gameState === 2)
  {
    background(endBGRDImg);
    bgrd1.destroy();
    bgrd2.destroy();
    upperInvisible.destroy();
    lowerInvisible.destroy();
    restartIcon.visible = true;
   /*if(mousePressedOver(restartIcon))
    {
      restartIcon.destroy();
      lifeCount = 3;
      wealthCount = 0;
      gameState = -1;
      preload();
      setup();
    }*/
    fill("red");
    textSize(40);
    textFont("Matura MT Script Capitals");
    text("Game Over !! Choru has been Arrested.", displayWidth/2 - 450, displayHeight/7);
    text("Choru has robbed wealth worth " + wealthCount + " Rupees !!", displayWidth/2 - 450, displayHeight/7 + 50);
    text("Replay", displayWidth/2 - 75, displayHeight/2 - 50);
  }
  drawSprites(); 

  if(gameState === 1)
  {
    fill("white");
    textSize(15);
    textFont("Lucida Calligraphy");
    text("Wealth collected: Rs. " + wealthCount, displayWidth/2 - 200, displayHeight/10);
    text("Lives Left: " + lifeCount, displayWidth/2 + 100, displayHeight/10);
  }
}

function destroyAllSprites()
{
  thief.sprite.destroy();
  for(var i = 0; i < objectsArray.length; i++)
  {
    if(objectsArray.sprite != null) objectsArray[i].sprite.destroy();
  }
}