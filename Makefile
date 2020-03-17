.PHONY: clean build serve serve.detached test.html test.features test.accessibility test
all: test

clean:
	# Stop the detached Jekyll web server.
	-pkill -f -9 jekyll
	# Delete the builds.
	rm -fr site-starter
	rm -fr data-starter

build: clean
	# Clone the starter repositories.
	git clone https://github.com/open-sdg/open-sdg-site-starter.git site-starter
	git clone https://github.com/open-sdg/open-sdg-data-starter.git data-starter
	# To make the tests run faster, remove all the starter data.
	rm -fr data-starter/data
	rm -fr data-starter/meta
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
	cp -r tests/site/* site-starter/
	# Copy any custom files into the data starter.
	cp -r tests/data/* data-starter/
	# Add extra languages.
	cd site-starter && python scripts/batch/add_language.py es
	cd site-starter && python scripts/batch/add_language.py fr fr-CA
	# Build the data and metadata and move it into the starter.
	cd data-starter && pip install --upgrade -r requirements.txt
	cd data-starter && python build_data.py
	mv data-starter/_build site-starter
	# Build the Jekyll site.
	cd site-starter && bundle install
	cd site-starter && bundle exec jekyll build
	# Install the Node.js depedencies.
	cd tests && npm install

build.docs:
	pip install mkdocs
	mkdocs build

serve: build
	cd site-starter && bundle exec jekyll serve --skip-initial-build

serve.detached: build
	# Serve the Jekyll site at http://127.0.0.1:4000/
	cd site-starter && bundle exec jekyll serve --detach --skip-initial-build

serve.docs: build.docs
	mkdocs serve

test.html: serve.detached
	# HTML proofer.
	cd site-starter && bash scripts/test/html_proofer_prod.sh

test.features: serve.detached
	# Cucumber.
	cd tests && npx cucumber-js

test.accessibility: serve.detached
	# Pa11y.
	cd tests && npx pa11y-ci --config accessibility/pa11yci-desktop.json
	cd tests && npx pa11y-ci --config accessibility/pa11yci-mobile.json
	cd tests && npx pa11y-ci --config accessibility/pa11yci-contrast.json

test.docs: build.docs
	gem install html-proofer
	htmlproofer site

test: test.html test.features test.accessibility
