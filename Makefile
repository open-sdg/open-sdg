.PHONY: test.before test.prep test.serve test.html test.features test.after
all: test

test.before test.after:
	# Stop the detached Jekyll web server.
	-pkill -f -9 jekyll
	# Delete the builds.
	rm -fr site-starter
	rm -fr data-starter

test.prep:
	# Clone the starter repositories.
	git clone https://github.com/open-sdg/open-sdg-site-starter.git site-starter
	git clone https://github.com/open-sdg/open-sdg-data-starter.git data-starter
	# Copy all the theme files into the site starter.
	cp -r -t site-starter/ _includes _layouts assets _sass
	# Copy any custom files into the site starter.
	cp -r -t site-starter/ tests/site/*
	# Copy any custom files into the data starter.
	cp -r -t data-starter/ tests/data/*
	# Add extra languages.
	cd site-starter && python scripts/batch/add_language.py es
	cd site-starter && python scripts/batch/add_language.py fr fr-CA
	# Build the data and metadata and move it into the starter.
	cd data-starter && pip install -r requirements.txt
	cd data-starter && python build_data.py
	mv data-starter/_build site-starter
	# Build the Jekyll site.
	cd site-starter && bundle install
	cd site-starter && bundle exec jekyll build
	# Install dependencies for Cucumber tests.
	cd tests && npm install

test.serve:
	# Serve the Jekyll site at http://127.0.0.1:4000/
	cd site-starter && bundle exec jekyll serve --detach --skip-initial-build

test.html:
	# HTML proofer.
	cd site-starter && bash scripts/test/html_proofer_prod.sh

test.features:
	# Cucumber.
	cd tests && npx cucumber-js

test: test.before test.prep test.serve test.html test.features test.after
