.PHONY: test.before test.prep test.serve test.html test.features test.after
all: test

install:
	cd tests && npm install
	cd tests/site && bundle install
	cd tests/data && pip install -r requirements.txt

serve: test.before test.prep
	cd site-starter && bundle exec jekyll serve --skip-initial-build

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
	# Copy all the theme files into the site starter (using symbolic links).
	rm -fr site-starter/_includes
	rm -fr site-starter/_layouts
	rm -fr site-starter/assets
	rm -fr site-starter/_sass
	ln -s ../_includes site-starter/_includes
	ln -s ../_layouts site-starter/_layouts
	ln -s ../assets site-starter/assets
	ln -s ../_sass site-starter/_sass
	# Copy any custom files into the site starter.
	cp -r -t site-starter/ tests/site/*
	# Copy any custom files into the data starter.
	cp -r -t data-starter/ tests/data/*
	# Add extra languages.
	cd site-starter && python scripts/batch/add_language.py es
	cd site-starter && python scripts/batch/add_language.py fr fr-CA
	# Build the data and metadata and move it into the starter.
	cd data-starter && python build_data.py
	mv data-starter/_build site-starter
	# Build the Jekyll site.
	cd site-starter && bundle exec jekyll build

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
