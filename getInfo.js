if (location.href.match("streeteasy.com/building/")) {
  const listing = {
    dishwasher: false,
    guarantors_accepted: false,
    outdoor_space: false,
    laundry_in_unit: false,
    doorman: false,
    package_handling: false,
    elevator: false,
    gym: false,
    laundry_in_building: false,
  }
  listing.street_address = document.querySelector("a.incognito").innerText
  console.log(listing.street_address);
  let loctn = document.querySelector("div.backend_data.BuildingInfo-item > span.Text").innerText.split(" ")
  listing.city = loctn[0].match(/(\w+)/)[0]
  listing.state = loctn[1]
  listing.zip_code = parseInt(loctn[2], 10)
  listing.neighborhood = Array.from(document.querySelectorAll("div.details_info > span.nobreak")).find(el => el.innerText.includes("in ")).innerText.split("in ")[1]
  listing.price = parseInt(document.querySelector("div.price").innerText.split("$")[1].split(" FOR RENT")[0].split(",").join(""), 10)
  listing.no_fee = !!document.querySelector("div.status.nofee")
  const details = Array.from(document.querySelectorAll("span.detail_cell"))
  listing.num_beds = parseInt(details.find(el => el.innerText.includes("bed")).innerText.split(" bed")[0], 10)
  listing.num_bath = parseInt(details.find(el => el.innerText.includes("bath")).innerText.split(" bath")[0], 10)
  const amenities = Array.from(document.querySelectorAll("ul.AmenitiesBlock-list li")).map(el => el.innerText)

  amenities.forEach(am => {
    switch (am) {
      case "Dishwasher":
        listing.dishwasher = true
        break;
      case "Guarantors Accepted":
        listing.guarantors_accepted = true
        break;
      case "Public or Private Outdoor Space":
        listing.outdoor_space = true
        break;
      case "Washer/Dryer In-Unit":
        listing.laundry_in_unit = true
        break;
      case "Laundry in Building":
        listing.laundry_in_building = true
        break;
      case "Doorman":
        listing.doorman = true
        listing.package_handling = true
        break;
      case "Package Room":
        listing.package_handling = true
        break;
      case "Elevator":
        listing.elevator = true
        break;
      case "Gym":
        listing.gym = true
        break;
      default:
        break;
    }
  })
  listing.url = location.href
  listing.notes = ""
  listing
}
