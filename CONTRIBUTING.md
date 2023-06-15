# Contributing to rel

Hey there! If you would like to help contribute to rel, by adding new features or modules, please read this guide.
*Be aware, rel does not use a tokenizer, parser, lexer, or other types of functions. Instead, rel parses the code line-by-line (strings) instead which can be very confusing to understand at first look!*

Please make sure to read the guidelines below, before contributing.

## Cloning the source code

To begin contributing to rel, clone the github repository onto your personal device. Whilst installing rel via [releases](https://github.com/a-riceeater/rel/releases) will install some source code (as modules may require importing code from those files), it does not include the interpreter file, which is essential to adding new features.

### Cloning Locations
**If you would like to compile your version of rel into exe files, and/or run a rel project in different folders throughout your computer**, then it is reccomended to install rel in `C:/Program Files/rel`, and adding the folder to your `PATH`.

Otherwise, if you are fine with using the `exampleProject` folder (or any other folder located in the same directory) from the github repository, and running your rel project via `node ../rel run`, then your can just clone the folder anywhere on your device.

## Understanding how rel works (to add new features)
If you are trying to add/fix new rel interperter features, you must understand how the rel code structure works. When the user wants to run their code (via `rel run`), the `rel.js` file reads the `rel.json` in the `current working directory` (the directory where the run command is being executed). It then finds the `main` entry, and sends the file name to the `interp` function in `interp.js`. The file is then read, and the lines are sent to an array. The lines are then looped through, where each line is evaluated. Depending on what each line says, a function would be ran. For example if the line says `using <Logger>`, then the `modules.js` file would find the file associated, and require it, importing all the functions.

### Throwing your own errors
Rel has a custom system when it comes to throwing errors. In the `errors.js` file, there are many functions, like `throwTypeError`, `throwUndefined`, and more. If none of the provided error messages suite what you are trying to say, you may either:

**Add your own function to errors file**

This is the recommended method if you feel that this error can be used in many situations, and not just a specific problem.

**Adding a console.log that follows the error structure**

This is reccomended if you are making an error for just one specific situation. Make sure to follow the rel error structure.

### Adding your own code
Now that you understand how the file structure works, you may add your own custom interperter functions, or any other bug fixes.

## Pull requests
Once you believe that your addition or bug fixes are ready to be published, you may submit a pull request. Please make sure to fix all conflicts (if possible) before submitting.

**Your code will be reviewed with the guidelines below, so if you want your code to be published, then make sure it follows the guidelines.**

## License
All the code, documentation, and website is licensed under the [MIT License](https://github.com/a-riceeater/rel/blob/main/LICENSE).

## Guidelines
**When contributing to rel, please make sure to follow these community guidelines**
