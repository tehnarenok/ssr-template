.PHONY: webpack-prepare
webpack-prepare::

.PHONY: webpack
webpack: $(NODE) $(WEBPACK) webpack-prepare 
	BUNDLE=$(bundle) NODE_ENV=$(YENV) $(NODE) --max-old-space-size=4096 $(WEBPACK) --progress

.PHONY: webpack-watch
webpack-watch: $(NODE) $(WEBPACK) webpack-prepare 
	BUNDLE=$(bundle) HOT=1 NODE_ENV=$(YENV) $(NODE) --max-old-space-size=4096 $(WEBPACK) --progress
