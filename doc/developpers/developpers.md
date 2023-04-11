# For developpers

## Install development project.
- Clone the repository
- Install dependencies
```bash
yarn
```

## Structure
The project is structure  : 
```bash
├── Jenkinsfile
├── README.md
├── bin
│   └── set-up
├── doc
│   ├── developpers
├── src
│   ├── generator -> Repository of all generators
│   ├── group     -> Repository of all groups
│   ├── installer -> Repository of all installers
│   └── utils     -> Processors and common tools.
```

Each entity like group, installer and generators have there own directory.
- Groups directory are stored in ./src/group
- Installers directory are stored in the ./src/installer
- Generators directory are stored in the ./src/generator

## How to ?
- [See the "how to" page](./howto.md)

## Available tools
- [See the "available tools" page](./tools.md)