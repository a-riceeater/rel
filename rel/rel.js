const fs = require('fs');
const interper = require('./interp');
const handlers = require("./handlers")

const path = require("path")
const startDate = new Date();

fs.readFile("./rel.json", (err, data) => {
    if (err) throw err;
    handlers.wl("-- New Instance Started -- ")
    const rel = JSON.parse(data)
    const file = rel.main;
    if (fs.existsSync(file)) {
      interp.interp(file)
        .then((data) => {
          handlers.wl("-- Instance Finished -- ")
      }) 
    }
    else {
      const rel = JSON.parse(data)
      const FgRed = "\x1b[31m"

      console.log(FgRed + "ERROR: Program exited with exit status 0:");
      console.log("   " + path.join(__dirname, rel.main))
      console.log("File not found!");
    }
})