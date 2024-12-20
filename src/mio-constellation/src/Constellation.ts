import Utils from "../../utils";
import Star from "./Star";
import Line from "./Line";

 export default class Constellation {
     #canvas: InstanceType<typeof Utils.Canvas>;
     #context: CanvasRenderingContext2D;
     #animationFrame: number | null;
     #starContainer: Map<string, Star>;
     #lineContainer: Map<string, Line>;

     constructor(nodeId: string) {
         this.#canvas = new Utils.Canvas(nodeId);
         this.#context = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
         this.#context.fillStyle = "rgba(46, 46, 46, 1)";
         this.#context.fillRect(0, 0, this.#canvas.getNode().width, this.#canvas.getNode().height);

         this.#starContainer = new Map<string, Star>();
         this.#lineContainer = new Map<string, Line>();

         this.#animationFrame = window.requestAnimationFrame(() => {
             this.begin()
         });
     }

     public begin() {
     }
 }