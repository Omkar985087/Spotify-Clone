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

const playmusic=(track)=>{
    let audio=new Audio(track);
    audio.play();
}

async function main() {

    let currsong;
    //Get the list of all the songs
    let songs = await getsongs();
    console.log(songs);

    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]

    //sow all the songs in the playlist
    for(const song of songs)
    {
        songul.innerHTML=songul.innerHTML+`<li> 
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Omkar</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                         </li>`;
    }
    // play the first song
    var audio = new Audio(songs[0]);

    audio.addEventListener("loadeddata",()=>{
        let duration=audio.duration;
        console.log(audio.duration,audio.currentSrc)
    });

    // attach an eventlistener
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })
}

main();