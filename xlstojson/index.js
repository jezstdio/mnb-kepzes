'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require("fs");

const sheet = "6. Vizsgatárgy";
const final = [];
 
const result = excelToJson({
    sourceFile: 'vizsgakerdesek.xlsx',
    header:{
        rows: 0
    },
    columnToKey: {
        A: 'Kérdés',
        B: 'Válaszok'
    },
    sheets: [sheet]
});

result[Object.keys(result)[0]].forEach(a => {
    if (a["Kérdés"]) {
        final.push({
            "Kérdés": a["Kérdés"],
            "Válaszok": []
        });
    }

    if (a["Válaszok"]) {
        final[final.length - 1]["Válaszok"].push([a["Válaszok"]])
    }
});

fs.writeFile(`leckék/${sheet}.json`, JSON.stringify(final), err => console.log(err));