const loadComponentLibrary = async () => {
    try {
        const { 
            applyPolyfills, 
            defineCustomElements 
        } = await import('@monorepo/web-components/loader');

        await applyPolyfills();
        await defineCustomElements(window);
    } catch (error) {
        console.error(error);
    }
};

export default loadComponentLibrary;