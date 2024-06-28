
import { Unit } from "./unit.mjs";
import { Utils } from "./utils.mjs";

export class MiBunny extends Unit {
    // Variables
    groundPosition
    isInGround = false;
    canJump = false;

    walkVelocity = 8;
    jumpVelocity = 300;
    fallRotationVelocity = 6;

    constructor(texture, app) {
        super(texture, app);

        // Initial position
        this.sprite.x = Utils.random(
            this.sprite.width,
            app.screen.width - this.sprite.width
        );
        this.sprite.y = 0;

        this.inputEvents.onKeyDown = (key) => this.onKeyDown(key);

        app.stage.addChild(this.sprite);
        app.ticker.add((time) => this.onUpdate(time));
    }

    onUpdate(time) {
        super.onUpdate(time.deltaTime);
        this.groundPosition = this.app.screen.height - this.sprite.height / 2;
        this.isInGround = this.sprite.y >= this.groundPosition;

        if (this.isInGround) {
            this.canJump = true;
            if (this.inputAxis.X != 0) this.resetAngle();
        } else {
            this.canJump = false;
            this.fallAnimation(this.fallRotationVelocity * time.deltaTime, this.inputAxis.X);
        }
        this.moveX(this.inputAxis.X * this.walkVelocity, time.deltaTime);

        if (this.canJump) this.jump(this.jumpVelocity * time.deltaTime);

        this.keepInWindow();
    }

    onKeyDown(key) {
        console.log(this.inputAxis, this.bodyForce);
    }

    jump(velocity) {
        this.physics.addForceY(this.inputAxis.Y * velocity);
    }

    fallAnimation(velocity, sideDirection) {
        if (sideDirection == 0) this.sprite.angle += velocity;
        else this.sprite.angle += velocity * sideDirection;
    }

}