import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';
//import { FooterComponent } from './components/FooterComponent';

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        // Внедряем компоненты (Композиция)
        this.header = new HeaderComponent(page);
        // this.footer = new FooterComponent(page);
        // this.sidebar = new SidebarComponent(page);
        
        // Локаторы основного контента
        this.mainContent = page.locator('[data-testid="main-content"]');
    }

    async goto() {
        await this.page.goto('http://localhost:5500/base.html');
        await this.waitForAppReady(); // Ждем, пока core.js отработает
    }

    async navigateTo(pageName) {
        // Используем data-page из вашей навигации
        await this.page.click(`button[data-page="${pageName}"]`);
        // Ждем анимацию и загрузку контента
        await this.page.waitForFunction((name) => {
            return window.currentPage?.constructor?.name?.toLowerCase().includes(name);
        }, pageName);
    }
}