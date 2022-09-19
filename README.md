# Open SDG

This is a platform for collecting and disseminating data for the Sustainable Development Goal global indicators 1.

## Documentation

Complete documentation can be found [here](https://open-sdg.readthedocs.io/en/latest/).

## Development

To see the platform while developing (requires Ruby and Python):

```
make serve
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
