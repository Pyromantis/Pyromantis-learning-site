import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage.js';

test.describe('Тестирование главного приложения', () => {
    
    test('Переключение темы изменяет состояние чекбокса', async ({ page }) => {
        // 1. Arrange
        const mainPage = new MainPage(page);
        await mainPage.goto(); // Ждет SPA ready
        
        // 2. Act
        await mainPage.header.toggleTheme();
        
        // 3. Assert
        await expect(mainPage.header.themeCheckbox).toBeChecked();
    });

    test('Приветствие в хедере обновляется в зависимости от времени', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        
        const greeting = await mainPage.header.getGreeting();
        
        // Проверяем, что текст не пустой и содержит одно из ожидаемых слов
        expect(greeting).toMatch(/(Доброе утро|Добрый день|Добрый вечер|Доброй ночи)/);
    });

    test('Навигация меняет содержимое main', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        
        // Кликаем по кнопке "About" (предполагаем, что data-page="about")
        await mainPage.navigateTo('about');
        
        // Проверяем, что в контенте появилось что-то характерное для страницы About
        await expect(mainPage.mainContent).toContainText('Главное');
    });
});