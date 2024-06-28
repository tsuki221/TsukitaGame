import { Vector2 } from "./vector.mjs";

export const usePhysics = (bodyForce) => {
    const gravity = 9.8;
    const friction = 0.5;

    // force is a Vector2
    const addForce = (force) => {
        bodyForce.add(
            new Vector2(
                force.X,
                force.Y));
    }

    const addForceX = (forceX) => bodyForce.X += forceX;
    const addForceY = (forceY) => bodyForce.Y += forceY;

    const applyGravity = (deltaTime) => {
        const velocity = (gravity * deltaTime);
        bodyForce.Y -= velocity
        if (bodyForce.Y < gravity) bodyForce.Y = -gravity;
    }

    const applyFriction = (deltaTime) => {
        const velocity = (friction * deltaTime);

        if (bodyForce.X > 0) {
            bodyForce.X -= velocity;
            if (bodyForce.X < 0) bodyForce.X = 0;
        }
        else {
            bodyForce.X += velocity;
            if (bodyForce.X > 0) bodyForce.X = 0;
        }

    }
    
    return {
        addForce,
        addForceX,
        addForceY,
        applyGravity,
        applyFriction,
    }
}