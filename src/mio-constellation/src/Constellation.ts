import Utils from "../../utils";
import Star from "./Star";
import Line from "./Line";

 export default class Constellation {
     #canvas: InstanceType<typeof Utils.Canvas>;
     #context: CanvasRenderingContext2D;
     #animationFrame: number | null;
     #starContainer: Map<string, Star>;
     #eventMousemove: Function | null;
     #eventResize: Function | null;

     constructor(nodeId: string) {
         this.#canvas = new Utils.Canvas(nodeId);
         this.#context = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
         this.#canvas.getNode().style.background = "rgba(46, 46, 46, 1)";

         this.#animationFrame = null;
         this.#eventMousemove = null;
         this.#eventResize = null;

         // init stars
         this.#starContainer = new Map<string, Star>();
         this.#initializeStars();

         // init line
         this.#initializeLine();

         // init event
         this.#initializeEvent();

         this.#requestAnimationFrame(this.#animate.bind(this));
     }

     #initializeStars(total?: number): void {
         let _total: number | undefined = total;
         if (!_total) {
             _total = 200;
         }

         let count: number = 0;
         while (count < _total) {
             const uuid: string = Utils.GenerateUUID();
             this.#starContainer.set(uuid, new Star(uuid));

             count += 1;
         }
     }

     #initializeLine(): void {
         Line.Canvas = this.#canvas.getNode();
         Line.Context = this.#context;

         // set style
         Line.Color = "255, 255, 255";
         Line.Opacity = 0.5;
         Line.Width = 0.2;

         // set config
         Line.Distance = 100;
         Line.Radius = 100;
         Line.PositionX = this.#canvas.getNode().width * 0.5;
         Line.PositionY = this.#canvas.getNode().height * 0.5;
     }

     #initializeEvent(): void {
         this.#eventMousemove = (event: MouseEvent): void => {
             if (Line.Canvas) {
                 Line.PositionX = event.pageX - Line.Canvas.offsetLeft;
                 Line.PositionY = event.pageY - Line.Canvas.offsetTop;
             }
         }

         this.#eventResize = (): void => {
             this.dispose();
             this.initialize();
         }

         window.addEventListener("mousemove", this.#eventMousemove.bind(this));
         window.addEventListener("resize", this.#eventResize.bind(this));
     }

     #animate(): void {
         this.#starContainer.forEach((star: Star): void => {
             if (star.positionX < 0 || star.positionX > this.#canvas.getNode().width) {
                 star.velocityX = - star.velocityX;
                 star.velocityY = star.velocityY;
             } else if (star.positionY < 0 || star.positionY > this.#canvas.getNode().height) {
                 star.velocityX = star.velocityX;
                 star.velocityY = - star.positionY;
             }

             star.positionX += star.velocityX;
             star.positionY += star.velocityY;

             star.draw();

             this.#starContainer.forEach((targetStar: Star): void => {
                 if (
                     (star.positionX - targetStar.positionX) < Line.Distance &&
                     (star.positionY - targetStar.positionY) < Line.Distance &&
                     (star.positionX - targetStar.positionX) > - Line.Distance &&
                     (star.positionY - targetStar.positionY) > - Line.Distance
                 ) {
                     if (
                         (star.positionX - Line.PositionX) < Line.Radius &&
                         (star.positionY - Line.PositionY) < Line.Radius &&
                         (star.positionX - Line.PositionX) > - Line.Radius &&
                         (star.positionY - Line.PositionY) > - Line.Radius
                     ) {
                         Line.Draw(star.positionX, star.positionY, targetStar.positionX, targetStar.positionY);
                     }
                 }
             })
         });
     }

     #requestAnimationFrame(callback: Function) {
         callback();

         this.#animationFrame = window.requestAnimationFrame(() => {
             this.#context.clearRect(0, 0, this.#canvas.getNode().width, this.#canvas.getNode().height);
             this.#requestAnimationFrame(this.#animate.bind(this));
         });
     }

     public setRange(radius?: number, distance?: number): boolean {
         try {
             const _radius: number | undefined = radius;
             if (_radius && Utils.GetType(_radius) === "[object Number]" && _radius >= 0) {
                 Line.Radius = _radius;
             }

             const _distance: number | undefined = distance;
             if (_distance && Utils.GetType(_distance) === "[object Number]" && _distance >= 0) {
                 Line.Distance = _distance;
             }

             return true;
         } catch (error) {
             console.warn("MiO Animations | Constellation - failed to set range")
             return false;
         }
     }

     public initialize(): boolean {
         try {
             this.#canvas.initialize();
             this.#initializeStars();
             this.#initializeLine();
             this.#initializeEvent();

             this.#requestAnimationFrame(this.#animate.bind(this));

             return true;
         } catch (error) {
             console.warn("MiO Animations | Constellation - failed to initialize")
             return false;
         }
     }

     public dispose(): boolean {
         try {
             this.#context.clearRect(0, 0, this.#canvas.getNode().width, this.#canvas.getNode().height);
             window.cancelAnimationFrame(this.#animationFrame as number);

             window.removeEventListener("mousemove", this.#eventMousemove as EventListenerOrEventListenerObject);
             window.removeEventListener("resize", this.#eventResize as EventListenerOrEventListenerObject);

             this.#canvas.dispose();

             this.#animationFrame = null;
             this.#eventMousemove = null;
             this.#eventResize = null;
             this.#starContainer.clear();

             return true;
         } catch (error) {
             console.warn("MiO Animations | Constellation - failed to dispose")
             return false;
         }
     }
 }