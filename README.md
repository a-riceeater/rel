
# rel

A funky "programming" language made in Node.Js

[![GitHub release](https://img.shields.io/github/release/ghwosty/rel?include_prereleases=&sort=semver&color=blue)](https://github.com/ghwosty/rel/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - rel](https://img.shields.io/github/issues/ghwosty/rel)](https://github.com/ghwosty/rel/issues)
![Platform](https://img.shields.io/badge/platform-windows-lightgrey)

## Download
[![Download Rel](https://img.shields.io/badge/DOWNLOAD%20REL%20INSTALLER-v1.0.2-blue?style=for-the-badge)](https://github.com/ghwosty/rel/releases/latest)

## Syntax

Syntax based on java and c#.

## Usage/Instalation

1. Clone the github repository.
2. Add your main file (placeholder is main.rel)
3. Add your main to `rel.json`
4. Begin to code
5. Run by executing the bat with `./run`, or executing `node rel\rel`

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


## Example Code

```
using <Application>
using <Logger>

public main () {
    Logger.println("Hello, World")
}(main);
```

# Documentation
[![view - documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](https://github.com/ghwosty/rel/blob/main/documentation/quickstart.md "View Documentation")
