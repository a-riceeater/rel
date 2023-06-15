# Contributing to rel

Hey there! If you would like to help contribute to rel, please read this guide.
*Be aware, rel does not use a tokenizer, parser, lexer, or other types of functions. Instead, rel parses the code line-by-line (strings) instead which can be very confusing to understand at first look!*

## Cloning the source code

To begin contributing to rel, clone the github repository onto your personal device. Whilst installing rel via [releases](https://github.com/a-riceeater/rel/releases) will install some source code (as modules may require some code), it does not include the interpreter file, which is essential to adding new features.

### Cloning Locations
**If you would like to compile your version of rel into exe files, and/or run a rel project in different folders throughout your computer**, then it is reccomended to install rel in `C:/Program Files/rel`, and adding the folder to your `PATH`.

Otherwise, if you are fine with using the `exampleProject` folder from the github repository, and running your rel project via `node ../rel run`, then your can just clone the folder anywhere on your device.