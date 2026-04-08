export function Switch() {

const toggleSwitch = document.querySelector('#checkbox');

function switchTheme(balls) {
    const old = document.getElementById('theme-style');
    if (old) {
        old.remove();
    }
    const link = document.createElement('link');
    link.id = 'theme-style';
    link.rel = 'stylesheet';
    if (balls.target.checked) {
        link.href = '../css/themes/theme2.css';
        localStorage.setItem('theme', 'alt');
        document.head.appendChild(link);
    } else {
        link.href = '../css/themes/theme1.css';
        localStorage.setItem('theme', 'light');
        document.head.appendChild(link);
    }
}

// Проверяем сохраненную тему
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'alt') {
    toggleSwitch.checked = true;
    const link = document.createElement('link');
    link.id = 'theme-style';
    link.rel = 'stylesheet';
    link.href = '../css/themes/theme2.css';
    document.head.appendChild(link);
    } else {
        toggleSwitch.checked = false;
        const link = document.createElement('link');
        link.id = 'theme-style';
        link.rel = 'stylesheet';
        link.href = '../css/themes/theme1.css';
        document.head.appendChild(link);
    };
    toggleSwitch.addEventListener('change', switchTheme);
}
