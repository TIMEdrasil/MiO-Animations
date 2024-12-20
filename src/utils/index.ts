import Canvas from "./Canvas";

export default class Utils {
    public static Canvas = Canvas;

    public static GenerateUUID() {
        const string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

        return string.replace(/[xy]/g, function (char: string) {
            const r: number = Math.random() * 16 | 0;
            const v: number = char == "x" ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    }

    public static GenerateRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static GetType(target: any, mode?: string): string {
        if (!mode) {
            return Object.prototype.toString.call(target);
        } else {
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