// 4.234234 -> 4.0 

// 45000 -> 45,000
// 45000.00 -> 45,000
// 45000 -> 45,000 LKR

export function formatCurrency(value) {
    if (value == null || Number.isNaN(Number(value))) return "N/A";
    return new Intl.NumberFormat("en-LK", {
        style: "currency",
        currency: "LKR",
        maximumFractionDigits: 0
    }).format(Number(value));
}

export function formatRating(value) {
    if (value == null || Number.isNaN(Number(value))) return "0.0";
    return Number(value).toFixed(1);
}

