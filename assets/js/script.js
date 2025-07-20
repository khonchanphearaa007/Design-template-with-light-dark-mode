function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }
    if (systemSettingDark.matches) {
        return "dark";
    }
    return "light";
}

function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "" : "";
    const newIconClass = isDark ? "fa-sun" : "fa-moon";

    buttonEl.innerHTML = `<i class="fa-solid ${newIconClass}"></i> ${newCta}`;
    buttonEl.setAttribute("aria-label", newCta);
}

function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

button.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });

    currentThemeSetting = newTheme;
});