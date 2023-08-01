type setterObject<T> = {
    [K in keyof T as K extends string ? `set${Capitalize<K>}` : never]: (value: T[K]) => void;
}

type StoreProps<T> = T & setterObject<T>
