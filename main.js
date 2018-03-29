'use strict';

(function() {
    try {
        const storage = window.browser.storage.sync;

        const menus = window.browser.menus || window.browser.contextMenus;

        // function showAction(tabId) {
        //     browser.pageAction.show();
        // };

        // // Listen for any changes to the URL of any tab.
        // chrome.tabs.onUpdated.addListener(showAction);
        // browser.tabs.onHighlighted.addListener(({ tabIds: [id] }) => showAction(id));

        async function proxifyUrl(url) {
            const { domain } = await storage.get('domain');

            if(!domain) {
                browser.notifications.create({
                    type: "basic",
                    iconUrl: browser.extension.getURL("icons/bibcnrs-48.png"),
                    title: browser.i18n.getMessage('no_domain_title'),
                    message: browser.i18n.getMessage('no_domain_message')
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

        browser.browserAction.onClicked.addListener(handleClick);

        menus.create({
            id: 'open_link',
            type: 'normal',
            title: browser.i18n.getMessage('open_link'),
            contexts: ['link']
        });

        menus.create({
            id: 'select',
            title: browser.i18n.getMessage('choose_domain'),
            type: 'normal',
            contexts: ['browser_action']
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
            menus.create({
                id: name,
                parentId: 'select',
                type: 'radio',
                title: name,
                contexts: ['browser_action']
            });
        });

        storage.get(['domain']).then(({ domain }) => {
            if (!domain) {
                return;
            }
            menus.update(domain, { checked: true });
        });

        menus.onClicked.addListener((info) => {
            const name = info.menuItemId;
            if (name === 'selected') {
                return;
            }

            if (name === 'open_link') {
                proxifyUrl(info.linkUrl);
                return;
            }
            storage.set({ domain: name });
        });
    } catch (error) {
        console.log(error);
    }
})();

