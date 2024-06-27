const { Application, Assets, Sprite } = PIXI;

// Asynchronous IIFE
(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.querySelector("#game-container").appendChild(app.canvas);

  const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

  const numberOfBunnies = 1;
  // Hacer muchos conejos
  new Array(numberOfBunnies).fill(null).forEach((element) => {
    element = new MiBunny(texture, app);
  });
})();

class MiBunny {
  // Variables
  app;
  texture;
  sprite;
  groundPosition = 1000
  isInGround = false;

  constructor(texture, app) {
    this.app = app;
    this.texture = texture;
    this.sprite = new Sprite(texture);
    app.stage.addChild(this.sprite);

    // Initial position
    this.sprite.anchor.set(0.5);
    this.sprite.x = random(
      this.sprite.width,
      app.screen.width - this.sprite.width
    );
    this.sprite.y = 0;

    const onUpdate = (time) => {
      this.groundPosition = app.screen.height - this.sprite.height / 2;
      this.isInGround = this.sprite.y >= this.groundPosition;

      if (this.isInGround) {
        this.sprite.y = this.groundPosition;
        // this.sprite.angle = 180;
      } else {
        // Fall
        this.sprite.angle += 6 * time.deltaTime;
        this.sprite.y += 1.5 * time.deltaTime;
      }
    };
    app.ticker.add(onUpdate);
    this.startInput();
  }

  startInput() {
    const resetAngle = () =>{
      if (this.isInGround) {
        this.sprite.angle = 0;
      }
    }

    // Input Event
    addEventListener("keydown", (event) => {
      if (event.key === "a") {
        this.sprite.x -= 10;
        resetAngle();
      } // Move left
      if (event.key === "d") {
        this.sprite.x += 10;
        resetAngle();
      } // Move right
    });
  }
}

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
