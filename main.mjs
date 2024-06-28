import { MiBunny } from "./src/bunny.mjs";

const { Application, Assets } = PIXI;

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

