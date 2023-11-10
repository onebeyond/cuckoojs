# basic-tooling

## Description

This schematic adds basic tooling for your NestJS project. It is a compilation of several other schematics from this
package:

- husky
- commitlint
- gitignore
- nvmrc
- nestjs-config

Check their correspondent README files for more info.

## Options

| Option     | Description                                                         | Requiered | Type | Default    |
|------------|---------------------------------------------------------------------|---|---|------------|
| `directory` | Root folder of your NestJS project                                  | false | string | `.`        |

## How to use it within a project

Add it to your project running:

```bash
schematics @guidesmiths/cuckoojs-schematics:basic-tooling --directory=.
```
