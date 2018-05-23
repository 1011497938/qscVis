import React from 'react';
import * as d3 from 'd3';
import life_experience from '../../data/storyline/life_experience.json'
import birth_death from '../../data/storyline/birth_death.json'

export default class StoryView extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  static defaultProps = {
    width: 1800,
    height: 400
  }

  getAuthorInfo() {
    let author_info = {}
    for(let i = 0, l = life_experience.length; i < l; i++) {
        author_info[life_experience[i]['姓名']]=life_experience[i]
    }
    for(let i = 0, l = birth_death.length; i < l; i++) {
        author_info[birth_death[i]['姓名']][birth_death[i]['标记']] = birth_death[i]['年']
    }
    return author_info
  }

  componentDidMount() {
    let author_info = this.getAuthorInfo()
    let height = this.props.height, width = this.props.width
    let padding_x = width * 0.1, padding_y = height * 0.3
    let years = {
        '北宋初期':[960, 1020],
        '北宋中期':[1021, 1080],
        '北宋后期':[1081, 1127],
        '南渡时期':[1128, 1164],
        '南宋中期':[1165, 1207],
        '南宋后期':[1208, 1279]
    }

    let xScale = d3.scaleLinear()
        .domain([years['北宋初期'][0], years['南宋后期'][1]])
        .range([padding_x, width - padding_x])

    let svg = d3
        .select(this.container)
        .append('svg')
        .attr('width',width)
        .attr('height',height)

    let xAxis = svg.append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${height*0.05})`)
        .call(
            d3.axisBottom()
            .scale(xScale)
            .tickValues([960,1021,1081,1128,1165,1208,1279])
        )
    
    let basicLine = d3
        .line()
        .x(function (d) {
            return d.x
        })
        .y(function (d) {
            return d.y
        })
        // .curve(d3.curveBasis)

    for(let i in years){
        let x2 = i === '南宋后期'? xScale(years[i][1]-0.5) :xScale(years[i][1]+0.5)
        let time_line = svg.append('path')
        .attr('d', basicLine([{x:xScale(years[i][0]+0.5), y:0},{x:x2, y:0}]))
        .attr('stroke', 'black')
        .attr('stroke-width', height*0.1)
        .attr('opacity', 0.5)
        .attr('fill', 'none')
        .append("title").text(()=>(i))
    }

    for(let i in author_info){
        let ofs = (Math.random()-0.5)*1.4*padding_y
        let author = author_info[i]
        let life_line_x = [author['生']]
        for(let j in author){
            if(j === '平-仕' || j === '仕-平'){
                life_line_x.push(author[j])
            }
        }
        life_line_x.push(author['卒'])
        life_line_x.sort((x,y)=>(x-y))
        let life_line = [], k = 3, flag = true
        let cache_x = xScale(years['北宋初期'][0]), cache_y = height - padding_y
        life_line_x.forEach((x, i)=>{
            x = xScale(x)
            if(i < 2){
                life_line.push({
                    'x': x,
                    'y': cache_y + ofs 
                })
            }
            else{
                if(flag){
                    let y = cache_y - (x - cache_x) * k
                    if(y >= padding_y){
                        life_line.push({
                            'x': x,
                            'y': y + ofs
                        })
                        cache_y = y
                    }
                    else{
                        life_line.push({
                            'x': cache_x + (cache_y - padding_y) / k,
                            'y': padding_y + ofs
                        })  
                        life_line.push({
                            'x': x,
                            'y': padding_y + ofs
                        })
                        cache_y = padding_y                                
                    }
                }
                else{
                    let y = cache_y + (x - cache_x) * k
                    if(y <= height - padding_y){
                        life_line.push({
                            'x': x,
                            'y': y + ofs
                        })
                        cache_y = y
                    }
                    else{
                        life_line.push({
                            'x': cache_x + (height - padding_y - cache_y) / k,
                            'y': height - padding_y + ofs
                        })  
                        life_line.push({
                            'x': x,
                            'y': height - padding_y + ofs
                        })   
                        cache_y = height - padding_y                                 
                    }
                }
                flag = !flag
            }
            cache_x = x
        })
        let stroke_color = author['派别'] === '豪放派' ? 'orange' : 'black'
        let path = svg.append('path')
        
        path.append("title").text(()=>(author['姓名']))
        path.attr('d', basicLine(life_line))
            .attr('stroke', stroke_color)
            .attr('stroke-width', 8)
            .attr('opacity', 0.1)
            .attr('fill', 'none')
            .on('mouseover', ()=>{                  
                path
                .transition(
                    d3.transition()
                    .duration(500)
                )
                .attr('opacity', 0.8)
            })
            .on('mouseout',()=>{
                path
                .transition(
                    d3.transition()
                    // .delay(1000)
                    .duration(1500)
                )
                .attr('opacity', 0.1)
            })
    }

  }

  render() {
    return (
        <div
        className="story-view"
        ref={ref => {
        this.container = ref;
        }}
        style={{
        width: this.props.width,
        height: this.props.height
        }}></div>
    )
  }

}
