
window.addEventListener("DOMContentLoaded", (event) => {
    captureTitleAndUrlAsync();
});

function captureTitleAndUrlAsync() {
    return new Promise((resolve)=>{
        chrome.tabs.query({
            active: true,
        }, (tabs)=> {
            resolve(tabs.shift());
        });
    }).then((tab)=>{
        let title = (tab as chrome.tabs.Tab).title;
        let url = (tab as chrome.tabs.Tab).url;
        let clipbase = document.getElementById("clipbase") as HTMLTextAreaElement;
        clipbase.innerText = title + "\n" + url;
        return true;
    });

}
