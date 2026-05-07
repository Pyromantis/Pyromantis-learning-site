export class SidebarAComponent {
    constructor(page) {
        this.page = page;
        
        this.amount = page.locator('[data-testid="visitAmount"]');
    }

    async getAmount() {
        return await this.amount.textContent();
    }
}