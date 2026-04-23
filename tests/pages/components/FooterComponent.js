export class FooterComponent {
    constructor(page) {
        this.page = page;
        
        // === ЛОКАТОРЫ (используем только data-testid) ===
        this.container = page.locator('[data-testid="footer-container"]');
        this.contacts = page.locator('[data-testid="contact-info"]');
        this.links = page.locator('[data-testid="link-buttons"]');
        this.seasoups = page.locator('[data-testid="seasoups"]');
    }

    async clickExternalLink(linkLocator, expectedUrlPattern) {
        // Универсальный метод для клика по внешней ссылке
        const context = this.page.context();
        
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            linkLocator.click()
        ]);
        
        // Ждем загрузки новой страницы
        await newPage.waitForLoadState('domcontentloaded');
        
        return newPage;
    }

    async clickSeasoups() {
        return await this.clickExternalLink(this.seasoups,/seasoups\.neocities\.org/);
    }
}