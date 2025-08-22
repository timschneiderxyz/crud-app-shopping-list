CONTAINER_MONGO?=$(shell basename $(CURDIR))-mongo

.PHONY: dev
dev:
	@docker run -d --rm --name $(CONTAINER_MONGO) \
		-p 27017:27017 \
		-v $(CONTAINER_MONGO):/data/db \
		-e MONGO_INITDB_DATABASE=shopping-list \
		-e MONGO_INITDB_ROOT_USERNAME=mongouser \
		-e MONGO_INITDB_ROOT_PASSWORD=mongopw \
		mongo:latest > /dev/null 2>&1 && \
	pnpm dev; \
	docker stop $(CONTAINER_MONGO) > /dev/null 2>&1

.PHONY: clean
clean:
	rm -rf node_modules/
	rm -rf frontend/node_modules/
	rm -rf frontend/.astro/
	rm -rf frontend/dist/
	rm -rf backend/node_modules/
	rm -rf backend/dist/

.PHONY: nuke
nuke: clean
	rm -f pnpm-lock.yaml
	@pnpm install ||:

%:
	@:
