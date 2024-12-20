import plugin_replace from "@rollup/plugin-replace";
import plugin_resolve from "@rollup/plugin-node-resolve";
import plugin_babel from "@rollup/plugin-babel";
import plugin_serve from "rollup-plugin-serve";
import plugin_typescript from "@rollup/plugin-typescript";

const PROJECT_BASE = process.env.npm_config_projectName ? "examples/" + process.env.npm_config_projectName : "static";

export default {
    input: "src/index.ts",
    output: {
        name: "MiOAnimations",
        format: "iife",
        file: PROJECT_BASE + "/dist/mio-animations.js",
        extend: true,
    },
    plugins: [
        plugin_replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
            preventAssignment: true,
        }),
        plugin_resolve(),
        plugin_typescript({
            tsconfig: "./tsconfig.json",
            outputToFilesystem: false
        }),
        plugin_babel({
            babelHelpers: "bundled",
            exclude: "node_modules/**"
        }),
        plugin_serve({
            contentBase: PROJECT_BASE,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            mimeTypes: {
                'application/javascript': ['js', 'mjs'],
                'text/plain': ['ts']
            },
            onListening: function (server) {
                const address = server.address();
                const host = address.address === "::" ? "localhost" : address.address;

                // by using a bound function, we can access options as `this`
                const protocol = this.https ? "https" : "http";
                console.log(`Server listening at ${protocol}://${host}:${address.port}/`);
            }
        })
    ]
};
