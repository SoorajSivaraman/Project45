class Thief
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.image = loadAnimation("thief1.png", "thief2.png", "thief3.png", "thief4.png", "thief5.png",
    "thief6.png", "thief7.png", "thief8.png", "thief9.png", "thief10.png");
  }

  display()
  {
    this.sprite = createSprite(this.x, this.y, 20, 20);
    this.sprite.addAnimation("moving", this.image);
    this.sprite.scale = 0.8;
    this.sprite.visible = false;
  }
};