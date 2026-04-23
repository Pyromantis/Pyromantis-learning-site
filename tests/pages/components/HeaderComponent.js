export class HeaderComponent {
    constructor(page) {
        this.page = page;
        
        // === ЛОКАТОРЫ (используем только data-testid) ===
        this.container = page.locator('[data-testid="header-container"]');
        this.greetingText = page.locator('[data-testid="greeting-text"]');
        this.profilePicture = page.locator('[data-testid="profile-picture"]');
        this.themeCheckbox = page.locator('[data-testid="theme-checkbox"]');
        this.themeSlider = page.locator('[data-testid="theme-slider"]');
        this.themeSun = page.locator('[data-testid="theme-sun"]');
        this.themeMoon = page.locator('[data-testid="theme-moon"]');
        this.altText = page.locator('[data-testid="theme-alt-text"]');
    }

    // === ДЕЙСТВИЯ ===
    async getGreeting() {
        return await this.greetingText.textContent();
    }

    async toggleTheme() {
        await this.themeSlider.click();

    }

    async isDarkModeEnabled() {
        // Проверяем, стоит ли галочка
        return await this.themeCheckbox.isChecked();
    }

    async clickProfile() {
        await this.profilePicture.click();
    }
}