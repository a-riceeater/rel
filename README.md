
# rel

A goofy "programming" language made in Node.Js

[![GitHub release](https://img.shields.io/github/release/ghwosty/rel?include_prereleases=&sort=semver&color=blue)](https://github.com/ghwosty/rel/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - rel](https://img.shields.io/github/issues/ghwosty/rel)](https://github.com/ghwosty/rel/issues)
![Platform](https://img.shields.io/badge/platform-windows-lightgrey)

## Download
[![Download Rel](https://img.shields.io/badge/DOWNLOAD%20REL%20INSTALLER-v1.1.0-blue?style=for-the-badge)](https://github.com/ghwosty/rel/releases/latest)

## Syntax

Syntax based on java and c#.

## Platforms

Rel is only available on Windows, but may be added to other platforms in the future.

## Usage/Instalation

1. Clone the github repository.
2. Add your files in exampleProject (or any other folder nearby)
3. Add your main to `rel.json`
4. Begin to code
5. Run by compiling rel (`npm run build-all`) then using `../rel run` (or just `rel run` if added to PATH), or `node ../rel run`

OR

1. Find the latest release
2. Run the installer
3. Create your `.rel` file
4. Create `rel.json`
5. Follow the other steps from above

Example `rel.json`:

```
{
    "name": "my cool project",
    "version": "1.0.0",
    "main": "main.rel",
    "author": "ghwosty",
    "showExit": false
}
```

## Features coming soon

- More functionality to EServer module (post requests)
- Functions with returning
- Frame module
- Math Evaluation
- Multi-line comments


## Example Code

```
using <Application>
using <Logger>

public main () {
    Logger.println("Hello, World")
}(main);
```

# Contributing
View [CONTRIBUTING.md](https://github.com/a-riceeater/rel/blob/main/CONTRIBUTING.md)

# Documentation
[![view - documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](https://github.com/a-riceeater/rel/blob/main/documentation/quickstart.md "View Documentation")
