import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage.js';

test.describe('Тестирование главного приложения', () => {
    
    test('Переключение темы изменяет состояние чекбокса', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        
        await mainPage.header.toggleTheme();
        
        await expect(mainPage.header.themeCheckbox).toBeChecked();
    });

    test('Приветствие в хедере обновляется в зависимости от времени', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        
        const greeting = await mainPage.header.getGreeting();
        
        expect(greeting).toMatch(/(Доброе утро|Добрый день|Добрый вечер|Доброй ночи)/);
    });

    test('Навигация меняет содержимое main', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        
        await mainPage.navigateTo('about');
        
        await expect(mainPage.mainContent).toContainText('Главное');
    });

    test('Клик открывает новую страницу', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        
        await mainPage.navigateTo('about');
        
        await expect(mainPage.mainContent).toContainText('Главное');
    });
});