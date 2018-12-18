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

run_tests:
	# Build the Jekyll site.
	cd starter && bundle install
	cd starter && bundle exec jekyll build
	# HTML proofer.
	cd starter && bash scripts/test/html_proofer_staging.sh

clean_tests:
	rm -fr starter

test: prepare_tests run_tests clean_tests
