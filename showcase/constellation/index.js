const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            lang: "en-US",
            label: {
                "en-US": "切换到中文",
                "zh-CN": "Switch to English"
            },
            constellation: null
        }
    },
    template: `
        <div class="mio-animations-showcase">
            <button @click="handleClick">{{ label[lang] }}</button>
            <div class="mio-animations-showcase-divider"></div>
            <div class="mio-animation-showcase-constellation"></div>
        </div>
    `,
    methods: {
        handleClick() {
            this.lang = this.lang === "en-US" ? "zh-CN" : "en-US";
        }
    },
    mounted() {
        this.constellation = new MiOAnimations.Constellation(".mio-animation-showcase-constellation")
    }
});

app.mount('#MiO-Animations');
