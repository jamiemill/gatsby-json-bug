const fs = require("fs");

const sets = JSON.parse(fs.readFileSync("./sets-original.json"));

const setsProcessed = sets.map(set => ({
    ...set,
    "date": {
        "year": 2000,
        "month": 12,
        "period": 1,
        "day": 1
    },
    "images": [
        {
          "filename": "145--1--KILLING+MACHINE+Georgina.jpg",
          "sourcePath": "145--1--KILLING+MACHINE+Georgina.jpg",
          "source": "squarespace-images-fashion",
          "order": 1,
          "isCover": false
        },
        {
          "filename": "145--2--london+fashion+Georgina+.jpg",
          "sourcePath": "145--2--london+fashion+Georgina+.jpg",
          "source": "squarespace-images-fashion",
          "order": 2,
          "isCover": false
        },
        {
          "filename": "145--3--RAYGUN+Georgina.jpg",
          "sourcePath": "145--3--RAYGUN+Georgina.jpg",
          "source": "squarespace-images-fashion",
          "order": 3,
          "isCover": false
        }
      ]
}));

fs.writeFileSync("./src/data/sets.json", JSON.stringify(setsProcessed, null, 2))