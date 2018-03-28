build-firefox:
	mkdir -p ./dist/firefox
	cp firefox/manifest.json ./dist/firefox/manifest.json
	cp options.html ./dist/firefox/options.html
	cp options.js ./dist/firefox/options.js
	cp main.js ./dist/firefox/main.js
	cp -R  icons ./dist/firefox/icons
	cp -R  _locales ./dist/firefox/_locales
	cp ./node_modules/webextension-polyfill/dist/browser-polyfill.js ./dist/firefox/browser-polyfill.js

build-chrome:
	mkdir -p ./dist/chrome
	cp chrome/manifest.json ./dist/chrome/manifest.json
	cp options.html ./dist/chrome/options.html
	cp options.js ./dist/chrome/options.js
	cp main.js ./dist/chrome/main.js
	cp -R icons ./dist/chrome/icons
	cp -R  _locales ./dist/chrome/_locales
	cp ./node_modules/webextension-polyfill/dist/browser-polyfill.js ./dist/chrome/browser-polyfill.js
