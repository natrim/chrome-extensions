// set theme-color
(function () {
    var theme = document.querySelector("[name=theme-color]")
    if (theme) {
        theme.content = "hsla(200, 19%, 20%, 1)";
        // theme.media= "(prefers-color-scheme: dark)";
    } else {
        var meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = "hsla(200, 19%, 20%, 1)";
        // meta.media= "(prefers-color-scheme: dark)";
        document.getElementsByTagName("head")[0].prepend(meta);
    }
    document.cookie = 'wide=1; expires=' + new Date('3099').toUTCString() + '; path=/';
})();


// Remove the loop attribute from the Shorts video player
(function () {
    const observe = (fn, e = document.body, config = { attributes: 1, childList: 1, subtree: 1 }) => {
        const observer = new MutationObserver(fn);
        observer.observe(e, config);
        return () => observer.disconnect();
    };

    observe(() => {
        if (location.pathname.startsWith('/shorts/')) {
            document.querySelectorAll('video').forEach(v => v.loop = false);
        }
    })
})();
