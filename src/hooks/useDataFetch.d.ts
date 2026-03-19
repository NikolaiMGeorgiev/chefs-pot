import type { RecipeSummaryData } from "../types/recipe";
export default function useDataFetch(url: string): {
    isLoading: boolean;
    setIsLoading: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    data: RecipeSummaryData[];
    setData: import("react").Dispatch<import("react").SetStateAction<RecipeSummaryData[]>>;
};
//# sourceMappingURL=useDataFetch.d.ts.map