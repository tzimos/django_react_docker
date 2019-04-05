prod:
	docker-compose -f docker-compose.yaml -f docker-compose.production.yaml up -d
dev:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up
staging:
	docker-compose -f docker-compose.yaml -f docker-compose.staging.yaml up -d

kill_dev:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down

kill_prod:
	docker-compose -f docker-compose.yaml -f docker-compose.production.yaml down

kill_prod:
	docker-compose -f docker-compose.yaml -f docker-compose.staging.yaml down

clean:
	rm -rf ./frontend/build && \
	rm -rf ./frontend/dist  && \
	rm -rf ./logs

clean_db:
	rm -rf ./database
