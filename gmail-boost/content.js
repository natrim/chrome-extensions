// set theme-color
(() => {
    const theme = document.querySelector("[name=theme-color]")
    if (theme) {
        theme.content = "hsla(200, 19%, 20%, 1)";
        // theme.media= "(prefers-color-scheme: dark)";
    } else {
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = "hsla(200, 19%, 20%, 1)";
        // meta.media= "(prefers-color-scheme: dark)";
        document.getElementsByTagName("head")[0].prepend(meta);
    }
})();
