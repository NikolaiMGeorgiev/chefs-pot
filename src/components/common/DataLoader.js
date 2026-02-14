import { useEffect, useEffectEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isResponseJSON } from "../../helpers/data";
import Loader from "./Loader";

export function DataLoader({ setData, url, children }) {
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateIsLoading = useEffectEvent((value) => {
        setIsLoading(value);
    });
    
    const updateData = useEffectEvent((value) => {
        setData(value);
    });
    
    const updateError = useEffectEvent((value) => {
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