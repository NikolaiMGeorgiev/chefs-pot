import { useEffect, useState } from "react";
import type { RecipeSummaryData } from "../types/recipe";

export default function useDataFetch(url: string) {
    const [data, setData] = useState<RecipeSummaryData[]>([]);
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
            .then((responseData: RecipeSummaryData[]) => {
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