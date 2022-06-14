.PHONY: start-local
start-local: ## Запуск проекта локально
	@rm -rf $(PRJ_DIR)logs/*
	@mkdir -p $(PRJ_DIR)logs/
	@touch $(PRJ_DIR)logs/debug.log
	@touch $(PRJ_DIR)logs/error.log
	NODE_PORT=3000 NODE_ENV=$(YENV) PRJ_DIR=$(PRJ_DIR) LOGS_DIR=$(PRJ_DIR)logs $(NODE) $(NODEMON) --watch $(PRJ_DIR)build/server $(PRJ_DIR)build/server/app.js

.PHONY: start-local-debug
start-local-debug:
	IS_DEBUG=1 DEBUG_PORT=9400 make start-local

.PHONY: logs
logs:
	tail -F logs/*.log