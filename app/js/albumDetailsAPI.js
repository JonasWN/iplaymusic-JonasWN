import request from "/assets/js/indexAPI.js";

const paramsID = new URLSearchParams(window.location.search);
const id = paramsID.get("id");

// DOM Elements
const elements = {
    header: document.querySelector(".nopadding__header"),
    heading: document.querySelector(".Title__heading_white"),
    underHeading: document.querySelector(".albumDetailsh2__white"),
    hashTagList: document.querySelector(".hashtagSection__list"),
    hashTagClone: document.querySelector("#hashtags"),
    songClone: document.querySelector("#new__album"),
    songList: document.querySelector(".main__songsList"),
}

// Miliseconds ReWrite
function millisToMinutesAndSeconds(millis) {
    // millis to min / seconds
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60 ?
        minutes + 1 + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}


// GET Data
const answer = async () => {

    try {

        let refreshToken = sessionStorage.getItem("refresh")
        const data = await fetch(
            `https://api.spotify.com/v1/albums/${id}`, // Fetch Wanted Data
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + refreshToken
                },
                json: true
            }
        );

        const result = await data.json();
        console.log(result);

        elements.header.style.background = `url(${result.images[0].url})`;
        elements.header.style.backgroundPosition = "center";
        elements.header.style.backgroundSize = "cover";
        elements.header.style.backgroundRepeat = "no-repeat";
        elements.header.style.filter = "contrast(1.3)";

        elements.heading.textContent = result.name;
        elements.underHeading.textContent = result.artists[0].name

        const songs = result.tracks.items;
        console.log(songs)
        songs.forEach(item => {
            let productClone = elements.songClone.content.cloneNode(true);
            productClone.querySelector(".main__itemHeader").textContent = item.name;
            productClone.querySelector(".main__itemHeader").setAttribute("href", `/playing?id=${item.id}`);
            productClone.querySelector(".main__songCount").textContent = millisToMinutesAndSeconds(item.duration_ms)
            productClone.querySelector("a").setAttribute("href", `/playing?id=${item.id}`)
            elements.songList.appendChild(productClone)
        })

    } catch (error) {
        console.log(error)
        request()
    }
}

answer()