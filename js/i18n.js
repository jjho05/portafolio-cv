// Sistema de Internacionalización (i18n)
class I18n {
    constructor() {
        this.translations = null;
        this.currentLang = this.detectLanguage();
        this.init();
    }

    // Detectar idioma del navegador
    detectLanguage() {
        // Primero verificar si hay preferencia guardada
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            return savedLang;
        }

        // Detectar idioma del navegador
        const browserLang = navigator.language || navigator.userLanguage;

        // Si es español, usar 'es', de lo contrario 'en'
        return browserLang.startsWith('es') ? 'es' : 'en';
    }

    // Inicializar el sistema
    async init() {
        try {
            const response = await fetch('./data/translations.json');
            this.translations = await response.json();
            this.applyTranslations();
            this.updateLanguageToggle();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // Cambiar idioma
    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        this.applyTranslations();
        this.updateLanguageToggle();

        // Actualizar atributo lang del HTML
        document.documentElement.lang = lang;
    }

    // Obtener traducción
    t(path) {
        const keys = path.split('.');
        let value = this.translations[this.currentLang];

        for (const key of keys) {
            value = value[key];
            if (!value) return path;
        }

        return value;
    }

    // Aplicar traducciones al DOM
    applyTranslations() {
        // Actualizar todos los elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });

        // Actualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Actualizar títulos
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
    }

    // Actualizar toggle de idioma
    updateLanguageToggle() {
        const toggles = document.querySelectorAll('.lang-toggle');
        toggles.forEach(toggle => {
            const buttons = toggle.querySelectorAll('button');
            buttons.forEach(btn => {
                if (btn.dataset.lang === this.currentLang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    }
}

// Instancia global
const i18n = new I18n();
