# INSTALLATION
* At the root of your project, create new directory (ex e2e)
```bash
mkdir e2e
cd e2e
```
* Install the cypress-example tool with npm or yarn.
```bash
yarn add https://github.com/tsecher/cypress-example
```
* Set up your project and follow the wizzard.
```bash
yarn set-up
```


## Purpose
This project aims to provide tools to easily plug any project with cypress.
It provides several generators that allow you to generate pre-configured files
easily.
### List of goals :
For example (to be enhanced / updated) : 
- [x] Generate specs and cypress.config.js.
- [x] Generate a docksal command (only available for docksal projects)
- [x] Set-up .git_ignore file ( )
- [x] Provide default ci configuration files ()
- [x] Provide several basic testing according to project type (Ex. Drupal basics testing). 

### Why a npm package ?
The npm package brings several advantages:
- clean version and backward compatibility
- easy to maintain
- easy to update 
- easy to share new features
- easy to use...

## How it works
- This project uses `installers` for each feature you want to add to your project.  
- Each installer is stand-alone.  
- The installers can be grouped, and each installer can be present in several groups.  
- The installers can have an eligibility condition, according to your project. Therefor, an installer
is not available if the structure of the project does not allow it. In the same way, and depending
on the type of installer, once the installer has been insalled, it could be not eligible anymore.
For example, the `docksal_command` installer is not eligible if the project does not contain
a .docksal directory at root. And the `docksal_command` is no longer eligible once the docksal
command file has been generated.

### List all installers
You can list all available installers using the -l options.
Yellow installers are not eligible to the project.
```bash
yarn set-up -l
```

### Launch the full wizzard of eligible installers
```bash
yarn set-up
```

### Launch a specific list of installers
You can provide ids to the `yarn set-up` command that will launch only installers and groups
corresponding to the list of ids.
```bash
yarn set-up [installer_1_id] [installer_1_id]
```

For example :
```bash
# For "ci" groups only
yarn set-up ci

# For "gitlab_ci" installer only
yarn set-up gitlab_ci
```

### Force ineligible installers
You can force ineligible installers to be in the wizzard with the -f options:
```bash
yarn set-up -f
```

## Helpers
This project provide a list of helpers : 
- [helpers](./helpers/readme.md)

### Generate a new helper : 

1. Use generator : 
```bash
yarn generate
```
2. Choose : `Helper  (HelperGenerator)`
3. Declare a name
4. Several files are automatically generated :
  - ./helpers/{new_helper}/
  - ./helpers/readme.md (auto populated)
  - ./helpers.js (auto populated)
5. Do not forget to write the ./helpers/{new_helper}/readme.md ;)

## Integration
- [WSL2](./doc/integration/wsl.md)

## Development
- [For developpers](./doc/developpers/developpers.md)
