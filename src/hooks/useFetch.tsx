import { useEffect, useReducer } from 'react';

interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    isFinished: boolean;
    error: Error | null;
}

const initialState = {
    data: null,
    isLoading: false,
    isFinished: false,
    error: null,
};

type FetchActionType = 'isLoading' | 'error' | 'data'

const fetchActions: Record<FetchActionType, <T, > (state: FetchState<T>, value?: any) => FetchState<T>> = {
    ['isLoading']: (state, value: boolean) => ({ ...state, isLoading: value }),
    ['error']: (state, value: Error) => ({ ...state, error: value, isFinished: true, isLoading: false }),
    ['data']: (state, value) => ({ ...state, data: value, isFinished: true, isLoading: false }),
};

const fetchReducer = <T, >(state: FetchState<T>, payload: { action: FetchActionType, value: any }): FetchState<T> => {
    return fetchActions[payload.action](state, payload.value);
};

const useFetch = <T, >(input: RequestInfo, init?: RequestInit, fixData?: (data: T) => T) => {
    const [state, dispatch] = useReducer<React.Reducer<FetchState<T>, { action: FetchActionType, value: any }>>(fetchReducer, initialState);

    useEffect(() => {
        dispatch({ action: 'isLoading', value: true });
        fetch(input, init)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch((err: Error) => dispatch({ action: 'error', value: err }))
            .then((data: T) => {
                if (fixData) {
                    dispatch({ action: 'data', value: fixData(data) });
                } else {
                    dispatch({ action: 'data', value: data });
                }
            });
    }, []);

    return state;
};

export default useFetch;