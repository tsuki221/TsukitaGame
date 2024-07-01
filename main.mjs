import { MiBunny } from "./src/bunny.mjs";
import { Background } from "./src/background.mjs";
import { Piso } from "./src/piso.mjs";

const { Application, Assets } = PIXI;

// Asynchronous IIFE
(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.querySelector("#game-container").appendChild(app.canvas);

  const bunnyTexture = await Assets.load("https://pixijs.com/assets/bunny.png");
  const patoTexture = await Assets.load("./material/pato1.png");
  const backgroundTexture= await Assets.load("./material/background_0.png");
  const backgroundTexture1= await Assets.load("./material/background_1.png");
  const backgroundTexture2= await Assets.load("./material/background_2.png");
  const pisoTexture= await Assets.load("./material/piso0.png");

  const background1 = new Background(backgroundTexture, app);
  const background2 = new Background(backgroundTexture1, app);
  const background3 = new Background(backgroundTexture2, app);
  const piso = new Piso(pisoTexture,app);

  const numberOfBunnies = 1;
  // Hacer muchos conejos
  new Array(numberOfBunnies).fill(null).forEach((element) => {
    element = new MiBunny(patoTexture, app);
  });

})();
