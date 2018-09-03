import { LatestLocationMessage, LocationInfo } from "./locationinfo";

let onClipBaseLoaded = new Promise((resolve)=>{
    document.addEventListener("DOMContentLoaded", (event) => {
        let clipbase = document.getElementById("clipbase") as HTMLTextAreaElement;
        clipbase.innerText = "hello";
        resolve(clipbase);
    });
});
let recieveLocationInfo = new Promise((resolve)=>{
    let message: LatestLocationMessage = {
        key: "latestLocation",
        value: undefined,
    }
    chrome.runtime.sendMessage(message, (response: LocationInfo)=>{
        resolve(response);
    });
});

Promise.all([onClipBaseLoaded, recieveLocationInfo]).then((values)=>{
    let clipbase = values[0] as HTMLTextAreaElement;
    let info = values[1] as LocationInfo;
    clipbase.innerText = info.title + "\n" + info.url;
});
