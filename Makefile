all: dev-setup build-js-production

dev-setup: clean clean-dev npm-init

npm-init:
	npm install

npm-update:
	npm update

build-js:
	npm run dev

build-js-production:
	npm run build

watch-js:
	npm run watch

clean:
	rm -f dist/dist.js
	rm -f dist/dist.js.map

clean-dev:
	rm -rf node_modules
