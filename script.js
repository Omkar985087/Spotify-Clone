let currsong = new Audio();
const play = document.getElementById("play");
let songs;
async function getsongs() {
    let a = await fetch("/songs/");
    let response = await a.text();

    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let i = 0; i < as.length; i++) {

        const element = as[i];

        let href = element.getAttribute("href");

        if (href && href.endsWith(".mp3")) {
            songs.push(href);
        }
    }

    return songs;
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds)) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}


const playmusic = (track, pause = false) => {

    currsong.src = "/songs/" + track;
    if (!pause) {
        currsong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};


async function main() {

    // Get songs
    songs = await getsongs();

    console.log(songs);
    playmusic(songs[0], true)

    let songul = document
        .querySelector(".songlist")
        .getElementsByTagName("ul")[0];


    // Show songs
    for (const song of songs) {

        songul.innerHTML += `
            <li>

                <img class="invert"
                     src="img/music.svg"
                     alt="">

                <div class="info">

                    <div>
                        ${song.replaceAll("%20", " ")}
                    </div>

                    <div>
                        Omkar
                    </div>

                </div>


                <div class="playnow">

                    <span>
                        Play Now
                    </span>

                    <img class="invert"
                         src="img/play.svg"
                         alt="">

                </div>

            </li>
        `;
    }


    // Click song
    Array.from(
        document
            .querySelector(".songlist")
            .getElementsByTagName("li")
    ).forEach(e => {

        e.addEventListener("click", () => {

            let songName = e
                .querySelector(".info")
                .firstElementChild
                .innerHTML
                .trim();

            console.log(songName);

            playmusic(songName);

        });

    });


    // Audio loaded
    currsong.addEventListener("loadeddata", () => {

        let duration = currsong.duration;

        console.log(
            duration,
            currsong.currentSrc
        );

    });

    //attach an event listener to play,next and previous

    play.addEventListener("click", () => {
        if (currsong.paused) {
            currsong.play()
            play.src = "img/pause.svg"
        }
        else {
            currsong.pause()
            play.src = "img/play.svg"
        }
    })

    currsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currsong.currentTime)} / ${secondsToMinutesSeconds(currsong.duration)}`;

        document.querySelector(".circle").style.left =
            (currsong.currentTime / currsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currsong.currentTime = ((currsong.duration) * percent) / 100;
    })

    //add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    })

    //add an event listener for close
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%"
    })

    //add an event listener for prev
    previous.addEventListener("click",()=>{
        console.log("previous clicked");
        console.log(currsong.src)
    })

     //add an event listener for next
    next.addEventListener("click",()=>{
        console.log("next clicked");
        let index=songs.indexOf(currsong.src.split("/").slice(-1)[0]);
        if((index+1)>length)

            playmusic(songs[index+1]);
    })


}

main();