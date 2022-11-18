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

### Helm chart

* **Description**: Create a helm chart to deploy on kubernetes
* **Command**: `schematics @guidesmiths/cuckoojs-schematics:helm`
* **Parameters**:

| Name          | Description                                   | Supported values | Default value | 
|---------------|-----------------------------------------------|------------------|---------------|
| `serviceName` | Name of the resource to deploy                | *string*         |               |
| `imageName`   | Docker image to be deployed                   | *string*         |               |
| `resourcesLimitCpu`   | Maximum cpu used by each pod                  | *number*         | `100`         |
| `resourcesLimitMemory`   | Maximum memory used by each pod               | *number*         | `128`         |
| `resourcesRequestCpu`   | Requested cpu used by a pod to be launched    | *number*         | `100`         |
| `resourcesRequestMemory`   | Requested memory used by a pod to be launched | *number*         | `128`         |
| `autoscalingEnabled`   | Enable autoscaling features on the pods       | `true`, `false`  | `true`        |
| `autoscalingReplicasMin`   | Autoscaled minimum replicas                   | *number*         | `1`           |
| `autoscalingReplicasMax`   | Autoscaled maximum replicas                   | *number*         | `5`           |
| `autoscalingTargetCpu`   | Target cpu used to trigger autoscaling        | *number*         | `75`          |
