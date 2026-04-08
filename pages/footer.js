export class Footer {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.htmlContent = null;
    }

    async load() {
    try {
        const response = await fetch("./components/footer.html");
        if (!response.ok) {
            throw new Error(`Html error! status: ${response.status}`);
        }
        this.htmlContent = await response.text();
        this.render();
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



}