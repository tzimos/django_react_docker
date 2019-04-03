prod:
	docker-compose -f docker-compose.yaml -f docker-compose.production.yaml up -d
dev:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up

kill_dev:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down

kill_prod:
	docker-compose -f docker-compose.yaml -f docker-compose.production.yaml down

clean:
	rm -rf ./frontend/build && \
	rm -rf ./frontend/dist  && \
	rm -rf ./logs

clean_db:
	rm -rf ./database
