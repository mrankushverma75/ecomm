import { useMemo } from "react";

export const CalculateDiscount = (price, mrp) => {
    return useMemo(() => {
        if (!price || !mrp || mrp <= 0) return 0;
        return ((mrp - price) / mrp) * 100;
    }, [price, mrp]);
};