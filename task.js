//Function to retrieve profile data

StealthPlugin.onBrowser = () => {};


let name = "";
let email = "";
let tel = "";
let address = "";
let zip = "";
let city = "";
let state = "";
let country = "";
let card = "";
let rawCard = ";"
let expMonth = "";
let expYear = "";
let cvv = "";
const itemType = "accessories";
const itemSubType = "wear";
const qty = "1";
const itemSize = "L";
const keyword1 = "Hanes";
const keyword2 = "Tees";
function fetchData(profName) {
    let rawProfileText = fs.readFile(`./profiles/${profName}.pf`, 'utf8', function read(err, data) {
        if (err) throw err;

        const content = data;
        let rawSplitData = content.split("\n");
        name = rawSplitData[0];
        email = rawSplitData[1];
        tel = rawSplitData[2];
        address = rawSplitData[3];
        zip = rawSplitData[4];
        city = rawSplitData[5];
        state = rawSplitData[6];
        rawCard = rawSplitData[7];
        card=rawCard.match(/.{1,4}/g);
        expMonth = rawSplitData[8];
        expYear = rawSplitData[9];
        cvv = rawSplitData[10];

        console.log(rawSplitData);


    });
    fs.close(0, (err) => { 
        if (err) 
          console.error('Failed to close file', err); 
        else { 
          console.log("\n> File Closed successfully"); 
        }
     });
    console.log(rawProfileText);
}

function refreshProfileList() {
    var tempStr = "";
    var fs = require('fs');
    const profDir = './profiles/';;

    fs.readdir(profDir, (err, files) => {
      files.forEach(file => {
        tempStr += file.toString() + " ";
      });
      var profArray = tempStr.split(".pf ");
      var profList = document.getElementById("profList");
      var defaultOpt = document.createElement("option");
      defaultOpt.value = "000";
      defaultOpt.text = "Select profile...";
      profList.add(defaultOpt); 
      profArray.forEach(temp => {
        if (temp != "") {
          var tempOpt = document.createElement("option");
          tempOpt.value = temp;
          tempOpt.text = temp;
          profList.add(tempOpt);
        }
      });
    });
  }

