
//API url 

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();







//select SVG on d3

//create the canvas


//start creating the for the data



//call the api

req.open('GET', url, true)
req.onload = () => {
    console.log(req.responseText)
}
req.send();
