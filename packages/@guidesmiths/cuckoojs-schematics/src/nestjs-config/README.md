# nestjs-config

## Description

This schematics adds a `Config` module to NestJS projects to validate and load your app's configuration depending on the
environment your process is executing on.

## How it works

On the app start up, the `config` module will load the configuration file from `src/config/env` depending on the env var 
(`NODE_ENV` by default) that indicates the environment your process is running on. Configuration defined in `src/config/env/default.ts` 
will be merged against the one defined in `src/config/env/<ENV>.ts` where `<ENV>` is the current value indicated by the 
env var defined via the `envVar` option.

## Options

| Option     | Description                                                         | Requiered | Type | Default    |
|------------|---------------------------------------------------------------------|---|---|------------|
| `directory` | Root folder of your NestJS project                                  | false | string | `.`        |
| `envVar  ` | Name of the env var that determines your environment during runtime | false | string | `NODE_ENV` |

## How to use it within a project

Add it to your project running:

```bash
schematics @onebeyond/cuckoojs-schematics:nestjs-config --directory=. --envVar=NODE_ENV
```

This will generate a new NestJS module in `src/config` and the necessary `import`s to your `app.module.ts`. Your NestJS project needs
to have a `./src/app.module.ts` file.

Within `src/config/env` we provide 5 different configurations by default that can be renamed or removed at will to fit 
your project's needs. 

> ⚠️ **`default.ts` must not be deleted**.

Apart from adding the necessary configuration to each env file, you must adapt the following DTO's to suit your needs:

- `src/config/dto/env.dto.ts`: the `enum` `EEnvironment` determines the name of your environments and validates them within
the `src/config/dto/env-vars.dto.ts`.
- `src/config/dto/env-vars.dto.ts`: the `class` `EnvironmentVariablesDto` validates your environment variables. If your env
vars don't meet the validation requirements, the `config` module will throw a validation error during the app start up.
- `src/config/dto/config.dto.ts`:  the `class` `ConfigDto` validates your config files. If your configuration files don't 
meet the validation requirements, the `config` module will throw a validation error during the app start up.


### Remove an environment configuration

1. Remove the value from `EEnvironment` in `src/config/dto/env.dto.ts`
2. Remove the corresponding configuration file from `src/config/env`

### Add/Edit an environment configuration

1. Add/edit the name of the environment to `EEnvironment` in `src/config/dto/env.dto.ts`
2. Add/edit the corresponding configuration file from `src/config/env`. The name of the file must match the value added during
step 1. You must use the default export syntax (`export default`) that exports an object

### Add constrains to DTO's

Constrains to DTO's can be added via decorators from [`class-validator`](https://github.com/typestack/class-validator) and 
[`class-transformer`](https://github.com/typestack/class-transformer). You can even define your own types and use it in
`EnvironmentVariablesDto` and `ConfigDto` as nested types. Please, check the `class-validator` and `class-transformed` docs
for more info.
