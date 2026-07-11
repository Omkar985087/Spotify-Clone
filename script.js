async function getsongs() {
    let a = await fetch("/songs/");
    let response = await a.text();
    console.log(response);

    let div=document.createElement("div");
    div.innerHTML=response;

    let as=div.getElementsByTagName("a");
    let songs=[];
    for(let i=0;i<as.length;i++)
    {
        const element=as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }

    return songs;
}

async function main()
{
    let songs=await getsongs();
    console.log(songs);
}

main();

