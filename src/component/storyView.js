import React from 'react';
import * as d3 from 'd3';
import life_experience from '../../data/storyline/life_experience.json';
import birth_death from '../../data/storyline/birth_death.json';
import history_event from '../../data/history_event.json';
import { observer } from "mobx-react";
import { toJS } from 'mobx';
import sStore from 'store/sstore';

@observer
export default class StoryView extends React.Component {
  constructor() {
    super();
  }

  static defaultProps = {
    width: 1400,
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
    const height = this.props.height, width = this.props.width      
    let author_info = this.getAuthorInfo()
    let padding_x = width * 0.1, padding_y = height * 0.4
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
        .style('stroke-width','2px')
        .call(
            d3.axisTop()
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
        let x1 = i === '北宋初期'? xScale(years[i][0] - 5) : xScale(years[i][0])
        let x2 = i === '南宋后期'? xScale(years[i][1] + 5) : xScale(years[i][1]+1)
        let time_line = svg.append('path')
            .attr('d', basicLine([{x:x1, y:0},{x:x2, y:0}]))
            .attr('stroke', 'black')
            .attr('stroke-width', height*0.1)
            .attr('opacity', 0.3)
            .attr('fill', 'none')
        svg.append('text')
            .attr("x",x1*0.5+x2*0.5-30)
            .attr("y",height*0.04)
            .attr('fill','#fff')
            .text(i)
    }

    let x0 = history_event[0]['时间'], emperor0 = history_event[0]['在位'], title0 = history_event[0]['称号']
    let h_year = height*0.1
    for (let i = 0, len = history_event.length; i < len; i++){
        let x1 = history_event[i]['时间'], emperor1 = history_event[i]['在位'], title1 = history_event[i]['称号']
        if(emperor1 !== emperor0){
            let emperor_line  = svg.append('path')
                .attr('d', basicLine([{x:xScale(x0), y:h_year},{x:xScale(x1), y:h_year}]))
                .attr('stroke', 'black')
                .attr('stroke-width', h_year)
                .attr('opacity', 0.5)
                .attr('fill', 'none')
            if(xScale(x1) - xScale(x0) > 30){
                svg.append('text')
                .attr("x",xScale(x0)*0.5+xScale(x1)*0.5-emperor0.length*5)
                .attr("y", h_year - 4)
                .attr('font-size', 10)
                .attr('fill','#fff')
                .text(emperor0)
                .append('title').text(()=>(x0 + '~' + x1))
                svg.append('text')
                .attr("x",xScale(x0)*0.5+xScale(x1)*0.5-title0.length*5)
                .attr("y",h_year + 10)
                .attr('font-size', 10)
                .attr('fill','#fff')
                .text(title0)
                .append('title').text(()=>(x0 + '~' + x1))
            }
            else{
                svg.append('text')
                .attr("x",xScale(x0)*0.5+xScale(x1-1)*0.5-'...'.length*1.6)
                .attr("y", h_year + 3)
                .attr('font-size', 20)
                .attr('fill','#fff')
                .text('...')
                .append('title').text(()=>(emperor0 + '/' + title0 + '\n' + x0 + '~' + x1))
            }
            emperor0 = emperor1
            title0 = title1
            x0 = x1
        }
    }
    let x1 = history_event[history_event.length - 1]['时间']
    let emperor_line  = svg.append('path')
        .attr('d', basicLine([{x:xScale(x0), y:h_year},{x:xScale(x1), y:h_year}]))
        .attr('stroke', 'black')
        .attr('stroke-width', h_year)
        .attr('opacity', 0.5)
        .attr('fill', 'none')
    if(xScale(x1) - xScale(x0) > 30){
        svg.append('text')
        .attr("x",xScale(x0)*0.5+xScale(x1)*0.5-emperor0.length*5)
        .attr("y",h_year - 4)
        .attr('fill','#fff')
        .text(emperor0)
        .append('title').text(()=>(x0 + '~' + x1))

        svg.append('text')
        .attr("x",xScale(x0)*0.5+xScale(x1)*0.5-title0.length*5)
        .attr("y",h_year + 10)
        .attr('font-size', 10)
        .attr('fill','#fff')
        .text(title0)
        .append('title').text(()=>(x0 + '~' + x1))

    }
    else{
        svg.append('text')
        .attr("x",xScale(x0)*0.5+xScale(x1+1)*0.5-'...'.length*1.6)
        .attr("y", h_year + 3)
        .attr('font-size', 20)
        .attr('fill','#fff')
        .text('...')
        .append('title').text(()=>(emperor0 + '/' + title0 + '\n' + x0 + '~' + x1))
    }

    let h_event = height*0.1
    let event_line  = svg.append('path')
    .attr('d', basicLine([{x:xScale(960), y:height-h_event},{x:xScale(1279), y:height-h_event}]))
    .attr('stroke', 'black')
    .attr('stroke-width', h_event*0.2)
    .attr('opacity', 0.5)
    .attr('fill', 'none') 
    .attr('stroke-linecap', "round")

    for (let i = 0, len = history_event.length; i < len; i++){
        if(history_event[i]['大事件'] !== undefined){
            let time = history_event[i]['时间']
            let event_line_vertival = svg.append('line')
                .attr('id','line'+time)
                .attr('x1', xScale(time))
                .attr('y1', height-h_event)
                .attr('x2', xScale(time))
                .attr('y2', 1.5 * h_year)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('opacity', 0.3)
                .attr('stroke-dasharray','4 2')

            svg.append("circle")  
            .attr("cx",xScale(time))  
            .attr("cy", height - h_event)  
            .attr("r", 3)
            .style('fill', 'black')
            .style('fill-opacity', 0.6)
            .style('stroke', 'black')
            .style('stroke-opacity', 1)
            .on('mouseover',()=>{
              d3.selectAll('#line'+time)
              .attr('opacity',0.8)
            })
            .on('mouseout',()=>{
              d3.selectAll('#line'+time)
              .attr('opacity',0.3)
            })
            .append('title').text(()=>(time + ': ' + history_event[i]['大事件']))
        }
    }
    for (let i in author_info){
        let author = author_info[i]
        let ofs = (0.3-author['收录数量'] / 1000) * 2 *padding_y// - 50
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
            .attr('class','path path_'+author['姓名'])
            .attr('stroke', stroke_color)
            .attr('stroke-width', 8)
            .attr('stroke-linecap', "round")
            .attr('opacity', 0.1)
            .attr('fill', 'none')
            .on('mouseover', ()=>{   
                console.log("hello")               
                path
                .attr('opacity', 0.8)
                sStore.setAuthor(author)
            })
            .on('mouseout',()=>{
                path
                .transition(
                    d3.transition()
                    // .delay(1000)
                    .duration(1000)
                )
                .attr('opacity', 0.1)
                sStore.setAuthor('none')
            })
    }

  }

  componentDidUpdate(){
    d3.selectAll('.path')
    .attr('opacity', 0.1)
    let authors = this.props.authors
    console.log(toJS(authors))
    if(authors.length){
    authors.forEach((author)=>{
~       d3.selectAll('.path_' + author)
        .attr('opacity', 0.8)
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
        }}>
        </div>
    )
  }

}
