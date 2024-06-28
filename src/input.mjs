
import { Vector2 } from "./vector.mjs";

export const useInput = () => {

    const inputAxis = Vector2.zero();

    const addEvents = (events) => {

        // Input Event
        addEventListener("keydown", (event) => {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    inputAxis.X = -1;
                    break;
                case "d":
                case "ArrowRight":
                    inputAxis.X = 1;
                    break;
                case " ":
                case "ArrowUp":
                    inputAxis.Y = 1;
                    break;
                case "s":
                case "ArrowDown":
                    inputAxis.Y = -1; break;
            }
            events.onKeyDown(event.key);
        });

        addEventListener("keyup", (event) => {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    if (inputAxis.X == 1) break;
                    inputAxis.X = 0; break;
                case "d":
                case "ArrowRight":
                    if (inputAxis.X == -1) break;
                    inputAxis.X = 0; break;
                case " ":
                case "ArrowUp":
                    if (inputAxis.Y == -1) break;
                    inputAxis.Y = 0; break;
                case "s":
                case "ArrowDown":
                    if (inputAxis.Y == 1) break;
                    inputAxis.Y = 0; break;
            }

            events.onKeyUp(event.key);
        });
    }

    return {
        inputAxis,
        addEvents,
    }
}