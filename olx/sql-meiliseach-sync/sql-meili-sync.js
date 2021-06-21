const interval = 1;

const { MeiliSearch } = require("meilisearch");
const config = require("./config");
const fetch = require("node-fetch");

const meili = new MeiliSearch(config);

console.log("Connected to meiliseach.");

setInterval(async function () {
  try {
    console.log("Fetching data...");
    const response = await fetch("http://164.90.162.213:3000/ads/active");
    const data = await response.json();
    const ids = data.map(ad => ad.Id)
    console.log(ids)

    const index = await meili.getOrCreateIndex("ads", { primaryKey: "Id" });
    const documents = await index.getDocuments()
    const doc_id = documents.map(doc => doc.Id)
    const to_delete = doc_id.filter(id => !ids.includes(id))
    console.log(doc_id)
    console.log(to_delete)
    
    index.deleteDocuments(to_delete)
    index.updateDocuments(data);

    console.log("Updated data...");
  } catch (e) {
    console.log("Meili error: ", e.message);
  }
}, interval * 60 * 1000);
