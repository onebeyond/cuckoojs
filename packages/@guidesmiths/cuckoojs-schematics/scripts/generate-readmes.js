// leer subdirectorios de la carpeta src: 
// buscar el schema.json en cada subdirectorio
// y llamar al script schema-to-markdown.mjs


const fs = require('fs');
const path = require('path');

const packagesPath = path.join(__dirname, '..', 'src');
const packages = fs.readdirSync(packagesPath);

const schemaToMarkdownPath = require('./schema-to-markdown.js');

const generateReadmes = () => {
  packages.forEach(package => {
    const schemaPath = path.join(packagesPath, package, 'schema.json');

    let content = ''
    try {
      content = fs.readFileSync(schemaPath, 'utf-8')

    } catch (err) {
      console.error(err);
    }
    if (fs.existsSync(schemaPath)) {
      const readmePath = path.join(packagesPath, package, 'README-new.md');
      const md = schemaToMarkdownPath(JSON.parse(content));

      console.log('md :>> ', md);
      // try {
      //   fs.writeFileSync(readmePath, md);
      // } catch (err) {
      //   console.error(err);
      // }
    }
  });
}

generateReadmes()

