<div style="display:flex; align-items:center; justify-content:center">
  <img alt="logo" src="./assets/banner-filled.svg" width="100%" />
</div>
<br />

#### Let the cuckoo accommodate the nest for you.

CuckooJS is a scaffolding based on <a href="https://nestjs.com/" target="_blank">NestJS</a>. Inspired by the cuckoo bird, we took advantage of the already created nest and included our own easter eggs, such as:
- <a href="https://commitlint.js.org/#/" target="_blank">Commitlint</a>
- <a href="https://www.npmjs.com/package/husky" target="_blank">Husky</a>
- <a href="https://www.npmjs.com/package/@guidesmiths/license-checker" target="_blank">License checker</a> <img alt="logo" src="https://github.com/guidesmiths/license-checker/blob/6e96b2d9a93e3838931e87f8f63af7f144811689/assets/logo.png?raw=true" width="20px" />

This way, you don't have to worry about including these when initiating a new project. 



### <img alt="logo" src="./assets/logo.svg" width="20px" />  How to use it

Install the cuckoo cli globally

```bash
npm install -g @guidesmiths/cuckoojs-cli
```

Creating a new NestJS app with the basic tooling:

```bash
cuckoo new <projectname>
```


You can still use all the commands that work with NestJS, for example:

```bash
cuckoo generate|g controller <name>
```

### Use our schematics

If you want to use the schematics solely, install the schematics globally

```bash
npm install -g @guidesmiths/cuckoojs-schematics
```

Currently we have schematics for:
- creating a .gitignore file:

```bash
schematics @guidesmiths/cuckoojs-schematics:gitignore
```
- adding commitlint:

```bash
schematics @guidesmiths/cuckoojs-schematics:commitlint
```
