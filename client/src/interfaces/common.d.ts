
export type Action<P> = {
    type: string,
    payload?: P
};

export type SetStateType<T> = Dispatch<SetStateAction<T>>;