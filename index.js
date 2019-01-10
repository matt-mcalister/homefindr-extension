document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button")
  button.addEventListener("click", () => {
    chrome.tabs.query({
        "currentWindow": true,
        "active": true
    }, function (tabs) {
        for (tab in tabs) {
          chrome.tabs.executeScript(tabs[tab].id, {file: "getInfo.js"}, function(response) {
            if (response) {
              const listing = response[0]
            }
          });
        }
    });



  })
})
