/**
 * GyaanSetu — i18next Initialization
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import hi from './hi';
import gu from './gu';
import { getItem } from '@/utils/storage';
import { STORAGE_KEYS } from '@/utils/constants';

const savedLanguage = getItem(STORAGE_KEYS.LANGUAGE, 'en');

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    gu: { translation: gu },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
