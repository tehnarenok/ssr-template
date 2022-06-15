.PHONY: eslint
eslint:
	$(NODE) $(ESLINT) --max-warnings 0 app core entries tools view