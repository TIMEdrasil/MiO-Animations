import plugin_replace from "@rollup/plugin-replace";
import plugin_resolve from "@rollup/plugin-node-resolve";
import plugin_commonjs from "@rollup/plugin-commonjs";
import plugin_babel from "@rollup/plugin-babel";
import plugin_terser from "@rollup/plugin-terser";
import plugin_typescript from "@rollup/plugin-typescript";

const cfg = {
    input: "src/index.ts",
    plugins: [
        plugin_replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
            preventAssignment: true,
        }),
        plugin_resolve(),
        plugin_commonjs(),
        plugin_typescript({
            tsconfig: "./tsconfig.json",
            outputToFilesystem: true
        }),
        plugin_babel({
            babelHelpers: "bundled",
            exclude: "node_modules/**",
            presets: [
                "@babel/preset-env"
            ]
        }),
        plugin_terser()
    ]
}

export default [
    {
        input: cfg.input,
        output: {
            name: "MiOAnimations",
            format: "iife",
            file: 'build/mio-animations.js',
            extend: true
        },
        plugins: [
            ...cfg.plugins
        ],
        external: cfg.external
    },
    {
        input: cfg.input,
        output: {
            name: "MiOAnimations",
            format: 'umd',
            file: 'build/mio-animations.umd.js',
            sourcemap: true
        },
        plugins: [
            ...cfg.plugins
        ],
        external: cfg.external
    },
    {
        input: cfg.input,
        output: {
            format: 'esm',
            file: 'build/mio-animations.esm.js',
            sourcemap: true,
        },
        plugins: [
            ...cfg.plugins
        ],
        external: cfg.external
    },
    {
        input: cfg.input,
        output: {
            format: 'cjs',
            file: 'build/mio-animations.cjs.js',
            sourcemap: true,
        },
        plugins: [
            ...cfg.plugins
        ],
        external: cfg.external
    }
]
