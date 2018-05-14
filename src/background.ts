chrome.runtime.onMessage.addListener((message) => {
    if (message && message.type === "copy") {
        const input = document.createElement("textarea");
        document.body.appendChild(input);
        input.value = message.text;
        input.focus();
        input.select();
        document.execCommand("Copy");
        input.remove();
    }
});
