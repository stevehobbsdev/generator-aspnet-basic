# Generator - Asp.Net vNext Basic Website [![Build Status](https://travis-ci.org/elkdanger/generator-aspnet-basic.svg?branch=master)](https://travis-ci.org/elkdanger/generator-aspnet-basic)
A yeoman generator for a basic vNext 'Hello world' website.

The motivation for this is down to the official generator taking an 'all or nothing' approach to the generation of a vNext website - you can either choose to generate an empty project, or a site that contains everything you need in terms of a fully functioning site, with account support, databases and so on.

This generator will generate the an empty website - the basics of what you need in order to get a site up and running, with support for static files and optional support for Gulp and Twitter Bootstrap. The rest is up to you.

## Usage
    $ yo aspnet-basic

You will be asked for the name of the application to be generated, which affects the C# namespaces.

You will also be asked if you would like:

- Support for the Gulp build system
- Twitter Bootstrap to be included by default

## Commands

The following gulp commands are available, provided you have chosen Gulp support when running the generator. This assumes that you have [installed Gulp globally][1]:

- `$ gulp` Runs the default gulp task
- `$ gulp bootstrap` Copies the Bootstrap assets to the wwwroot folder (if you have chosen Bootstrap support when generating the site)

[1]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
