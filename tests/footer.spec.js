import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage.js';

import { FooterComponent } from './pages/components/FooterComponent';

test.describe('Тестирование футера', () => {
    test('Клик открывает новую страницу', async ({ page, context }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        const footer = new FooterComponent(page);
        
        const seasoupsPage = await footer.clickSeasoups();
        await expect(seasoupsPage.locator('body')).toBeVisible();
        await seasoupsPage.close();
    });
});