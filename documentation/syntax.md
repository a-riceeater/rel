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

#### Tip:

"Comments" can go after most* line of code, without as comment symbol.

For example:

```
using <Application> this is requiring the application module
using <Logger> this is requiring the logger module

public main() { start of main
    Logger.println("Hello World!")
}(main)
```

*1 Except for lines with dot functions (ex. `Logger.println("Hi") prints hi` will not work),

*1 Ending lines for functions (`}(main) end of main` will not work)


## Semicolons (;)

Semicolons are no longer not allowed in rel. (Apr. 2, 2023)

You may choose to use a semicolon, but it is optional.

If you are using a version past said date, semicolons will not be required, and a syntax error will be thrown.