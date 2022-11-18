# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

## Available schematics

### Pull Request Template

* **Description**: Enables having a standard format when doing Pull Request
* **Command**: `schematics @guidesmiths/cuckoojs-schematics:pr-template`
* **Parameters**:

| Name        | Description                       | Supported values        | Default value  |
|-------------|-----------------------------------|-------------------------|----------------|
| `gitProvider` | Git provider where repo is hosted | `github`, `azuredevops` | |


### Dockerfile

* **Description**: Created a Dockerfile for your build type
* **Command**: `schematics @guidesmiths/cuckoojs-schematics:dockerfile`
* **Parameters**:

| Name          | Description                           | Supported values        | Default value | 
|---------------|---------------------------------------|-------------------------|---------------|
| `directory`   | Directory where files will be created | *valid folder*          | `.` |
| `buildType`   | Specify the build process             | `github`, `azuredevops` | |
| `nodeVersion` | Specify the NodeJS version to use     | `18`, `16`, `14`, `12`  | |

### Gitignore

* **Description**: Created a Gitignore file with common files
* **Command**: `schematics @guidesmiths/cuckoojs-schematics:gitignore`
* **Parameters**:

| Name          | Description                           | Supported values        | Default value | 
|---------------|---------------------------------------|-------------------------|---------------|
| `directory`   | Directory where files will be created | *valid folder*          | `.` |

### Commitlint

* **Description**: Config commit message pattern for your commits
* **Command**: `schematics @guidesmiths/cuckoojs-schematics:commitlint`
* **Parameters**:

| Name          | Description                           | Supported values        | Default value | 
|---------------|---------------------------------------|-------------------------|---------------|
| `directory`   | Directory where files will be created | *valid folder*          | `.` |
