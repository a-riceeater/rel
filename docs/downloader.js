const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

fetch("https://server-rel.darthvader1925.repl.co/downloads")
    .then((d) => d.text())
    .then((d) => {
        document.getElementById("downloadAmt").innerText = numberWithCommas(d);
    })
    .catch((err) => {
        console.error(err);
        document.getElementById("downloadAmt").innerText = "Failed"
        document.getElementById("downloadLabel").innerText = " to load downloads"
    })

fetch("https://server-rel.darthvader1925.repl.co/current-version")
    .then((d) => d.text())
    .then((d) => {
        document.querySelector("#downloadBtn > span").innerHTML = "Download v" + d
    })
    .catch((err) => {
        console.error(err);
        document.querySelector("#downloadBtn > span").innerHTML = "Download"
    })

document.getElementById("downloadLink").addEventListener("click", (e) => {
    e.preventDefault();

    fetch("https://server-rel.darthvader1925.repl.co/update-downloads", {
        method: "POST"
    })
        .then(() => {
            window.location = "https://github.com/a-riceeater/rel/releases/latest/download/rel.exe"

            fetch("https://server-rel.darthvader1925.repl.co/downloads")
                .then((d) => d.text())
                .then((d) => {
                    document.getElementById("downloadAmt").innerText = numberWithCommas(d);
                })
                .catch((err) => {
                    console.error(err);
                    document.getElementById("downloadAmt").innerText = "Failed"
                    document.getElementById("downloadLabel").innerText = " to load downloads"
                })
        })
        .catch((err) => {
            console.error(err);
            alert("An error occured. Try again later?")
        })
})