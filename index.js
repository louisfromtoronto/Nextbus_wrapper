var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require('xmldom').DOMParser;
const fs = require('fs');
const URL = "http://webservices.nextbus.com/service/publicXMLFeed?";
const COMMAND_AGENCY_LIST = "command=agencyList";
const QUERY_URL = URL + COMMAND_AGENCY_LIST; 

var xmlDom;
// onreadystatechange specified a function to be executed
// every time the status of the XMLHTTPRequest object changes.

// Before an XML document can be accessed, it must be loaded into
// an XML DOM object.

/// Requests the agency list, and returns it at as an array of JSON-formatted
/// strings, specifying the tag, title and regionTitle of each agency.
function getAgencyList() {
    console.log('getAgencyList()');
    let url = "http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList"

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", url, false);
    xhttp.send();
    xmlDom = loadStringToXMLDOM(xhttp.responseText);
    console.log(xmlDom.getElementsByTagName("agency")[0].getAttribute("title"))

    var json;

    var resultsArray = [];
    for (var i = 0; i < xmlDom.getElementsByTagName("agency").length; i++) {
        let agency = xmlDom.getElementsByTagName("agency")[i];
        json = { title: agency.getAttribute("title"),
                       tag: agency.getAttribute("tag"),
               regionTitle: agency.getAttribute("regionTitle")};
        resultsArray.push(json);
    }

    return resultsArray;
}

// Requests the route list for a specified agency, and returns it as a set of key-value pairs
// tag: title
function getRouteListForAgency(agencyTag) {
    let url = "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a="
    url += agencyTag;
    let xhttp = makeXMLHTTPRequest("GET", url);
    let xmlDom = loadStringToXMLDOM(xhttp.responseText);
    let routes = xmlDom.getElementsByTagName("route");
    // console.log(routes);
    var resultsDictionary = {};
    console.log(routes[0].getAttribute("tag"));
    for (var i = 0; i < routes.length; i++) {
        resultsDictionary[routes[i].getAttribute("tag")] = routes[i].getAttribute("title");
    }
    return resultsDictionary;
}

function loadStringToXMLDOM(string) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(string, "application/xml");
    return xmlDoc;
}

// Makes a new XMLHTTPRequest with specified method and URL, and returns the 
// XMLHTTRequest object once communication with the server is complete.
function makeXMLHTTPRequest(method, url){
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, false);
    xhttp.send();
    return xhttp;
}

getRouteListForAgency("ttc");