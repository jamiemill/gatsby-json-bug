const fs = require("fs");

const sets = JSON.parse(fs.readFileSync("./sets-original.json"));

const setsProcessed = sets.map(set => ({
    ...set,
    "date": {
        "year": 2000,
        "month": 12,
        "period": 1,
        "day": 1
    }
}));

fs.writeFileSync("./src/data/sets.json", JSON.stringify(setsProcessed, null, 2))