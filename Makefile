export PRJ_DIR := $(shell pwd)/

MAKEFILES_DIR := $(PRJ_DIR)tools/makefiles/


include $(MAKEFILES_DIR)common.mk
include $(MAKEFILES_DIR)start-local.mk
include $(MAKEFILES_DIR)webpack.mk