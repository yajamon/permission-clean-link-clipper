import { MessageScheme, LatestLocationMessage, LocationInfo } from "./locationinfo";
let latestLocation: LocationInfo;
chrome.browserAction.onClicked.addListener((tab)=> {
    latestLocation = {
        title : tab.title,
        url: tab.url,
    };
    chrome.browserAction.setPopup({popup: "popup.html"});
});

chrome.runtime.onMessage.addListener((message: MessageScheme, sender, sendResponse)=>{
    if(message.key != "latestLocation") return;
    sendResponse(latestLocation);
});
