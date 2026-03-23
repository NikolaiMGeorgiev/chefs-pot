import { type Dispatch, type SetStateAction, useEffect, useEffectEvent, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { isResponseJSON } from "../../helpers/data";
import Loader from "./Loader";
import { type RecipeResponseData } from "../../types/recipe";

type Props = {
    setData: Dispatch<SetStateAction<{} | RecipeResponseData>>, 
    url: string, 
    children: ReactElement
}

export function DataLoader({ setData, url, children }: Props) {
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const updateIsLoading = useEffectEvent((value: boolean) => {
        setIsLoading(value);
    });
    
    const updateData = useEffectEvent((value: object) => {
        setData(value);
    });
    
    const updateError = useEffectEvent((value: string) => {
        setError(value);
    });

    useEffect(() => {
        fetch(url)
        .then(response => {
            if (response.status == 401) {
                navigator("/login");
            } else if (response.status != 200) {
                throw new Error("Unsuccessful data fetch.")
            }
            return isResponseJSON(response) ? response.json() : null;
        })
        .then(data => {
            updateIsLoading(false);
            updateData(data);
        })
        .catch(error => {
            console.error(error);
            updateError(error.message)
        })
    }, [url])

    if (isLoading) {
        return (
            <div className="loader__wrapper">
                <Loader />
            </div>
        )
    } else if (error) {
        return <div>Error: {error}</div>
    }

    return (children)
}