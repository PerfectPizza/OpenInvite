# PerfectPizza

> Displacing boredom one event at a time.

## Team

  - __Product Owner__: Ari Leo Frankel
  - __Scrum Master__: Henry Hedges
  - __Development Team Members__: Ross Topol, Kelly John Braun, Mitchell Deane

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)

## Requirements

- Node
- ReactBootstrap
- PostGres
- Express
- browserify-middleware

## Development

### Installing Dependencies

From within the root directory:

```
npm install
```

## Contributing / Style-Guide

### Comments

* Provide comments any time you are confident it will make reading your code easier.
* A good comment is often less effective than a good variable name.

* Do not include a `type=text/javascript"` attribute on script tags

    ```html
    <!-- good -->
    <script src="a.js"></script>

    <!-- bad -->
    <script src="a.js" type="text/javascript"></script>
    ```

* This project utilizes the 'standard' ESLint module with some additional specs. See [.eslintrc.js](.eslintrc.js) for details