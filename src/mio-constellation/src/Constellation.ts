import Utils from "../../utils";

 export default class Constellation {
     #canvas: InstanceType<typeof Utils.Canvas>;

     constructor(nodeId: string) {
         this.#canvas = new Utils.Canvas(nodeId);
         this.#canvas.getContext("2d");
     }
 }