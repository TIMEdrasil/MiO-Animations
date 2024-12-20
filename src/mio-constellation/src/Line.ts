import Star from "./Star";

export default class Line {
    public static Canvas: HTMLCanvasElement;
    public static Context: CanvasRenderingContext2D;

    // Style
    public static Color: string;
    public static Opacity: number;
    public static Width: number;

    // Config
    public static Distance: number;
    public static Radius: number;
    public static PositionX: number;
    public static PositionY: number;

    public static Draw(starX: number, starY: number, targetX: number, targetY: number) {
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