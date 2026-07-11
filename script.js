async function main() {
    let a = await fetch("/songs/");
    let response = await a.text();
    console.log(response);

    let div=document.createElement("div");
    div.innerHTML=response;

    let tds=div.getElementsByTagName("td");
    console.log(tds);
}

main();

