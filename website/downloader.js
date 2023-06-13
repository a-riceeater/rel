const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

fetch("https://rel-server.onrender.com/downloads")
    .then((d) => d.text())
    .then((d) => {
        document.getElementById("downloadAmt").innerText = numberWithCommas(d);
    });