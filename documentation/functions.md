# rel functions

functions in rel are sort of similar to java functions.

the functions in rel are defined by stating the keyword `void` then the function name.

For example:

```
void hello() {

}(hello)
```

The `(hello)` at the `}` is stating which function is ending.

## Caling a function

To call a function, add the following code:

`myfunction()`

## Functions with parameters

functions with parameters can be called with the following syntax:

```
myfunction(first="John", last="Doe", full="John Doe")
```

Using a rel version published after June 15, 2023 will no longer require a starting `,` at to supply parameters.

function paramters can be accessed with the `Params` object.

```
void myfunction() {
    Logger.println("Hello " + Params.full + "!")
}(hello)
```

There is no need to list the parameters in the void line.
