const locale = (window as any).ENV.dateLocale;

export const formatDate = (d: Date): string => {
    return d.toLocaleDateString(locale) + " " + d.toLocaleTimeString(locale);
};
