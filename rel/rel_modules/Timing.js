/*
    Timing module
*/

async function wait(time) {
    console.log("sleeping " + time)
    await sleep(time);
    return true;
}

function sleep(ms) {
    return new Promise(resolve => {
        const start = new Date().getTime();
        while (new Date().getTime() - start < ms) { }
        resolve();
    });
}

module.exports = { wait };