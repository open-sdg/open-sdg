.PHONY: clean build serve serve.detached test.html test.features test.accessibility test
all: test

clean:
	# Stop the detached Jekyll web server.
	-pkill -f -9 jekyll
	# Delete the builds.
	rm -fr site-starter
	rm -fr data-starter

cache:
	if [ -d "make-cache" ]; then echo "Using cached versions of files. Use 'make cache.bust' for updated files."; fi
	if [ ! -d "make-cache" ]; then mkdir make-cache; fi
	if [ ! -d "make-cache/sdg-translations" ]; then cd make-cache && git clone https://github.com/open-sdg/sdg-translations; fi

cache.bust:
	rm -fr make-cache

build: clean cache
	mkdir site-starter
	mkdir data-starter
	# Copy all the theme files into the site starter (using symbolic links).
	ln -s ../_includes site-starter/_includes
	ln -s ../_layouts site-starter/_layouts
	ln -s ../assets site-starter/assets
	ln -s ../_sass site-starter/_sass
	# Copy necessary files into the starter folders.
	cp -r make-cache/sdg-translations/www/assets/img site-starter/
	cp -r make-cache/sdg-translations/translations data-starter/
	cp -r tests/site/* site-starter/
	cp -r tests/data/* data-starter/
	# Build the data and metadata and move it into the starter.
	cd data-starter && pip install --upgrade -r requirements.txt
	cd data-starter && python build_data.py
	mv data-starter/_build site-starter
	# Build the Jekyll site.
	cd site-starter && bundle install
	cd site-starter && bundle exec jekyll build

build.docs:
	pip install -r docs/requirements.txt
	mkdocs build

serve: build
	cd site-starter && bundle exec jekyll serve --skip-initial-build

serve.detached: build
	# Serve the Jekyll site at http://127.0.0.1:4000/
	cd site-starter && bundle exec jekyll serve --detach --skip-initial-build

serve.docs: build.docs
	mkdocs serve

test.install:
	# Install the Node.js depedencies.
	cd tests && npm install

test.html: serve.detached
	# HTML proofer.
	cd site-starter && bundle exec htmlproofer --file-ignore '/documentation/' --disable-external ./_site

test.features: test.install serve.detached
	# Cucumber.
	cd tests && npx cucumber-js

test.accessibility: test.install serve.detached
	# Pa11y.
	cd tests && npx pa11y-ci --config accessibility/pa11yci-desktop.json
	cd tests && npx pa11y-ci --config accessibility/pa11yci-mobile.json
	cd tests && npx pa11y-ci --config accessibility/pa11yci-contrast.json

test.docs: build.docs
	gem install html-proofer
	htmlproofer site --disable_external

test.only: test.install
	cd site-starter && bundle exec htmlproofer --file-ignore '/documentation/' --disable-external ./_site
	cd tests && npx cucumber-js

test: test.html test.features test.accessibility test.docs
