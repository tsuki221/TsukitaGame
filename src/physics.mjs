import { Vector2 } from "./vector.mjs";

export const usePhysics = (bodyForce) => {
    const gravity = 3.5;

    // force is a Vector2
    const addForce = (force, time) => {
        bodyForce.add(
            new Vector2(
                force.X * time.deltaTime,
                force.Y * time.deltaTime));
    }

    const applyGravity = (time) => {
        bodyForce.Y -= gravity * time.deltaTime;
    }

    return {
        addForce,
        applyGravity,
    }
}