# How to ? 

There is a generator command providning tools to generate each type
of entity (installer, groups, and generator.
- Use the command
```bash
yarn generate
```
- Choose your generator.

### Add an installer
- Use the command
```bash
yarn generate
```
- Choose "Installer"
- Follow the wizzard.
- At the end you should see a new directory in ./src/installer.
- Then you have to main methods to complete :
    - `_isEligible` : return true if the installer is elligible
    - `_doInstall` : process installation.


### Add a group
- Use the command
```bash
yarn generate
```
- Choose "Group"
- Follow the wizzard.
- At the end you should see a new directory in ./src/group.
- Then you should see your group in the list when you generate a new installer