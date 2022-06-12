TOOLS_DIR := $(realpath $(PRJ_DIR)tools)/

export YENV ?= development

NODE ?= $(shell which node)
YARN ?= $(shell which yarn)

ifndef NODE
NODEBIN_PATH := /opt/nodejs/14/bin/node /usr/local/bin /usr/bin
NODE := $(shell find $(NODEBIN_PATH) -name node \( -type f -o -type l \) -print 2>/dev/null | head -1)
endif

ifndef YARN
YARN := $(shell which yarn)
endif

NODE_MODULES_DIR := $(PRJ_DIR)node_modules/
BIN_MODULES_DIR := $(NODE_MODULES_DIR).bin/

WEBPACK := $(BIN_MODULES_DIR)webpack
NODEMON := $(BIN_MODULES_DIR)nodemon
TSC := $(BIN_MODULES_DIR)tsc

$(info ===> Using node: $(NODE) ($(shell $(NODE) --version)))
$(info ===> Using yarn: $(YARN) ($(shell $(YARN) --version)))

.PHONY: deps
deps:: deps-node-modules 

.PHONY: deps-node-modules
deps-node-modules:: $(YARN)
	@echo '===> Installing packages'
	$(YARN) install

.PHONY: deps-trim
deps-trim:: $(YARN) 
	@echo '===> Remove extraneous packages'
	$(YARN) install --production --frozen-lockfile


.PHONY: show-variables
show-variables:: 
	@echo "PRJ_DIR:         $(PRJ_DIR)"
	@echo "CURRENT_DIR:     $(CURRENT_DIR)"
	@echo "TOOLS_DIR:       $(TOOLS_DIR)"
	@echo "NODE:            $(NODE)"
	@echo "YARN:            $(YARN)"