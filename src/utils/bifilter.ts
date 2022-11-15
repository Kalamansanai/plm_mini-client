// Similar to Array.prototype.filter(), but captures the items that don't pass
// the filter into a secondary array
export const bifilter = <T>(
    f: (currentItem: T, currentIndex: number, array: T[]) => boolean,
    xs: T[]
): [Array<T>, Array<T>] => {
    return xs.reduce(
        (acc, currentItem, currentIndex, array) => {
            let truthys = acc[0]!;
            let falsys = acc[1]!;
            if (f(currentItem, currentIndex, array)) return [[...truthys, currentItem], falsys];
            else return [truthys, [...falsys, currentItem]];
        },
        [new Array<T>(), new Array<T>()]
    );
};

// example usage:
// const nums = [1, 2, 3, 4, 5, 6];
// const [evens, odds] = bifilter((curr, i, arr) => curr % 2 == 0, nums);
