if (location.href.match("streeteasy.com/building/")) {
  const listing = {}
  listing.street_address_one = document.querySelector("a.incognito").innerText
  let loctn = document.querySelector("div.backend_data.BuildingInfo-item > span.Text").innerText.split(" ")
  listing.city = loctn[0].match(/(\w+)/)[0]
  listing.state = loctn[1]
  listing.zip_code = parseInt(loctn[2], 10)
  listing.price = parseInt(document.querySelector("div.price").innerText.split("$")[1].split(" FOR RENT")[0].split(",").join(""), 10)
  listing.no_fee = !!document.querySelector("div.status.nofee")
  const details = Array.from(document.querySelectorAll("span.detail_cell"))
  listing.num_beds = parseInt(details.find(el => el.innerText.includes("bed")).innerText.split(" bed")[0], 10)
  listing.num_bath = parseInt(details.find(el => el.innerText.includes("bath")).innerText.split(" bath")[0], 10)
  const amenities = Array.from(document.querySelectorAll("ul.AmenitiesBlock-list li")).map(el => el.innerText)
  // document.querySelector("div.backend_data.BuildingInfo-item > span.Text").text.gsub(/\n|,/,"").split(" ")[0]
  // document.querySelector("div.backend_data.BuildingInfo-item > span.Text").text.gsub(/\n|,/,"").split(" ")[1]
  // document.querySelector("div.backend_data.BuildingInfo-item > span.Text").text.gsub(/\n|,/,"").split(" ")[-1].to_i
  // document.querySelector("div.price").children[2].text.gsub(/\ |\n|\$|\,/, "").to_i
  // document.querySelector("span.detail_cell").find {|el| el.text.include?("bed")}.text.split(" ").first.to_i
  // document.querySelector("span.detail_cell").find {|el| el.text.include?("bath")}.text.split(" ").first.to_i
  // document.querySelector("div.Description-block.jsDescriptionExpanded").inner_html
  listing.amenties = amenities
  listing.url = location.href
  listing
}
