
chrome.identity.getProfileUserInfo(info => {

  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      console.log(msg);
      port.postMessage(info.email);
    });
  })

});
