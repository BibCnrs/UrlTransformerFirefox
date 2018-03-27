'use strict';

async function handleClick () {
    const [currentTab] = await browser.tabs.query({ active: true }) ;
    browser.tabs.update(null, {
        url: `http://insb.bib.cnrs.fr/login?url=${currentTab.url}`,
    });
}

browser.browserAction.onClicked.addListener(handleClick);

