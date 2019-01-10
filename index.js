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
              console.log(listing);
              const form = document.createElement("form")
              form.innerHTML = (`
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
                <input type="submit" />
              `)
              document.querySelector("body").append(form)
              form.addEventListener("submit", (e) => {
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
                  url: listing.url
                }
                console.log(body);
                fetch("http://localhost:3000/listings", {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(body)
                }).then(res => res.json())
                .then(console.log)
              })
            }
          });
        }
    });



  })
})
