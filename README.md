Component Docs
==============

The following component is written in [loopback][1] (version 3).

## Purpose

The major purpose of writing this component is to allow an application to:

1. Upload a word document template in multiple languages.
2. Modify the document as per the information provided by an **API/configuration** and download or email the changed document to a user.

### Background

This component was originally thought of to provide a function for an Organization to easily create standard documents such as an NDA or Employee contracts or Customer Quotes for sales.

However, this component is reusable by any other application as specific details of the implementation are developer responsibility.

**The component also provides an API to record the usage out of box.**


## Dependencies

> Prerequisites
- Install [Node.js][2] (version 8.x.x or higher) if not already installed on your machine.

- [docxtemplater][3] a node library,  to generate docx/pptx documents from a docx/pptx template. It can replace {placeholders} with data and also supports loops and conditions. The templates can be edited by non-programmers, for example your client.
  - docxtemplater also works on browser with angular parsing.
  - [Documentation][4]

## Development

Follow the git process as described in the  [instructions][5].

## Documentation

Please add documentation to the wiki when the feature is added/removed/deprecated.

[1]: https://loopback.io/doc/en/lb3/
[2]: https://nodejs.org/en/download/
[3]: https://www.npmjs.com/package/docxtemplater
[4]: http://docxtemplater.readthedocs.io/en/latest/
[5]: https://bitbucket.org/multithread-dev/wiki-engineering/wiki/Git-Process
