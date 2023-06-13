const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

fetch("https://rel-server.onrender.com/downloads")
    .then((d) => d.text())
    .then((d) => {
        document.getElementById("downloadAmt").innerText = numberWithCommas(d);
    })
    .catch((err) => {
        document.getElementById("downloadAmt").innerText = "Failed"
        document.getElementById("downloadLabel").innerText = " to load downloads"
    })

fetch("https://rel-server.onrender.com/current-version")
    .then((d) => d.text())
    .then((d) => {
        document.querySelector("#downloadBtn > span").innerHTML = "Download v" + d
    })
    .catch((err) => {
        document.querySelector("#downloadBtn > span").innerHTML = "Download"
    })