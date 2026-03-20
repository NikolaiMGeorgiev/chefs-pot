import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useEffectEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isResponseJSON } from "../../helpers/data";
import Loader from "./Loader";
export function DataLoader({ setData, url, children }) {
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
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
            }
            else if (response.status != 200) {
                throw new Error("Unsuccessful data fetch.");
            }
            return isResponseJSON(response) ? response.json() : null;
        })
            .then(data => {
            updateIsLoading(false);
            updateData(data);
        })
            .catch(error => {
            console.error(error);
            updateError(error.message);
        });
    }, [url]);
    if (isLoading) {
        return (_jsx("div", { className: "loader__wrapper", children: _jsx(Loader, {}) }));
    }
    else if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (children);
}
//# sourceMappingURL=DataLoader.js.map