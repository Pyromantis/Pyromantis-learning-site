export class BasePage {
    constructor(page) {
        this.page = page;
    }

    // Универсальный метод ожидания загрузки SPA
    async waitForAppReady() {
        // Ждем появления скрытого флага или кастомного события
        await this.page.waitForSelector('[data-testid="app-ready"]', { state: 'attached' });
        await this.page.waitForFunction(() => {
            return document.getElementById('app-ready-flag')?.textContent === 'true';
        });
    }
}