const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            lang: "en-US",
            label: {
                "en-US": "切换到中文",
                "zh-CN": "Switch to English"
            }
        }
    },
    template: `
        <div class="mio-animations-examples">
            <button @click="handleClick">{{ label[lang] }}</button>
            <div class="mio-animations-examples-divider"></div>
        </div>
    `,
    methods: {
        handleClick() {
            this.lang = this.lang === "en-US" ? "zh-CN" : "en-US";
        }
    },
    mounted() {}
});

app.mount('#MiO-Animations');
