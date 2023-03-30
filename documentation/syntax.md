# rel syntax

The syntax for rel is based on c# and java.
However, you do not have to define data types.

## file base

The base for each `.rel` program begins like this:
```
using <Application>

public main() {
    // This is where your code will go.
}(main)
```

Let's see what this does.

`using <Application>`: using is the keyword to require any module or library. 
Application is the default library which has many default features.

`public main() {`: This is stating where your code will go. The name must always match the filename.

`}(main)`: The `}` is signfying the end of a function. The `(main)` is telling the interperter which function is ending.

## Comments

Comments in rel can be stated in two ways.
1. `//`
2. `#`

All the code after the comment symbols will not be read by the interperter.

Comments cannot be placed on the same line after any function is declared.