class Naarangi
{
    constructor(x, y, objNum, objIndex)
    {
      this.x = x;
      this.y = y;
      this.objNum = objNum;
      this.objIndex = objIndex;
      this.sprite = null;
      this.image = loadImage("naarangi.png");
    }
  
    display()
    {
      this.sprite = createSprite(this.x, this.y, 20, 20);
      this.sprite.addImage(this.image);
      this.sprite.scale = 0.1;
      this.sprite.velocityX = -50;
    }
};