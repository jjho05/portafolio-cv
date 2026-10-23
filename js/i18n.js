// Sistema de Internacionalización (i18n)
class I18n {
    constructor() {
        this.translations = null;
        this.currentLang = this.detectLanguage();
        this.init();
    }

    // Detectar idioma del navegador o preferencia guardada
    detectLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            return savedLang;
        }

        const browserLang = navigator.language || navigator.userLanguage || 'es';
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

    // Alternar idioma entre ES y EN
    toggle() {
        const next = this.currentLang === 'es' ? 'en' : 'es';
        this.changeLanguage(next);
    }

    // Obtener traducción
    t(path) {
        if (!this.translations || !this.translations[this.currentLang]) {
            return path;
        }

        const keys = path.split('.');
        let value = this.translations[this.currentLang];

        for (const key of keys) {
            if (value && value[key] !== undefined) {
                value = value[key];
            } else {
                return path;
            }
        }

        return value;
    }

    // Aplicar traducciones al DOM
    applyTranslations() {
        if (!this.translations) return;

        // Actualizar elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation && translation !== key) {
                element.textContent = translation;
            }
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

    // Actualizar botón de idioma
    updateLanguageToggle() {
        const langLabel = document.getElementById('langLabel');
        if (langLabel) {
            // Si el idioma actual es ES, el botón invita a cambiar a EN y viceversa
            langLabel.textContent = this.currentLang === 'es' ? 'EN' : 'ES';
        }
    }
}

// Instancia global
const i18n = new I18n();
window.i18n = i18n;
