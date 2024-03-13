function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}
function toggleTheme() {
    const body = document.body;
    const generator = document.getElementById("generator");
    const themeIcon = document.getElementById("themeIcon");
    const currentIcon = themeIcon.innerText;
    body.classList.toggle("dark-mode-body");
    generator.classList.toggle("dark-mode-container");
    document.documentElement.classList.toggle("sl-theme-dark");
    if (currentIcon === "light_mode") {
        themeIcon.innerText = "dark_mode";
        setCookie("theme", "dark", 365);
    } else {
        themeIcon.innerText = "light_mode";
        setCookie("theme", "light", 365);
    }
}
function setThemeFromCookie() {
    const theme = getCookie("theme");
    if (theme === "dark") {
        toggleTheme();
    }
}
setThemeFromCookie();
function resetInputs() {
    const inputs = document.querySelectorAll("sl-input");
    inputs.forEach(input => (input.value = ""));
    const select = document.getElementById("badgeStyle");
    select.value = "";
    updateBadge();
}
function fillInputs() {
    const leftText = document.getElementById("leftText");
    const rightText = document.getElementById("rightText");
    const rightColor = document.getElementById("rightColor");
    const leftColor = document.getElementById("leftColor");
    const badgeStyle = document.getElementById("badgeStyle");
    const logo = document.getElementById("logo");
    const link = document.getElementById("link");
    leftText.value = "GitHub";
    rightText.value = "Follow Me";
    rightColor.value = "#24292e";
    leftColor.value = "#f4f4f4";
    badgeStyle.value = "flat";
    logo.value = "github";
    link.value = "https://github.com/abdipr";
    updateBadge();
}
function copyToClipboard() {
    const textarea = document.getElementById("badgeMarkdown");
    textarea.select();
    document.execCommand("copy");
    const copyButton = document.getElementById("copy");
    copyButton.innerText = "done";
    setTimeout(() => {
        copyButton.innerText = "content_copy";
    }, 1000);
}
function replaceChars(text) {
    return text.replace(/-/g, "--").replace(/_/g, "__");
}
function updateBadge() {
    const leftText = document.getElementById("leftText").value.trim();
    const rightText = document.getElementById("rightText").value.trim();
    const rightColor = document.getElementById("rightColor").value.substring(1);
    const leftColor = document.getElementById("leftColor").value.substring(1);
    const badgeStyle = document.getElementById("badgeStyle").value;
    const logo = document.getElementById("logo").value.trim();
    const logoColor = document.getElementById("logoColor").value.substring(1);
    const link = document.getElementById("link").value.trim();
    let badgeURL = `https://img.shields.io/static/v1?style=${badgeStyle}&label=${leftText}`;
    if (rightText.trim() !== "") {
        badgeURL += `&message=${rightText}`;
    }
    if (leftColor.trim() !== "") {
        badgeURL += `&color=${leftColor}`;
    }
    if (rightColor.trim() !== "") {
        badgeURL += `&labelColor=${rightColor}`;
    }
    if (logo.trim() !== "") {
        badgeURL += `&logo=${logo}`;
    }
    if (logoColor.trim() !== "") {
        badgeURL += `&logoColor=${logoColor}`;
    }
    if (link.trim() !== "") {
        badgeMarkdown = `[![${leftText} ${rightText}](${badgeURL})](${link})`;
    } else {
        badgeMarkdown = `![${leftText} ${rightText}](${badgeURL})]`;
    }
    if (link.trim() !== "") {
        badgeHTML = `<a href="${link}" target="_blank"><img alt="${leftText} ${rightText}" src="${badgeURL}"></a>`;
    } else {
        badgeHTML = `<img alt="${leftText} ${rightText}" src="${badgeURL}">`;
    }
    const badgeImg = document.createElement("img");
    badgeImg.src = badgeURL;
    const badgeDiv = document.getElementById("badge");
    badgeDiv.innerHTML = "";
    badgeDiv.appendChild(badgeImg);
    const badgeMarkdownInput = document.getElementById("badgeMarkdown");
    badgeMarkdownInput.value = badgeMarkdown;
    const badgeHTMLInput = document.getElementById("badgeHTML");
    badgeHTMLInput.value = badgeHTML;
}
updateBadge();