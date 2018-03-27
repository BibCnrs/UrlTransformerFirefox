'use strict';

async function handleClick () {
    const [currentTab] = await browser.tabs.query({ active: true });
    const { domain } = await browser.storage.sync.get('domain');

    if(!domain) {
        browser.notifications.create({
            type: "basic",
            iconUrl: browser.extension.getURL("icons/bibcnrs-48.png"),
            title: browser.i18n.getMessage('no-domain-title'),
            message: browser.i18n.getMessage('no-domain-message')
        });
        return;
    }
    browser.tabs.update(null, {
        url: `http://${domain}.bib.cnrs.fr/login?url=${currentTab.url}`,
    });
}

browser.pageAction.onClicked.addListener(handleClick);

var checkedState = true;

browser.menus.create({
    id: 'select',
    title: browser.i18n.getMessage('choose-domain'),
    type: 'radio',
    contexts: ['page_action']
});

const domains = [
    'insb',
    'inshs',
    'inc',
    'in2p3',
    'inp',
    'insmi',
    'inee',
    'insu',
    'insis',
    'ins2i',
];

domains.forEach(name => {
    browser.menus.create({
        id: name,
        parentId: 'select',
        type: 'radio',
        title: name,
        contexts: ['page_action']
    });
});

browser.storage.sync.get('domain').then(({ domain }) => {
    if (!domain) {
        return;
    }
    browser.menus.update(domain, { checked: true });
});

browser.menus.onClicked.addListener((info, tab, checked, wasChecked) => {
    const name = info.menuItemId;
    if (name === 'selected') {
        return;
    }
    browser.storage.sync.set({ domain: name });
});
