const BASE_URL = "http://localhost:3000"
chrome.identity.getProfileUserInfo(info => {



      chrome.extension.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(msg) {
          if (msg == "Get User Info"){
            fetch(BASE_URL + "/users/get_user_info", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: info.email
              })
            }).then(res => res.json())
              .then(json => {
              port.postMessage(json);
            })
          }
        });
      })

});
