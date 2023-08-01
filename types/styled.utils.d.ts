type addPrefixToObject<T, P extends string> = {
    [K in keyof T as K extends string ? `${P}${K}` : never]: T[K]
}

type TransientIgnoredProps = 'as' | 'children' | 'className' | 'style'

type TransientProps<T> = addPrefixToObject<Omit<T, TransientIgnoredProps>, '$'>
