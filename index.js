console.log("index.js is running");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const AGENCY_LIST_URL = "http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList";

const URL = "http://webservices.nextbus.com/service/publicXMLFeed?";
const COMMAND_AGENCY_LIST = "command=agencyList";
const QUERY_URL = URL + COMMAND_AGENCY_LIST; 


function makeXHTTPRequest(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        callback(this);
        }
    };
    xhttp.open("GET", QUERY_URL, true);
    xhttp.send();
}

function XMLHander(xml) {
    console.log(xml);
}

makeXHTTPRequest(XMLHander);


// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//     myFunction(this);
//     }
// };
// xhttp.open("GET", QUERY_URL, true);
// xhttp.send();

// function myFunction(xml) {
//     // var xmlDoc = xml.responseXML;
//     // document.getElementById("demo").innerHTML =
//     // xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;

//     console.log(xml);
// }
