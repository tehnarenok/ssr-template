// eslint-disable-next-line @typescript-eslint/ban-types
const safeStringify = (data: Object): string => {
    try {
        return JSON.stringify(data);
    } catch {
        return '{}';
    }
};

export default safeStringify;
