const locale = "hu-HU";

export const formatDate = (d: Date): string => {
    return d.toLocaleDateString(locale) + " " + d.toLocaleTimeString(locale);
};
