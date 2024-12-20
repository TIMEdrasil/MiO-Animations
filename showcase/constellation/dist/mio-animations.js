this.MiOAnimations = (function () {
    'use strict';

    class Canvas {
        #nodeParent;
        #nodeCanvas;
        // Event
        #eventResize;
        constructor(nodeId) {
            switch (true) {
                case nodeId.includes("#"):
                    this.#nodeParent = document.getElementById(nodeId.substring(1));
                    break;
                case nodeId.includes("."):
                    this.#nodeParent = document.getElementsByClassName(nodeId.substring(1))[0];
                    break;
                default:
                    this.#nodeParent = null;
            }
            if (!this.#nodeParent) {
                console.error("MiO Animations | Canvas - failed to get the parent node: ", nodeId);
            }
            this.#nodeCanvas = document.createElement("canvas");
            this.#nodeCanvas.setAttribute("id", "MiO-Animations-Canvas");
            this.#eventResize = null;
            this.#initialize();
            this.#initializeEvent();
        }
        #initialize() {
            if (this.#nodeParent && this.#nodeCanvas) {
                this.#nodeParent.appendChild(this.#nodeCanvas);
                if (this.#nodeParent) {
                    if ("style" in this.#nodeParent) {
                        this.#nodeParent.style.position = "relative";
                        this.#nodeParent.style.overflow = "hidden";
                    }
                }
                this.#nodeCanvas.width = this.#nodeParent.clientWidth;
                this.#nodeCanvas.height = this.#nodeParent.clientHeight;
            }
        }
        #initializeEvent() {
            this.#eventResize = () => {
                if (this.#nodeParent && this.#nodeCanvas) {
                    this.#nodeCanvas.width = this.#nodeParent.clientWidth;
                    this.#nodeCanvas.height = this.#nodeParent.clientHeight;
                }
            };
            window.addEventListener("resize", this.#eventResize.bind(this));
        }
        getNode() {
            return this.#nodeCanvas;
        }
        getContext(type) {
            if (!this.#nodeCanvas) {
                return false;
            }
            else {
                switch (type.toUpperCase()) {
                    case "2D":
                        return this.#nodeCanvas.getContext("2d");
                    case "WEBGL":
                        return this.#nodeCanvas.getContext("webgl");
                    case "WEBGL2":
                        return this.#nodeCanvas.getContext("webgl2");
                    default:
                        return false;
                }
            }
        }
        initialize() {
            this.#initializeEvent();
        }
        dispose() {
            window.removeEventListener("resize", this.#eventResize);
        }
    }

    class Utils {
        static Canvas = Canvas;
        static GenerateUUID() {
            const string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
            return string.replace(/[xy]/g, function (char) {
                const r = Math.random() * 16 | 0;
                const v = char == "x" ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        static GenerateRandom(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        static GetType(target, mode) {
            if (!mode) {
                return Object.prototype.toString.call(target);
            }
            else {
                switch (mode.toUpperCase()) {
                    case "FULL":
                        return Object.prototype.toString.call(target);
                    case "SHORT":
                        return Object.prototype.toString.call(target).slice(8, -1);
                    default:
                        return Object.prototype.toString.call(target);
                }
            }
        }
    }

    class Star {
        #uuid;
        #canvas;
        // Style
        #color;
        #opacity;
        // Configs
        #radius;
        #velocity;
        #velocityX;
        #velocityY;
        #positionX;
        #positionY;
        get positionX() {
            return this.#positionX;
        }
        set positionX(x) {
            this.#positionX = x;
        }
        get positionY() {
            return this.#positionY;
        }
        set positionY(y) {
            this.#positionY = y;
        }
        get velocityX() {
            return this.#velocityX;
        }
        set velocityX(x) {
            this.#velocityX = x;
        }
        get velocityY() {
            return this.#velocityY;
        }
        set velocityY(y) {
            this.#velocityY = y;
        }
        constructor(uuid) {
            this.#uuid = uuid;
            this.#canvas = document.getElementById("MiO-Animations-Canvas");
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
            const context = this.#canvas.getContext("2d");
            if (context) {
                context.beginPath();
                context.fillStyle = "rgba(" + this.#color + ", " + this.#opacity + ")";
                context.arc(this.#positionX, this.#positionY, this.#radius, 0, Math.PI * 2, false);
                context.fill();
            }
        }
    }

    class Line {
        static Canvas;
        static Context;
        // Style
        static Color;
        static Opacity;
        static Width;
        // Config
        static Distance;
        static Radius;
        static PositionX;
        static PositionY;
        static Draw(starX, starY, targetX, targetY) {
            if (Line.Context) {
                Line.Context.beginPath();
                Line.Context.strokeStyle = "rgba(" + Line.Color + ", " + Line.Opacity + ")";
                Line.Context.lineWidth = Line.Width;
                Line.Context.moveTo(starX, starY);
                Line.Context.lineTo(targetX, targetY);
                Line.Context.stroke();
                Line.Context.closePath();
            }
        }
    }

    class Constellation {
        #canvas;
        #context;
        #animationFrame;
        #starContainer;
        #eventMousemove;
        #eventResize;
        constructor(nodeId) {
            this.#canvas = new Utils.Canvas(nodeId);
            this.#context = this.#canvas.getContext("2d");
            this.#canvas.getNode().style.background = "rgba(46, 46, 46, 1)";
            this.#animationFrame = null;
            this.#eventMousemove = null;
            this.#eventResize = null;
            // init stars
            this.#starContainer = new Map();
            this.#initializeStars();
            // init line
            this.#initializeLine();
            // init event
            this.#initializeEvent();
            this.#requestAnimationFrame(this.#animate.bind(this));
        }
        #initializeStars(total) {
            let _total = total;
            if (!_total) {
                _total = 200;
            }
            let count = 0;
            while (count < _total) {
                const uuid = Utils.GenerateUUID();
                this.#starContainer.set(uuid, new Star(uuid));
                count += 1;
            }
        }
        #initializeLine() {
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
        #initializeEvent() {
            this.#eventMousemove = (event) => {
                if (Line.Canvas) {
                    Line.PositionX = event.pageX - Line.Canvas.offsetLeft;
                    Line.PositionY = event.pageY - Line.Canvas.offsetTop;
                }
            };
            this.#eventResize = () => {
                this.dispose();
                this.initialize();
            };
            window.addEventListener("mousemove", this.#eventMousemove.bind(this));
            window.addEventListener("resize", this.#eventResize.bind(this));
        }
        #animate() {
            this.#starContainer.forEach((star) => {
                if (star.positionX < 0 || star.positionX > this.#canvas.getNode().width) {
                    star.velocityX = -star.velocityX;
                    star.velocityY = star.velocityY;
                }
                else if (star.positionY < 0 || star.positionY > this.#canvas.getNode().height) {
                    star.velocityX = star.velocityX;
                    star.velocityY = -star.positionY;
                }
                star.positionX += star.velocityX;
                star.positionY += star.velocityY;
                star.draw();
                this.#starContainer.forEach((targetStar) => {
                    if ((star.positionX - targetStar.positionX) < Line.Distance &&
                        (star.positionY - targetStar.positionY) < Line.Distance &&
                        (star.positionX - targetStar.positionX) > -Line.Distance &&
                        (star.positionY - targetStar.positionY) > -Line.Distance) {
                        if ((star.positionX - Line.PositionX) < Line.Radius &&
                            (star.positionY - Line.PositionY) < Line.Radius &&
                            (star.positionX - Line.PositionX) > -Line.Radius &&
                            (star.positionY - Line.PositionY) > -Line.Radius) {
                            Line.Draw(star.positionX, star.positionY, targetStar.positionX, targetStar.positionY);
                        }
                    }
                });
            });
        }
        #requestAnimationFrame(callback) {
            callback();
            this.#animationFrame = window.requestAnimationFrame(() => {
                this.#context.clearRect(0, 0, this.#canvas.getNode().width, this.#canvas.getNode().height);
                this.#requestAnimationFrame(this.#animate.bind(this));
            });
        }
        setRange(radius, distance) {
            try {
                const _radius = radius;
                if (_radius && Utils.GetType(_radius) === "[object Number]" && _radius >= 0) {
                    Line.Radius = _radius;
                }
                const _distance = distance;
                if (_distance && Utils.GetType(_distance) === "[object Number]" && _distance >= 0) {
                    Line.Distance = _distance;
                }
                return true;
            }
            catch (error) {
                console.warn("MiO Animations | Constellation - failed to set range");
                return false;
            }
        }
        initialize() {
            try {
                this.#canvas.initialize();
                this.#initializeStars();
                this.#initializeLine();
                this.#initializeEvent();
                this.#requestAnimationFrame(this.#animate.bind(this));
                return true;
            }
            catch (error) {
                console.warn("MiO Animations | Constellation - failed to initialize");
                return false;
            }
        }
        dispose() {
            try {
                this.#context.clearRect(0, 0, this.#canvas.getNode().width, this.#canvas.getNode().height);
                window.cancelAnimationFrame(this.#animationFrame);
                window.removeEventListener("mousemove", this.#eventMousemove);
                window.removeEventListener("resize", this.#eventResize);
                this.#canvas.dispose();
                this.#animationFrame = null;
                this.#eventMousemove = null;
                this.#eventResize = null;
                this.#starContainer.clear();
                return true;
            }
            catch (error) {
                console.warn("MiO Animations | Constellation - failed to dispose");
                return false;
            }
        }
    }

    const MiOAnimations = {
        Constellation
    };
    // @ts-ignore
    window.MiOAnimations = {
        Constellation
    };

    return MiOAnimations;

})();
