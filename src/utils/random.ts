export const randomBetween = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

export const randomIntBetween = (min: number, max: number): number => {
    return Math.floor(randomBetween(min, max));
};
