import i18n from 'i18next';
import {en} from './en';
import {fr} from './fr';

/** Initialize the i18n library, using the language defined in the environment. */
export function i18nInit() {
    i18n.init({
        lng: process.env.LANG,
        resources: {en, fr}
    });
}
