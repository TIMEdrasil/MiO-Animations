export default class Star {
    #uuid: string;
    #canvas: HTMLCanvasElement;

    // Style
    #color: string;
    #opacity: number;

    // Configs
    #velocityX: number;
    #velocityY: number;
    #positionX: number;
    #positionY: number;
    #radius: number;

    constructor(uuid: string) {
        this.#uuid = uuid;
        this.#canvas = document.getElementById("MiO-Animations-Canvas") as HTMLCanvasElement;

        if (!this.#canvas) {
            console.error("MiO Animations | Star - failed to create stars");
        }

        // set style
        this.#color = "rgb(255, 255, 255)";
        this.#opacity = 0.5;

        // set configs
        this.#velocityX = Math.random() * 0.5;
        this.#velocityY = Math.random() * 0.5;
        this.#positionX = Math.random() * this.#canvas.width;
        this.#positionY = Math.random() * this.#canvas.height;
        this.#radius = Math.random();
    }

    public create() {
        const context: CanvasRenderingContext2D | null = this.#canvas.getContext("2d");

        if (context) {
            context.beginPath();
            context.arc(this.#positionX, this.#positionY, this.#radius, 0, Math.PI * 2, false);
            context.fill();
        }
    }

    public destroy() {}
}