.PHONY: test.before test.prep test.serve test.html test.features test.after
all: test

test.before test.after:
	# Stop the detached Jekyll web server.
	-pkill -f -9 jekyll
	# Delete the build.
	rm -fr starter

test.prep:
	# Clone the starter repository.
	git clone https://github.com/open-sdg/open-sdg-site-starter.git starter
	# Copy the Jekyll config we will use.
	cp tests/_config.yml starter
	# Copy all the theme files into the starter.
	cp -r -t starter/ _includes _layouts assets
	# Add a second language.
	cd starter && python scripts/batch/add_language.py es
	# Build the Jekyll site.
	cd starter && bundle install
	cd starter && bundle exec jekyll build
	# Install dependencies for Cucumber tests.
	cd tests && npm install

test.serve:
	# Serve the Jekyll site at http://127.0.0.1:4000/open-sdg-site-testing/
	cd starter && bundle exec jekyll serve --detach --skip-initial-build

test.html:
	# HTML proofer.
	cd starter && bash scripts/test/html_proofer_staging.sh

test.features:
	# Cucumber.
	cd tests && npx cucumber-js

test: test.before test.prep test.serve test.html test.features test.after
