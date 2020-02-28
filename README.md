# Open SDG

This is a platform for collecting and disseminating data for the Sustainable Development Goal global indicators.

## Documentation

Complete documentation can be found [here](https://open-sdg.readthedocs.io/en/latest/).

## Development

To see the platform while developing (requires Ruby and Python):

```
make serve
```

### Using Docker

If you have Docker installed you can run do the same as above, without worrying about installing the correct software or packages. Docker will create a container with all the necessary packages for you, and serve the site:

```bash
make serve.docker
```

To run the tests (also requires Node.js):

```
make test
```

To run particular tests:

```
# Test for broken links, images, and other HTML issues.
make test.html
# Test for broken functionality.
make test.features
# Test for accessibility problems.
make test.accessibility
```

To clean up (remove temporary files and stop the web server) after tests:

```
make clean
```
