window.addEventListener("DOMContentLoaded", event => {
  captureTitleAndUrlAsync()
    .then(generateDefaultFormat)
    .then(copyToClipboard);

  for (let element of document.getElementsByClassName("copyButton")) {
    element.addEventListener("click", () => {
      captureTitleAndUrlAsync()
        .then(generateMarkdownFormat)
        .then(copyToClipboard);
    });
  }
});

function captureTitleAndUrlAsync() {
  return new Promise((resolve: (tab: chrome.tabs.Tab) => void, reject) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      tabs => {
        let tab = tabs.shift();
        if (!tab) {
          reject("tab not found!");
          return;
        }
        resolve(tab);
      }
    );
  });
}

function generateDefaultFormat(tab: chrome.tabs.Tab) {
  let clipbase = document.getElementById("clipbase") as HTMLTextAreaElement;
  clipbase.innerText = tab.title + "\n" + tab.url;
}
function generateMarkdownFormat(tab: chrome.tabs.Tab) {
  let clipbase = document.getElementById("clipbase") as HTMLTextAreaElement;
  clipbase.innerText = `[${tab.title}](${tab.url})`;
}

function copyToClipboard() {
  let clipbase = document.getElementById("clipbase") as HTMLTextAreaElement;
  clipbase.select();
  document.execCommand("copy");
}
