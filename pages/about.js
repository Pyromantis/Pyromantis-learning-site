import { FormHandler } from '../utils/formComp2.js';

export class About {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.htmlContent = null;
    }

    async load() {
    try {
        const response = await fetch("./components/about.html");
        if (!response.ok) {
            throw new Error(`Html error! status: ${response.status}`);
        }
        this.htmlContent = await response.text();
        this.render();
        this.initForm();
        return true;
    }
    catch (error) {
        console.error('Ошибка', error);
        this.container.innerHtml = '<div>Error</div>';
        return false;
        }
    }
    
    render() {
        if (this.container && this.htmlContent) {
            this.container.innerHTML = this.htmlContent;
        }
    }
    initForm() {
        this.formHandler = new FormHandler();
        const success = this.formHandler.init();
        
        if (!success) {
            console.error('Не удалось инициализировать форму');
        }
    }
}