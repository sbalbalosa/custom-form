import { useRef, useReducer, useEffect } from "react";
import { FormState, StoreSubscriber } from "../../types";
import {
    initialState,
    reducer,
} from '../store';

export default function useFormStore() {
    const [formState, dispatch] = useReducer(reducer, initialState);
    const subscribers = useRef<StoreSubscriber[]>([]);

    useEffect(() => {
        for(const subscriber of subscribers.current) {
            if (subscriber) subscriber(formState);
        }
    }, [formState]);

    const subscribeToChanges = (subscriber: (state: FormState) => void): () => void => {
        subscribers.current.push(subscriber);
        const index = subscribers.current.length - 1;

        return () => {
            subscribers.current[index] = null
        }
    };

    return {
        dispatch,
        subscribeToChanges
    };
}