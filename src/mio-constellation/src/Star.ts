import Utils from "../../utils";

export default class Star {
    #uuid: string;
    #canvas: HTMLCanvasElement;

    // Style
    #color: string;
    #opacity: number;

    // Configs
    #radius: number;
    #velocity: number;
    #velocityX: number;
    #velocityY: number;
    #positionX: number;
    #positionY: number;

    public get positionX(): number {
        return this.#positionX;
    }
    public set positionX(x: number) {
        this.#positionX = x;
    }

    public get positionY(): number {
        return this.#positionY;
    }
    public set positionY(y: number) {
        this.#positionY = y;
    }

    public get velocityX(): number {
        return this.#velocityX;
    }
    public set velocityX(x: number) {
        this.#velocityX = x;
    }

    public get velocityY(): number {
        return this.#velocityY;
    }
    public set velocityY(y: number) {
        this.#velocityY = y;
    }

    constructor(uuid: string) {
        this.#uuid = uuid;
        this.#canvas = document.getElementById("MiO-Animations-Canvas") as HTMLCanvasElement;

        if (!this.#canvas) {
            console.error("MiO Animations | Star - failed to create stars");
        }

        // set style
        this.#color = "255, 255, 255";
        this.#opacity = 0.5;

        // set configs
        this.#radius = Math.random() + Utils.GenerateRandom(1, 3);
        this.#velocity = 0.1;
        this.#velocityX = this.#velocity - Math.random() * 0.5;
        this.#velocityY = this.#velocity - Math.random() * 0.5;
        this.#positionX = Math.random() * this.#canvas.width;
        this.#positionY = Math.random() * this.#canvas.height;

        this.draw();
    }

    draw() {
        const context: CanvasRenderingContext2D | null = this.#canvas.getContext("2d");

        if (context) {
            context.beginPath();
            context.fillStyle = "rgba(" + this.#color + ", " + this.#opacity + ")";
            context.arc(this.#positionX, this.#positionY, this.#radius, 0, Math.PI * 2, false);
            context.fill();
        }
    }
}