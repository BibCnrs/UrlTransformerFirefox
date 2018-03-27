'use strict';

async function handleClick () {
    const [currentTab] = await browser.tabs.query({ active: true }) ;
    const { domain } = await browser.storage.sync.get('domain');
    browser.tabs.update(null, {
        url: `http://${domain}.bib.cnrs.fr/login?url=${currentTab.url}`,
    });
}

browser.browserAction.onClicked.addListener(handleClick);

var checkedState = true;
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

browser.menus.create({
    id: 'select',
    title: 'select your domain',
    type: 'radio',
    contexts: ['browser_action']
});

domains.forEach(name => {
    browser.menus.create({
        id: name,
        parentId: 'select',
        type: 'radio',
        title: name,
        contexts: ['browser_action']
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
