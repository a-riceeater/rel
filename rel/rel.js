const interper = require('./interp');
const handlers = require("./handlers");
const requires = require("./requires");
const path = requires.path;
const fs = requires.fs;

fs.readFile("./rel.json", (err, data) => {
    if (err) throw err;
    handlers.wl("-- New Instance Started -- ")
    const rel = JSON.parse(data)
    const file = rel.main;
    if (fs.existsSync(file)) {
      interper.interp(file)
        .then(() => {
          handlers.wl("-- Instance Finished -- ")
          console.log("Program exited with status code 0.")
      }) 
    }
    else {
      console.log(requires.FgRed + "ERROR: Program exited with exit status 0:");
      console.log("   " + path.join(__dirname, "../" + rel.main))
      console.log("ENODENT: no such file or directory", requires.Reset);
    }
})