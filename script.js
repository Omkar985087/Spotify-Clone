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

async function main() {
    let songs = await getsongs();
    console.log(songs);

    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]

    for(const song of songs)
    {
        songul.innerHTML=songul.innerHTML+`<li> ${song.replaceAll("%20"," ")} </li>`;
    }
    // play the first song
    var audio = new Audio(songs[0]);

    audio.addEventListener("loadeddata",()=>{
        let duration=audio.duration;
        console.log(audio.duration,audio.currentSrc)
    });
}

main();