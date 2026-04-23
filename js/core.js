import { Footer } from '../pages/footer.js';
import { Header } from '../pages/header.js';
import { SidebarA } from '../pages/sidebarA.js';
import { SidebarB } from '../pages/sidebarB.js';
import { Nav } from '../pages/nav.js';

import { Main } from '../pages/main.js';
import { About } from '../pages/about.js';
import { Skill } from '../pages/skill.js';
import { Rad } from '../pages/rad.js';

import { Switch } from '../utils/themeSwitcher.js';

let currentPage = null;

const pageRegistry = {
    main: Main,
    about: About,
    skill: Skill,
    rad: Rad
};

async function loadContent(pageName = 'main') {
    var content = document.getElementById('main');

    content.style.transition = 'opacity 0.3s';
    content.style.opacity = '0';
    
    //setTimeout(() => {
        //content.innerHTML = '<div class="loader">Загрузка...</div>';
    //}, 150);
    
    try {
        const PageClass = pageRegistry[pageName];
        currentPage = new PageClass('main');
        await currentPage.load();
        setTimeout(() => {
            content.style.opacity = '1';
    }, 150);
        
        window.dispatchEvent(new CustomEvent('pageLoaded', { detail: { page: pageName } }));

    } catch (error) {
        content.style.opacity = '1';
        console.error('Ошибка загрузки:', error);
        content.innerHTML = `
            <div class="error">
                <h3>Ошибка загрузки</h3>
                <p>Не удалось загрузить страницу ${pageName}</p>
                <button onclick="location.reload()">Обновить</button>
            </div>
        `;
    }
}

async function loadStaticParts() {
    const footer = new Footer('footer');
    const header = new Header('header');
    const sidebarA = new SidebarA('sidebarA');
    const sidebarB = new SidebarB('sidebarB');
    
    await footer.load();
    await header.load();
    await sidebarA.load();
    await sidebarB.load();
}

async function initNavigation() {
    const nav = new Nav('nav');
    await nav.load();
    
    const buttons = document.querySelectorAll('.nav-list button');
    console.log('Найдено кнопок:', buttons.length);
    
    buttons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const page = button.dataset.page;
            console.log(page);
            if (page) {
                await loadContent(page);
            }
        });
    });
}

async function Switcher() {
    Switch();
}

export function waitForAppReady() {
    return new Promise((resolve) => {
        if (document.getElementById('app-ready-flag')) {
            resolve();
        } else {
            window.addEventListener('appReady', resolve, { once: true });
        }
    });
}

// Инициализация
async function init() {
    await loadStaticParts();
    await initNavigation();
    await loadContent();
    await Switcher();

    const flag = document.getElementById('app-ready-flag');
    if (flag) flag.textContent = 'true';
    window.dispatchEvent(new Event('appReady'));
}

init();