const fs = require('fs')

const schema = {
  "$schema": "http://json-schema.org/schema",
  "$id": "SchematicsCI",
  "title": "PR Template Options Schema",
  "type": "object",
  "properties": {
    "ciProvider": {
      "type": "string",
      "description": "CI provider where ci will be set up",
      "enum": [
        "github",
        "azuredevops"
      ],
      "x-prompt": {
        "message": "What CI provider do you want to set up?",
        "type": "list",
        "items": [
          {
            "value": "github",
            "label": "GitHub Actions"
          },
          {
            "value": "azuredevops",
            "label": "Azure DevOps Pipelines"
          }
        ]
      }
    },
    "dockerRegistry": {
      "type": "string",
      "description": "Docker registry where images will be pushed",
      "x-prompt": "Docker registry name or service connection for Azure Pipelines?"
    },
    "imageName": {
      "type": "string",
      "description": "Docker image name",
      "x-prompt": "How do you want to name this repo's images?"
    }
  },
  "required": ["ciProvider", "dockerRegistry", "imageName"]
}

  // * **Description**: Config basic CI pipeline (docker build and push)
//   * ** Command **: `schematics @guidesmiths/cuckoojs-schematics:ci`
//     * ** Parameters **:

// | Name | Description | Supported values | Default value | 
// | ------------------| ------------------------------------------------------------| -------------------------| ------|
// | `ciProvider` | CI provider | `github`, `azuredevops` |  |
// | `dockerRegistry` | Docker registry to push image or service connection if AzureDevOps | * string *                |  |
// | `imageName` | Name of the docker image | * string *                |  |

const generateParametersTable = (schema) => {
  const table = Object.entries(schema.properties).map(([key, property]) => {
   return `| ${key}${schema.required?.includes(key) ? '*' : ''} | ${property.description} | ${property.type} | ${property.enum ?? 'any'} | ${property.default ?? ''} |`;
  }).join('\n');

  return [
    `| Name | Description | Type | Supported values | Default value |`,
    `| --- | --- | --- | --- | --- |`,
    table
  ].join('\n');
}

const schemaToMarkdown = (schema) => {
  const table = Object.entries(schema.properties).map(([key, property]) => {
   return `| ${key}${schema.required?.includes(key) ? '*' : ''} | ${property.description} | ${property.type} | ${property.enum ?? 'any'} | ${property.default ?? ''} |`;
  })

  let md = [
    `# ${schema.$id}`,
    `## Description`,
    `Config basic CI pipeline (docker build and push)`,
    `## Command`,
    `\`\`\`\nschematics @guidesmiths/cuckoojs-schematics:ci\n\`\`\``,
    `## Parameters`,
    generateParametersTable(schema)
  ]

  return md.join('\n\n')
}

module.exports = schemaToMarkdown;