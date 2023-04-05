# rel

A funky "programming" language made in Node.Js

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
- Functions with arguments (and returning)
- Including variables and string in the same function
- An exe for terminal
- Use exe to allow projects to be made without having to clone the repository every time


## Example Code

```
using <Application>
using <Logger>

public main () {
    Logger.println("Hello, World")
}(main);
```

# Documentation
Documentation begins [here](https://github.com/ghwosty/rel/blob/main/documentation/quickstart.md)
