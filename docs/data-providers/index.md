# SDG Platform documentation - Data Providers

This document is intended for data providers who will be tasked with gathering, entering and maintaining the data and metadata for the platform.

## Repositories

A working implementation of this platform requires 2 repositories, which elsewhere in this documentation have been referred to as the "site repository" and the "data repository". Data providers need only be concerned with the data repository. This is the repository that likely was forked from the [sdg-data-starter](https://github.com/OpenDataEnterprise/sdg-data-starter) repository.

## Updating data and metadata

When viewing the platform in it's "staging" version, in the tabs beneath the graph is an "Edit" tab. In this tab are links to "Edit Data" and "Edit Metadata". For more information on the update process, [see here](making-updates.md).

## Data

The data for the platform will be maintained in the data repository as CSV files. The platform requires the CSV files to be in the `data` folder. There should be one file for each indicator. For details on data requirements, [see here](data-format.md).

## Metadata

The metadata for the platform will be maintained in the data repository as YAML-formatted files, inside of the `meta` folder. There should be one file for each indicator. For details on metadata requirements, [see here](metadata-format.md).
