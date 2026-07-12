let currsong = new Audio();

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


const playmusic = (track) => {

    currsong.src = "/songs/" + track;

    currsong.play();
};


async function main() {

    // Get songs
    let songs = await getsongs();

    console.log(songs);


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

}

main();