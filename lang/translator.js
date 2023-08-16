import {loadFromStorage, saveToStorage} from "@/assets/js/data-connector/local-storage/local-storage-abstractor.js";

export class Translator {
    constructor(translations){
        this.translations = translations;
        this.clientLanguages = Object.keys(translations);
        this.serverLanguages = ["en", "de", "es", "fr", "it", "nl"];
        /*
        *
        * fetch('http://homestead.golf/api/languages')
            .then(response => response.json())
            .then(json => {
                this.serverLanguages = json.data;
            });
        *
        * */
    }


    languages() {
        // return languages that are supported by both client and server
        return this.serverLanguages.filter(lang => this.clientLanguages.includes(lang));
    }

    translate(key){
        return this._getProperty(this.translations[this.language()], key.split('.'));
    }

    language() {
        let lang = loadFromStorage('language');
        if (lang && this.isLanguageSupported(lang))  return lang;

        // fallback
        lang = this.fallbackLanguage();
        this.setLanguage(lang);
        return lang;
    }
    setLanguage(lang) {
        if (this.isLanguageSupported(lang)) {
            saveToStorage('language', lang);
        }
    }

    fallbackLanguage() {
        // (1) return browser language if supported
        // (2) return english if supported
        // (3) return first language in list
        let lang = this.browserLanguage();
        if (this.isLanguageSupported(lang)) return lang;
        return this.languages().includes('en') ? 'en' : this.languages()[0];
    }

    browserLanguage() {
        const browserLanguage = navigator.language;
        return browserLanguage.split('-')[0];
    }

    isLanguageSupported(lang) {
        return this.languages().includes(lang);
    }

    _getProperty(obj, keys) {
        const key = keys.shift();

        if (typeof obj !== 'object' || obj === null || !obj.hasOwnProperty(key)) return undefined;

        if (keys.length === 0) return obj[key];

        return this._getProperty(obj[key], keys);
    }
}

export function createTranslator(translations) {
    return new Translator(translations);
}
