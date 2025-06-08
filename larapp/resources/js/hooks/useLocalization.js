import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';

/**
 * Custom hook for handling translations in both React (i18next) and Laravel (backend)
 * @returns {Object} Translation utilities
 */
export const useLocalization = () => {
    const { t, i18n } = useTranslation();
    const { props } = usePage();

    /**
     * Get translation from React i18next
     * @param {string} key - Translation key
     * @param {Object} options - Translation options (interpolation, etc.)
     * @returns {string} Translated text
     */
    const translate = (key, options = {}) => {
        return t(key, options);
    };

    /**
     * Get translation from Laravel backend (passed via Inertia props)
     * @param {string} key - Translation key
     * @param {Object} replacements - Replacement values for Laravel translations
     * @returns {string} Translated text
     */
    const translateLaravel = (key, replacements = {}) => {
        // Laravel translations are typically passed via Inertia props
        const laravelTranslations = props.translations || {};
        let translation = laravelTranslations[key] || key;

        // Handle Laravel-style replacements (:attribute format)
        Object.entries(replacements).forEach(([placeholder, value]) => {
            translation = translation.replace(`:${placeholder}`, value);
        });

        return translation;
    };

    /**
     * Change language for both React and Laravel
     * @param {string} language - Language code (en, uk)
     */
    const changeLanguage = async (language) => {
        // Change React i18next language
        await i18n.changeLanguage(language);

        // Send request to Laravel to set locale (if needed)
        // This could be handled via a simple GET request or Inertia visit
        try {
            await fetch(`/set-language/${language}`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.warn('Failed to set Laravel locale:', error);
        }
    };

    /**
     * Format date according to current locale
     * @param {Date|string} date - Date to format
     * @param {Object} options - Intl.DateTimeFormat options
     * @returns {string} Formatted date
     */
    const formatDate = (date, options = {}) => {
        const dateObj = new Date(date);
        const locale = i18n.language === 'uk' ? 'uk-UA' : 'en-US';

        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options,
        };

        return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
    };

    /**
     * Format number according to current locale
     * @param {number} number - Number to format
     * @param {Object} options - Intl.NumberFormat options
     * @returns {string} Formatted number
     */
    const formatNumber = (number, options = {}) => {
        const locale = i18n.language === 'uk' ? 'uk-UA' : 'en-US';
        return new Intl.NumberFormat(locale, options).format(number);
    };

    /**
     * Format currency according to current locale
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code (USD, UAH, etc.)
     * @returns {string} Formatted currency
     */
    const formatCurrency = (amount, currency = 'USD') => {
        const locale = i18n.language === 'uk' ? 'uk-UA' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    return {
        // Translation functions
        t: translate,
        translate,
        translateLaravel,

        // Language management
        currentLanguage: i18n.language,
        changeLanguage,

        // Formatting utilities
        formatDate,
        formatNumber,
        formatCurrency,

        // i18next instance (for advanced usage)
        i18n,

        // Available languages
        availableLanguages: [
            { code: 'en', name: translate('english'), flag: '🇺🇸' },
            { code: 'uk', name: translate('ukrainian'), flag: '🇺🇦' },
        ],
    };
};

export default useLocalization;
