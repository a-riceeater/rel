let loadedAmount = 0;
let interval;

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


fetch("https://rel-server.onrender.com/downloads")
    .then((d) => d.text())
    .then((d) => {
        document.getElementById("trlDownloads").innerText = numberWithCommas(d);
        loadedAmount++;
    })
    .catch((err) => {
        console.error(err);
    })

fetch("https://rel-server.onrender.com/current-version")
    .then((d) => d.text())
    .then((d) => {
        document.querySelector("#latestVersion").innerHTML = "v" + d;
        loadedAmount++;
    })
    .catch((err) => {
        console.error(err);
    })

    interval = setInterval(() => {
    if (loadedAmount == 2) {
        document.querySelectorAll(".loading-bar").forEach(e => e.style.display = "none");
        document.querySelectorAll(".loaded-text").forEach(e => e.style.display = "block");
        
        clearInterval(interval);
    }
}, 1000)