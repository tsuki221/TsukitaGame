const { Sprite } = PIXI;

import { Utils } from "./utils.mjs";

export class MiBunny {
    // Variables
    app;
    texture;
    sprite;
    groundPosition = 1000
    isInGround = false;
    inputEvent = null

    gravity = 3.5;

    velocity = 10;
    jumpVelocity = 50;

    constructor(texture, app) {
        this.app = app;
        this.texture = texture;
        this.sprite = new Sprite(texture);

        // Initial position
        this.sprite.anchor.set(0.5);
        this.sprite.x = Utils.random(
            this.sprite.width,
            app.screen.width - this.sprite.width
        );
        this.sprite.y = 0;

        app.stage.addChild(this.sprite);
        app.ticker.add((time) => this.onUpdate(time));
        this.startInput();
    }

    onUpdate(time) {
        this.groundPosition = this.app.screen.height - this.sprite.height / 2;
        this.isInGround = this.sprite.y >= this.groundPosition;

        if (this.isInGround) {
            switch (this.inputEvent) {
                case "a":
                case "ArrowLeft":    
                    return this.moveX(-this.velocity, time);
                case "d":
                case "ArrowRight": 
                     return this.moveX(this.velocity, time);

                case " ":
                case "ArrowUp":
                    return this.moveY(-this.jumpVelocity, time);

                case "s":
                case "ArrowDown":
                    return this.moveY(this.jumpVelocity, time);
                default:
                    this.sprite.y = this.groundPosition;
            }
            // this.sprite.angle = 180;
        } else this.fall(time);
    }

    moveX(velocity, time) {
        console.log(velocity)
        this.sprite.x += velocity * time.deltaTime;
    }
    moveY(velocity, time) {
        this.sprite.y += velocity * time.deltaTime;
    }

    fall(time) {
        this.sprite.angle += 6 * time.deltaTime;
        this.sprite.y += this.gravity * time.deltaTime;
    }


    startInput() {
        const resetAngle = () => {
            if (this.isInGround) {
                this.sprite.angle = 0;
            }
        }

        // Input Event
        addEventListener("keydown", (event) => {
            this.inputEvent = event.key;
            console.log(this.inputEvent);
            resetAngle();
        });

        addEventListener("keyup", (event) => {
            if (event.key != this.inputEvent) return;
            this.inputEvent = null;
        });
    }
}