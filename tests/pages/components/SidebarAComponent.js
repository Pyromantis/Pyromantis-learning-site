export class SidebarAComponent {
    constructor(page) {
        this.page = page;
        
        // === ЛОКАТОРЫ (используем только data-testid) ===
        this.amount = page.locator('[data-testid="visitAmount"]');
    }

    async getAmount() {
        return await this.amount.textContent();
    }
}