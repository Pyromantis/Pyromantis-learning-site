export class FormHandler {
    constructor() {
        
        this.nameValidate = this.nameValidate.bind(this);
        this.nameUnpacker = this.nameUnpacker.bind(this);
        this.phoneValidate = this.phoneValidate.bind(this);
        this.dateValidate = this.dateValidate.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFullNameInput = this.handleFullNameInput.bind(this);
        this.handlePhoneInput = this.handlePhoneInput.bind(this);
        this.handleDateInput = this.handleDateInput.bind(this);
    }
    
    init() {
        this.fullNameInput = document.getElementById('fullname');
        this.phoneInput = document.getElementById('phone');
        this.dateInput = document.getElementById('date');
        this.photoInput = document.getElementById('photo');
        this.previewImage = document.getElementById('preview-photo');
        this.submit = document.getElementById('submit-button');
        this.initEventListeners();
        this.initMinDate();
        
        return true;
    }
    
    initEventListeners() {
        this.fullNameInput.addEventListener('input', this.handleNameInput);
        this.fullNameInput.addEventListener('input', this.handleFullNameInput);
        this.phoneInput.addEventListener('input', this.handlePhoneInput);
        this.dateInput.addEventListener('input', this.handleDateInput);
        
        this.photoInput.addEventListener('change', this.handlePhotoChange);
        
        const deleteButton = document.getElementById('photo-delete');
        if (deleteButton) {
            deleteButton.addEventListener('click', this.handlePhotoDelete);
        }
        
        this.submit.addEventListener('click', this.handleSubmit);
    }
    
    nameValidate(value) {
        const regex = /^[А-Яа-яЁёA-Za-z\s\-]+$/;
        return regex.test(value) && value.trim().split(/\s+/).length >= 2;
    }
    
    nameUnpacker(value) {
        const parts = value.trim().split(/\s+/);
        return {
            last: parts[0] || '',
            first: parts[1] || '',
            oteche: parts[2] || ''
        };
    }
    
    handleNameInput(e) {
        const value = e.target.value;
        const regex = /^[А-Яа-яЁёA-Za-z\s\-]*$/;
        
        if (!regex.test(value)) {
            e.target.value = value.replace(/[^А-Яа-яЁёA-Za-z\s\-]/g, '');
        }
    }
    
    phoneValidate(value) {
        const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return phoneRegex.test(value);
    }
    
    dateValidate(value) {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }
    
    handlePhotoChange(e) {
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                this.previewImage.src = event.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    handlePhotoDelete() {
        if (this.photoInput) {
            this.photoInput.value = '';
            this.previewImage.src = '';
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        
        const fullname = this.fullNameInput.value.trim();
        const phone = this.phoneInput.value.trim();
        const date = this.dateInput.value;
        
        if (!fullname || !this.nameValidate(fullname)) {
            this.showError('name-error');
            isValid = false;
        } else {
            this.hideError('name-error');
        }
        
        if (!phone || !this.phoneValidate(phone)) {
            this.showError('phone-error');
            isValid = false;
        } else {
            this.hideError('phone-error');
        }
        
        if (!date || !this.dateValidate(date)) {
            this.showError('date-error');
            isValid = false;
        } else {
            this.hideError('date-error');
        }
        
        if (isValid) {
            const {last, first, oteche} = this.nameUnpacker(fullname);
            const lastNameEl = document.getElementById('last-name');
            const firstNameEl = document.getElementById('first-name');
            const otechestvoEl = document.getElementById('otechestvo');
            const formPreview = document.getElementById('form-preview');
            
            if (lastNameEl) lastNameEl.textContent = last || "-";
            if (firstNameEl) firstNameEl.textContent = first || "-";
            if (otechestvoEl) otechestvoEl.textContent = oteche || "-";
            if (formPreview) formPreview.classList.add('show');
            
            this.showSuccess();
        } else {
            this.showErrorAlert();
        }
    }
    
    handleFullNameInput() {
        this.hideError('name-error');
        
        const fullname = this.fullNameInput.value.trim();
        if (fullname && this.nameValidate(fullname)) {
            const {last, first, oteche} = this.nameUnpacker(fullname);
            const lastNameEl = document.getElementById('last-name');
            const firstNameEl = document.getElementById('first-name');
            const otechestvoEl = document.getElementById('otechestvo');
            
            if (lastNameEl) lastNameEl.textContent = last || "-";
            if (firstNameEl) firstNameEl.textContent = first || "-";
            if (otechestvoEl) otechestvoEl.textContent = oteche || "-";
        }
    }
    
    handlePhoneInput() {
        this.hideError('phone-error');
    }
    
    handleDateInput() {
        if (!this.dateValidate(this.dateInput.value)) {
            this.showError('date-error');
        } else {
            this.hideError('date-error');
        }
    }
    
    initMinDate() {
        const today = new Date().toISOString().split('T')[0];
        if (this.dateInput) {
            this.dateInput.setAttribute('min', today);
        }
    }
    
    showError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.add('show');
        }
    }
    
    hideError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    showSuccess() {
        const successMsg = document.getElementById('success-form');
        if (successMsg) {
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }
        
    }
    
    showErrorAlert() {
        alert('ахтунг');
    }
    
    resetForm() {
        if (this.fullNameInput) this.fullNameInput.value = '';
        if (this.phoneInput) this.phoneInput.value = '';
        if (this.dateInput) this.dateInput.value = '';
        if (this.photoInput) this.photoInput.value = '';
        if (this.previewImage) this.previewImage.src = '';
        
        const lastNameEl = document.getElementById('last-name');
        const firstNameEl = document.getElementById('first-name');
        const otechestvoEl = document.getElementById('otechestvo');
        
        if (lastNameEl) lastNameEl.textContent = '';
        if (firstNameEl) firstNameEl.textContent = '';
        if (otechestvoEl) otechestvoEl.textContent = '';
    }
}

export function initForm() {
    const formHandler = new FormHandler();
    const success = formHandler.init();
    return success ? formHandler : null;
}