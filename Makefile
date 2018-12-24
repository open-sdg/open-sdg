all: test

prepare_tests:
	# Clone the starter repository.
	git clone https://github.com/open-sdg/open-sdg-site-starter.git starter
	# Copy the Jekyll config we will use.
	cp tests/_config.yml starter
	# Copy all the theme files into the starter.
	cp -r -t starter/ _includes _layouts assets
	# Add a second language.
	cd starter && python scripts/batch/add_language.py es
	# Build and serve the Jekyll site at http://127.0.0.1:4000/open-sdg-site-testing/
	cd starter && bundle install
	cd starter && bundle exec jekyll serve --detach
	# Install dependencies for Cucumber tests.
	cd tests && npm install

run_tests:
	# HTML proofer.
	cd starter && bash scripts/test/html_proofer_staging.sh
	# Cucumber.
	cd tests && npx cucumber-js

clean_tests:
  # Stop the detached Jekyll web server.
	pkill -f -9 jekyll
	# Delete the build.
	rm -fr starter

test: prepare_tests run_tests clean_tests
