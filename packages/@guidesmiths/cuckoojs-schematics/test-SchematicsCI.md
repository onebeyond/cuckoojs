# SchematicsCI

## Description

Config basic CI pipeline (docker build and push)

## Command

```
schematics @guidesmiths/cuckoojs-schematics:ci
```

## Parameters

| Name | Description | Type | Supported values | Default value |
| --- | --- | --- | --- | --- |
| ciProvider* | CI provider where ci will be set up | string | github,azuredevops |  |
| dockerRegistry* | Docker registry where images will be pushed | string | any |  |
| imageName* | Docker image name | string | any |  |