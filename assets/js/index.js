const fs = require('fs');

const readData = () => JSON.parse(fs.readFileSync(__dirname + "/data.json", "utf8"));

const data = readData()

console.log(data["cadeias"])