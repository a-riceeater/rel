# rel variables

rel variables are declared with the following keywords: `define variableName = "variableValue"`

rel variables are always global. This means that the variable can always be accessed, even if it was declared inside a function.

rel variables can also be defined with functions.

For example, you can define the value with a `Logger.inputRead()` function.

Example:

`
define username = Logger.inputRead("What is your name? ")
`