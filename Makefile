.PHONY: serve
serve: packages/server/dist/index.js packages/app/dist
	npm run start:app --workspace=packages/server

packages/server/dist/index.js:
	npm run build --workspace=packages/server

packages/app/dist:
	npm run build --workspace=packages/app
