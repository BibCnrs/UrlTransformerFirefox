'use strict';

async function handleClick () {
    const [currentTab] = await browser.tabs.query({ active: true }) ;
    const { domain } = await browser.storage.sync.get('domain');
    browser.tabs.update(null, {
        url: `http://${domain}.bib.cnrs.fr/login?url=${currentTab.url}`,
    });
}

browser.browserAction.onClicked.addListener(handleClick);

