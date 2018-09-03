let onClipBaseLoaded = new Promise((resolve)=>{
    document.addEventListener("DOMContentLoaded", (event) => {
        let clipbase = document.getElementById("clipbase") as HTMLTextAreaElement;
        clipbase.innerText = "hello";
        resolve(clipbase);
    });
});
let onBlowserActionClicked = new Promise((resolve)=>{
    chrome.browserAction.onClicked.addListener((tab)=> {
        resolve(tab);
    });
});

Promise.all([onClipBaseLoaded, onBlowserActionClicked]).then((values)=>{
    let clipbase = values[0] as HTMLTextAreaElement;
    let tab = values[1] as chrome.tabs.Tab;
    clipbase.innerText = tab.title + "\n" + tab.url;
});
