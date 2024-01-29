
//API url 

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();

let baseTemp
let values = []


let xScale
let yScale

let minYear
let maxYear


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
let tooltip = d3.select('#tooltip')

//start creating the for the data

let createScales = () => {

    minYear = d3.min(values,(items) => {
        return items['year']
    })

    maxYear = d3.max(values, (items) => {
        return items['year']
    })

    xScale = d3.scaleLinear ()
                .domain([minYear, maxYear + 1] )
                .range([padding, width-padding])
                

    yScale = d3.scaleTime()
                .domain([new Date(0,0,0,0,0,0,0), new Date(0,12,0,0,0,0,0)])
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
                return 'Crimson'
            }
        } )
        .attr('data-year', (items) => {
            return items['year']
        })
        .attr('data-month', (items)=> {
            return items['month'] - 1
        })
        .attr('data-temp', (items)=> {
            return baseTemp + items['variance']
        })
        .attr('height',(height - (2 * padding)) / 12)
        .attr('y', (items) => {
            return yScale(new Date(0, items['month']- 1, 0 , 0 , 0 , 0, 0))
        })
        .attr('width',(items) => {
            let numberOfyear = maxYear - minYear
            return (width - (2 * padding)) / numberOfyear
        } )
        .attr('x', (items) => {
            return xScale(items['year'])
        })
        .on('mouseover', (items) => {
            tooltip.transition()
                    .style('visibility', 'visible')

             let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']       

            tooltip.text(items['year'] + ' ' + monthNames[items['month'] - 1 ] + ' - ' + (baseTemp + items['variance']) + ' ( '  + items['variance'] + ')')

            tooltip.attr('data-year', items['year'])

        })
        .on('mouseout', (items) => {
            tooltip.transition()
            .style('visibility', 'hidden')

        })



}
let createAxis = () => {
    let xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.format('d'))
    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat('%B'))

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
