// Similar to Array.prototype.filter(), but captures the items that don't pass
// the filter into a secondary array
export const bifilter = <T>(f: (item: T, index: number, arr: T[]) => boolean, xs: T[]) => {
    return xs.reduce(
        ([arr1, arr2], x, i, arr) => {
            if (f(x, i, arr)) return [[...arr1, x], arr2];
            else return [arr1, [...arr2, x]];
        },
        [new Array<T>(), new Array<T>()]
    );
};
