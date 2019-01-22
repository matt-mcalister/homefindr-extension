const BASE_URL = "https://home-findr.herokuapp.com/"
let port = chrome.extension.connect({
      name: "StreetFaves"
});
port.postMessage("Get User Info");
port.onMessage.addListener(backgroundJson => {
  console.log(backgroundJson);
  const htmlBody = document.querySelector("body")
  let tabId;
  chrome.tabs.query({
    "currentWindow": true,
    "active": true
  }, function (tabs) {
    if (tabs) {
      for (tab in tabs) {
        tabId = tabs[tab].id
        console.log("aaaay", tabId);
      }
    }
    renderContent()
  })

  function createVisitFavesButton(){
    const visitFavesButton = document.createElement("button")
    visitFavesButton.innerText = "Visit Favorites"
    visitFavesButton.addEventListener("click", () => {
      chrome.tabs.create({'url': BASE_URL}, function(tab) {
        // Tab opened.
      })
    })

    return visitFavesButton
  }


  function renderContent(){

    chrome.tabs.executeScript(tabId, {code: "window.location.href"}, (response) => {
      let tabUrl = response && response[0]
      if (backgroundJson.user !== "User Not Found" && !!response && tabUrl.match("streeteasy.com/building/")) {
        // fetch(BASE_URL + "/listings/search", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({url: tabUrl, email: backgroundJson.user.email})
        // }).then(res => res.json())
        // .then(json => {
        //   console.log(json);
        //   if ()
          let listing;
          if (backgroundJson.user.listings) {
            listing = backgroundJson.user.listings.find(l => {
              return l.url.includes(tabUrl)
            })
          }
          if (listing) {
            renderEditAndDeleteButtons(listing)
          } else {
            renderFavoriteButton()
          }
        // })
      } else {
        htmlBody.append(createVisitFavesButton())
      }
    })
  }

  function renderEditAndDeleteButtons(listing){
    htmlBody.innerHTML = (`
      <h3>Listing is in favorites</h3>
      `)


      const editButton = document.createElement("button")
      editButton.innerText = "Edit Listing"
      editButton.addEventListener("click", () => handleListingInfo([listing], true))

      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Delete From Favorites"
      deleteButton.addEventListener("click", () => {
        fetch(BASE_URL + "/listings/" + `${listing.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(renderFavoriteButton)
      })
      htmlBody.append(createVisitFavesButton(), document.createElement("br"), editButton, document.createElement("br"), deleteButton)
    }

    function renderFavoriteButton(){
      const button = document.createElement("button")
      button.innerText = "Add to Favorites"
      button.addEventListener("click", addFavorite)
      htmlBody.innerHTML = "<h3>Listing is not currently in Favorites</h3>"
      htmlBody.append(createVisitFavesButton(), document.createElement("br"), button)
    }

    function addFavorite(){
      chrome.tabs.executeScript(tabId, {file: "getInfo.js"}, handleListingInfo)
    }


    function handleListingInfo(response, edit=false) {
      if (response.length > 0) {
        const listing = response[0]
        const form = document.createElement("form")
        form.innerHTML = (`
          <input type="hidden" value="${listing.url}" name="url"  /><br />
          <label for="street_address">Address</label>
          <input type="text" value="${listing.street_address}" name="street_address" /><br />
          <label for="city">City</label>
          <input type="text" value="${listing.city}" name="city" /><br />
          <label for="state">State</label>
          <input type="text" value="${listing.state}" name="state" /><br />
          <label for="zip_code">Zip Code</label>
          <input type="text" value="${listing.zip_code}" name="zip_code" /><br />
          <label for="neighborhood">Neighborhood</label>
          <input type="text" value="${listing.neighborhood}" name="neighborhood" /><br />
          <label for="price">Price</label>
          <input type="number" value="${listing.price}" name="price" /><br />
          <label for="num_beds">Beds:</label>
          <input type="number" value="${listing.num_beds}" name="num_beds" /><br />
          <label for="num_bath">Baths</label>
          <input type="number" value="${listing.num_bath}" name="num_bath" step="0.5"/><br />
          <label for="no_fee">No Fee?</label>
          <input type="checkbox" ${listing.no_fee && "checked"} name="no_fee" /><br />
          <label for="dishwasher">Dishwasher</label>
          <input type="checkbox" ${listing.dishwasher && "checked"} name="dishwasher" /><br />
          <label for="guarantors_accepted">Guarantors Accepted?</label>
          <input type="checkbox" ${listing.guarantors_accepted && "checked"} name="guarantors_accepted" /><br />
          <label for="outdoor_space">Outdoor Space?</label>
          <input type="checkbox" ${listing.outdoor_space && "checked"} name="outdoor_space" /><br />
          <label for="laundry_in_unit">Laundry In Unit?</label>
          <input type="checkbox" ${listing.laundry_in_unit && "checked"} name="laundry_in_unit" /><br />
          <label for="laundry_in_building">Laundry In Building?</label>
          <input type="checkbox" ${listing.laundry_in_building && "checked"} name="laundry_in_building" /><br />
          <label for="doorman">Doorman?</label>
          <input type="checkbox" ${listing.doorman && "checked"} name="doorman" /><br />
          <label for="package_handling">Package Handling?</label>
          <input type="checkbox" ${listing.package_handling && "checked"} name="package_handling" /><br />
          <label for="elevator">Elevator?</label>
          <input type="checkbox" ${listing.elevator && "checked"} name="elevator" /><br />
          <label for="gym">Gym?</label>
          <input type="checkbox" ${listing.gym && "checked"} name="gym" /><br />
          <label for="gym">Notes:</label>
          <input type="text" name="notes" value="${listing.notes}" /><br />
          <label for="hunt_id">Hunt:</label>
          `)
          const dropdown = document.createElement("select")
          dropdown.name = "hunt_id"
          let option = document.createElement("option")
          option.value = "Create New Hunt"
          option.innerText = "Create New Hunt"
          dropdown.append(option)
          backgroundJson.user.hunts.forEach((h, i) => {
            option = document.createElement("option")
            option.innerText = h.name
            option.value = h.id
            if (i === backgroundJson.user.hunts.length - 1) {
              option.selected = true
            }
            dropdown.append(option)
          })
          form.append(dropdown)
          const submit = document.createElement("input")
          submit.type = "submit"
          form.append(submit)
          htmlBody.innerHTML = ""
          htmlBody.append(form)
          form.addEventListener("submit", createListing)
        }
      }

      function createListing(e){
        e.preventDefault()
        const body = {
          street_address: e.target.street_address.value,
          city: e.target.city.value,
          state: e.target.state.value,
          zip_code: e.target.zip_code.value,
          neighborhood: e.target.neighborhood.value,
          price: e.target.price.value,
          num_beds: e.target.num_beds.value,
          num_bath: e.target.num_bath.value,
          no_fee: e.target.no_fee.checked,
          dishwasher: e.target.dishwasher.checked,
          guarantors_accepted: e.target.guarantors_accepted.checked,
          outdoor_space: e.target.outdoor_space.checked,
          laundry_in_unit: e.target.laundry_in_unit.checked,
          laundry_in_building: e.target.laundry_in_building.checked,
          doorman: e.target.doorman.checked,
          package_handling: e.target.package_handling.checked,
          elevator: e.target.elevator.checked,
          gym: e.target.gym.checked,
          url: e.target.url.value,
          notes: e.target.notes.value,
          hunt_id: e.target.hunt_id.value,
          email: backgroundJson.user.email
        }
        fetch(BASE_URL + "/listings", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }).then(res => res.json())
        .then(handlePostRequest)
      }


      function handlePostRequest(json){
        if (json.errors) {
          alert(json.errors.join(" "))
        } else {
          renderEditAndDeleteButtons(json.listing)
        }
      }


});
