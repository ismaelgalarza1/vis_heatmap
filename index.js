
//API url 

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();

let baseTemp
let values = []


let xScale
let yScale


//canvas width and height

let width = 1200;
let height = 600
let padding = 60;


//select SVG on d3
let svg = d3.select('svg')

//create the canvas
let createCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}


//start creating the for the data

let createScales = () => {
    xScale = d3.scaleLinear ()
                .range([padding, width-padding])

    yScale = d3.scaleTime()
                .range([padding, height - padding])
}
let createCells = () => {
    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('fill',(items) => {
            variance = items['variance']
            if (variance <= -1 ){
                return 'SteelBlue'
            }else if (variance <= 0 ){
                return 'LightSteelBlue'
            }else if ( variance <= 1 ){
                return 'Orange'
            }else {
                return 'Cirmson'
            }
        } )
        .attr('data-year', (items) => {
            return items
        })
        .attr('data-month', (items)=> {
            return items
        })
        .attr('data-temp', (items)=> {
            return items
        })

}
let createAxis = () => {
    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate('+ padding + ', 0)')

}

 
//call the api

req.open('GET', url, true)
req.onload = () => {
    let object = JSON.parse(req.responseText)
    baseTemp = object['baseTemperature']
    values = object['monthlyVariance']
    console.log(baseTemp)
    console.log(values)
    createCanvas();
    createScales();
    createCells();
    createAxis();
}
req.send();
