# install-packages

## Description

This schematic install packages with your project's package manager by exploring the _lock_ file in your project or your
package manager globally install.

It is an adaptation of [detect-package-manager](https://github.com/egoist/detect-package-manager) to work within the context
of schematics and its `Tree`.

## Options

| Option        | Description                                                        | Requiered | Type | Default |
|---------------|--------------------------------------------------------------------|---|---|---------|
| `directory`   | Root folder of your project                                  | false | string | `.`     |

## How to use it within a project

Add it to your project running:

```bash
schematics @guidesmiths/cuckoojs-schematics:install-packages --directory=.
```
