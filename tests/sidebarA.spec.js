import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage.js';

import { SidebarAComponent } from './pages/components/SidebarAComponent';

test.describe('Тестирование счётчика', () => {
    test('Тест счётчика', async ({ page, context }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        const sidebarA = new SidebarAComponent(page);
        const regex = /\d?/;
        const buyBack = await sidebarA.getAmount();
        expect(buyBack).toMatch(regex);
    });
});