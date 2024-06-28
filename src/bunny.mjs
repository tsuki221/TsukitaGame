const { Sprite } = PIXI;

import { Utils } from "./utils.mjs";

export class MiBunny {
    // Variables
    app;
    texture;
    sprite;
    groundPosition = 1000
    isInGround = false;
    inputAxis = {
        x: 0,
        y: 0,
    }

    YForce = 0;
    gravity = 3.5;

    velocity = 10;
    jumpVelocity = 4;

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

        if (!this.isInGround) {
            this.addGravity(time);
            this.fallAnimation(time);
        } else {
            if (this.inputAxis.x != 0) this.resetAngle();
        }

        this.addYForce(this.jumpVelocity * this.inputAxis.y, time);
        this.moveX(this.velocity * this.inputAxis.x, time);
        this.placeInWindow();

    }

    placeInWindow() {
        const offset = this.sprite.height / 2;
        const { height, width } = this.app.screen;
        if (this.sprite.x > width) this.sprite.x = offset;
        if (this.sprite.x < 0) this.sprite.x = width - offset;
        if (this.sprite.y > height) this.sprite.y = height - offset;
        if (this.sprite.y < 0) this.sprite.y = offset;
    }

    addYForce(velocity, time) {
        this.YForce += (velocity - this.gravity) * time.deltaTime;
        if (this.YForce <= 0) this.YForce = 0;

        this.sprite.y -= this.YForce;
    }

    addGravity(time) {
        this.sprite.y += this.gravity * time.deltaTime;
    }

    moveX(velocity, time) {
        this.sprite.x += velocity * time.deltaTime;
    }

    moveY(velocity, time) {
        this.sprite.y += velocity * time.deltaTime;
    }

    fallAnimation(time) {
        this.sprite.angle += 6 * time.deltaTime;
    }

    resetAngle() {
        this.sprite.angle = 0;
    }

    startInput() {
        // Input Event
        addEventListener("keydown", (event) => {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    this.inputAxis.x = -1; break;
                case "d":
                case "ArrowRight":
                    this.inputAxis.x = 1; break;
                case " ":
                case "ArrowUp":
                    this.inputAxis.y = 1; break;
                case "s":
                case "ArrowDown":
                    this.inputAxis.y = -1; break;
            }
        });

        addEventListener("keyup", (event) => {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    this.inputAxis.x = 0; break;
                case "d":
                case "ArrowRight":
                    this.inputAxis.x = 0; break;
                case " ":
                case "ArrowUp":
                case "s":
                case "ArrowDown":
                    this.inputAxis.y = 0; break;
            }
            console.log(this.inputAxis)
        });
    }
}