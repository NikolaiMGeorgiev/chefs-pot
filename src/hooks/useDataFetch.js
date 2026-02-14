import { useEffect, useState } from "react";

export default function useDataFetch(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const startTime = Date.now();
        fetch(url)
            .then(response => {
                if (response.status != 200) {
                    throw new Error("Unsuccessful data fetch.")
                }
                return response.json();
            })
            .then(responseData => {
                const timePassed = Date.now() - startTime;
                if (timePassed < 1000) {
                    setTimeout(() => {
                        setData([...data, ...responseData]);
                        setIsLoading(false);
                    }, 1000 - timePassed);
                }
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            })
        
    }, [url])

    return {
        isLoading,
        setIsLoading,
        data,
        setData
    }
}