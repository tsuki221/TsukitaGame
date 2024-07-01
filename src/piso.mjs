const { Sprite } = PIXI;
export class Piso{
    app;
    texture;
    sprite;
    constructor(texture, app){
      this.texture = texture;
      this.app = app;
      this.sprite = new Sprite(this.texture);
        app.ticker.add((time) => {
            this.sprite.y =app.screen.height -20;
          this.sprite.width = app.screen.width;
          this.sprite.height = 30; 
        });
        app.stage.addChild(this.sprite);
    }
  }
  