export class Vector2 {
    X;
    Y;
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }

    getDistanceVector(end) {
        return new Vector2(
            Math.Abs(end.X - this.X),
            Math.Abs(end.Y - this.Y));
    }

    distanceTo(point) {
        const distanceVector = GetDistanceVector(point);
        return Math.Sqrt(
            Math.Pow(distanceVector.X, 2) +
            Math.Pow(distanceVector.Y, 2));
    }

    add(vector) {
        this.X += vector.X;
        this.Y += vector.Y;
        return this;
    }

    withMagnitude(magnitude) {
        this.X *= magnitude;
        this.Y *= magnitude;
        return this;
    }

    normalized() {
        const magnitude = Math.max(this.X, this.Y);
        return this.withMagnitude(magnitude);
    }

    static identity() {
        return new Vector2(1, 1);
    }

    static zero() {
        return new Vector2(0, 0);
    }
}
