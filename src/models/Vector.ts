export default class Vector {
    x : number;
    y : number;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    public translate(deltaX : number, deltaY : number) : Vector {
        return new Vector(this.x + deltaX, this.y + deltaY);
    }

    public rotate(degrees : number) : Vector {
        let radians = this.degreeToRadians(degrees);
        return new Vector(
            this.x * Math.cos(radians) - this.y * Math.sin(radians),
            this.x * Math.sin(radians) + this.y * Math.cos(radians)
        );
    }

    private degreeToRadians(degrees : number) : number {
        return Math.PI / 180 * degrees;
    }
}