const { Sprite } = PIXI;

export class Background {
  app;
  texture;
  sprite;
  constructor(texture, app) {
    this.texture = texture;
    this.app = app;

    this.sprite = new Sprite(this.texture);

    app.ticker.add((time) => {  
        var ratio = Math.min(app.screen.width/this.texture.width, app.screen.height/this.texture.height )

      this.sprite.width =this.texture.width*4;
      this.sprite.height = app.screen.height;
    });
    app.stage.addChild(this.sprite);
  }
}

