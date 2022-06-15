const getBundlePrefix = (bundleName: string): string => {
    return bundleName ? `${bundleName}.` : '';
};

export default getBundlePrefix;
