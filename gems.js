class Gems
{
  constructor(x, y, objNum, objIndex)
  {
    this.x = x;
    this.y = y;
    this.objNum = objNum;
    this.objIndex = objIndex;
    this.sprite = null;
    this.image = null;
  }

  display()
  {
    this.sprite = createSprite(this.x, this.y, 20, 20);
    
    this.sprite.velocityX = -25;
    if(this.objNum === 1)
    {
      this.image = loadImage("bronzeGem.png");
      this.sprite.addImage(this.image);
      this.sprite.scale = 0.3;
    }

    if(this.objNum === 2)
    {
      this.image = loadImage("silverGem.png");
      this.sprite.addImage(this.image);
      this.sprite.scale = 0.2;
    }

    if(this.objNum === 3)
    {
      this.image = loadImage("goldGem.png");
      this.sprite.addImage(this.image);
      this.sprite.scale = 0.2;
    }

    if(this.objNum === 4)
    {
      this.image = loadImage("diamondGem.png");
      this.sprite.addImage(this.image);
      this.sprite.scale = 0.2;
    }

    if(this.objNum === 5)
    {
      this.image = loadImage("cash.png");
      this.sprite.addImage(this.image);
      this.sprite.scale = 0.15;
    }
  }
};