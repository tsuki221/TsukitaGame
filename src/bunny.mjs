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

    velocity = 10;

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
            this.sprite.y = this.groundPosition;
            switch (this.inputEvent) {
                case "a": return this.moveX(-this.velocity, time);
                case "d": return this.moveX(this.velocity, time);
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
        this.sprite.y += 101.5 * time.deltaTime;
    }


    startInput() {
        const resetAngle = () => {
            if (this.isInGround) {
                this.sprite.angle = 0;
            }
        }

        // Input Event
        addEventListener("keypress", (event) => {
            this.inputEvent = event.key;
            resetAngle();
        });

        addEventListener("keyup", (event) => {
            if (event.key != this.inputEvent) return;
            this.inputEvent = null;
        });
    }
}