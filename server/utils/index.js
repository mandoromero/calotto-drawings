export const normalize = (str) => {
    if (!str) return "";
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
};

