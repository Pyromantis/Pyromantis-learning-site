import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new HeaderComponent(page);
        
        this.mainContent = page.locator('[data-testid="main-content"]');
    }

    async goto() {
        await this.page.goto('http://localhost:5500/base.html');
        await this.waitForAppReady();
    }

    async navigateTo(pageName) {
    await this.page.click(`button[data-page="${pageName}"]`);
    
    await this.page.waitForSelector(`[data-testid="main-content"]:has-text("${this.getExpectedText(pageName)}")`, {
        timeout: 10000,
        state: 'visible'
    });
    }

    getExpectedText(pageName) {
        const texts = {
            main: 'Главное',
            about: 'А теперь расскажи о себе',
            skill: 'Навыки, да?',
            rad: ''
        };
        return texts[pageName] || '';
    }
}