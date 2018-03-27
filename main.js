'use strict';

async function proxifyUrl(url) {
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
        url: `http://${domain}.bib.cnrs.fr/login?url=${url}`,
    });

}

async function handleClick (tab) {
    await proxifyUrl(tab.url);
}

browser.pageAction.onClicked.addListener(handleClick);

browser.menus.create({
    id: 'open-link',
    title: browser.i18n.getMessage('open-link'),
    contexts: ['link']
});

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

browser.menus.onClicked.addListener((info) => {
    const name = info.menuItemId;
    if (name === 'selected') {
        return;
    }

    if (name === 'open-link') {
        proxifyUrl(info.linkUrl);
        return;
    }
    browser.storage.sync.set({ domain: name });
});
