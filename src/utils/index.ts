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
}