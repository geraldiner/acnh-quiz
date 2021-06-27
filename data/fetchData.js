const axios = require("axios");
const fs = require("fs");

const endpoint =
  "https://raw.githubusercontent.com/geraldiner/google-sheets-to-json/master/out/items.json";

async function fetchACNHData() {
  try {
    const res = await axios.get(endpoint);
    const data = await res["data"];
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function filterArtData() {
  const data = await fetchACNHData();
  const art = data.filter((item) => item["sourceSheet"] === "Art");
  fs.writeFileSync("acnhArt.json", JSON.stringify(art, null, 2), "utf8");
}

filterArtData();
