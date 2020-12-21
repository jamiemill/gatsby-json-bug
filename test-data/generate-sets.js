const fs = require("fs");

const sets = JSON.parse(fs.readFileSync("./test-data/sets-original.json"));

let i = 141;

// Various adjustments to the IDs in sets.json file to see how to stop it interfering with press.json

function leaveUnchanged(id) {return id} // pass in set.id. problem persists
function toInt(id) {return parseInt(id,10)} // pass in set.id. problem remains.
function toSequentialInt() {return i++} // problem goes away. (ids still overlap with the press ones, but are int instead of strings)
function toSequentialString() {return ""+i++} // problem goes away (ids still overlap with the press ones and are identical strings)
function toPrefixedString(id) {return "set-"+id} // pass in set.id. problem goes away (ids now unique)

const setsProcessed = sets.map(set => ({
    ...set,
    "id": leaveUnchanged(set.id),

    // also make all other fields identical to rule out any strange variations in data:
    "title": "Rosemary",
    "publicationID": "MIXTE",
    "dateIsApprox": false,
    "isFashion": true,
    "isActor": false,
    "isMusician": false,
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