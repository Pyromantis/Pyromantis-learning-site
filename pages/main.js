import { GreetUpdate } from "../utils/time.js";

export class Main {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.htmlContent = null;
    }

    async load() {
    try {
        const response = await fetch("./components/main.html");
        if (!response.ok) {
            throw new Error(`Html error! status: ${response.status}`);
        }
        this.htmlContent = await response.text();
        if (this.container) {
            this.container.innerHTML = this.htmlContent;
            this.render();
            this.initGreeting();
        }
        return true;
    }
    catch (error) {
        console.error('Ошибка', error);
        this.container.innerHTML = '<div>Error</div>';
        return false;
        }
    }
    
    render() {
        if (this.container && this.htmlContent) {
            this.container.innerHTML = this.htmlContent;
        }
    }

    initGreeting() {
        GreetUpdate();
    }



}

