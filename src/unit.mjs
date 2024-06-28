const { Sprite } = PIXI;

import { useInput } from "./input.mjs";
import { usePhysics } from "./physics.mjs";
import { Vector2 } from "./vector.mjs";

export class Unit {
    app;
    texture;
    sprite;

    inputAxis;

    bodyForce = Vector2.zero();
    physics;

    inputEvents = {
        onKeyDown: (key) => { },
        onKeyUp: (key) => { }
    }

    constructor(texture, app) {
        this.app = app;
        this.texture = texture;
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.physics = usePhysics(this.bodyForce);
        const { inputAxis, addEvents } = useInput();
        addEvents(this.inputEvents);
        this.inputAxis = inputAxis;
    }

    applyForce() {
        this.sprite.y -= this.bodyForce.Y * 0.2;
        this.sprite.x += this.bodyForce.X;

        if (this.sprite.y > this.groundPosition) this.sprite.y = this.groundPosition;
    }

    keepInWindow() {
        const offset = this.sprite.height / 2;
        const { height, width } = this.app.screen;
        if (this.sprite.x > width) this.sprite.x = offset;
        if (this.sprite.x < 0) this.sprite.x = width - offset;
        if (this.sprite.y > height) this.sprite.y = height - offset;
        if (this.sprite.y < 0) this.sprite.y = offset;
    }

    moveX(velocity, deltaTime) {
        this.sprite.x += velocity * deltaTime;
    }

    moveY(velocity, deltaTime) {
        this.sprite.y += velocity * deltaTime;
    }

    resetAngle() {
        this.sprite.angle = 0;
    }
}