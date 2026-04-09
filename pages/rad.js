import { Search } from "../utils/search.js";

export class Rad {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.htmlContent = null;
    }

    async load() {
    try {
        const response = await fetch("./components/radalbumcovers.html");
        if (!response.ok) {
            throw new Error(`Html error! status: ${response.status}`);
        }
        this.htmlContent = await response.text();
        if (this.container) {
            this.container.innerHTML = this.htmlContent;
            this.render();
            this.searchInit();
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

    searchInit() {
        Search();
    }
}