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

- A module which allows you to create an express server to route files, etc.
- Functions
- Including variables and string in the same function
- etc


## Example Code

```
using <Application>
using <Logger>

public main () {
    Logger.println("Hello, World")
}(main);
```

# Documentation
Documentation begins [here](https://github.com/ghwosty/rel/blob/main/documentation/start.md)
