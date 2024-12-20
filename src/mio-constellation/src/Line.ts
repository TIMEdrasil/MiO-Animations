export default class Line {
    #color: string;
    #opacity: number;
    #width: number;

    constructor() {
        this.#color = "rgb(255, 255, 255)";
        this.#opacity = 0.5;
        this.#width = 0.2;
    }

    public create() {}

    public destroy() {}
}