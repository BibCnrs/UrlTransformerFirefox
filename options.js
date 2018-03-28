(function () {
    const labelEl = document.querySelector('#label');
    labelEl.innerHTML = browser.i18n.getMessage('choose_domain');
    const domainEl = document.querySelector('#domain');
    browser.storage.sync.get('domain').then(({ domain }) => {
        domainEl.value = domain;
    });

    domainEl.addEventListener('click', () => {
        browser.storage.sync.set({ domain: domainEl.value });
    });
})();
