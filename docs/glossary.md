# Glossary of terms

This document will define the common terminology used through this platform's documentation.

## Git

This platform, its data, and its metadata, are all powered by files. Changes to these files are tracked (or "versioned") by the industry-standard free sotware called __Git__. Thanks to Git, a complete history of every change to the platform (and its data) will always be available.

## Repository

A set of files that is versioned by Git is called a __repository__. Each repository has its own separate history and administrators.

## Github

Github.com is a service that hosts Git repositories, and provides a useful interface for maintaining them. Github does offer paid services, but everything that this platform needs is part of Github's free offerings.

## Forks

Github offers an easy way to make a copy of a repository, and the term they use is "fork". So, a __fork__ is a copy of a repository. It can also be used as a verb: "to fork" means "to copy a repository", and "forked" means "copied a repository".

## Environments: Staging vs Production

It is important to be able to see proposed changes before releasing them to the general public. To accomplish this, there should be 2 separate __environments__:

* __Staging__: This is where proposed changes are first visible.
* __Production__: This is where the general public views the platform.

## Site repository vs Data repository

The implementation of this platform involves maintaining 2 repositories:

* __Data repository__: This is where the platform's data and metadata are managed.
* __Site repository__: This is where everything else is managed, such as presentation, pages, menus, and documents.
