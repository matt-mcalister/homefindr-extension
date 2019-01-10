
chrome.identity.getProfileUserInfo(info => {

  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      port.postMessage(info.email);
    });
  })

});
