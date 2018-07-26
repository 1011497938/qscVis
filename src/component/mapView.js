import React from 'react';
import * as d3 from 'd3';
import Map from '../../res/map.svg';
import geoInfo from '../../data/geoinfo/geo_info.json';
import map from '../../data/china.json';
import life_experience from '../../data/storyline/life_experience.json';
import pathList from '../../data/path.json';
import { observer } from "mobx-react";
import sStore from 'store/sstore';
import { TreeSelect } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const scale = 1200, t_x = 0.5, t_y = 0.22

@observer
export default class MapView extends React.Component {
  constructor() {
    super();
    this.state = {
      authorValue: []
    }
    this.author_info = this.getAuthorInfo()
    this.locList = []
    this.locAuthor = []
    this.locCnt = []
    this.treeData = [{
      title: '北宋初期',
      value: '0-0',
      key: '0-0',
      children: [{
        title: '张先',
        value: '0-0-0',
        key: '0-0-0',
      }],
    },{
      title: '北宋中期',
      value: '0-1',
      key: '0-1',
      children: [{
        title: '苏轼',
        value: '0-1-0',
        key: '0-1-0',
      }, {
        title: '黄庭坚',
        value: '0-1-1',
        key: '0-1-1',
      }, {
        title: '秦观',
        value: '0-1-2',
        key: '0-1-2',
      }, {
        title: '晁端礼',
        value: '0-1-3',
        key: '0-1-3',
      }, {
        title: '贺铸',
        value: '0-1-4',
        key: '0-1-4',
      }, {
        title: '陈师道',
        value: '0-1-5',
        key: '0-1-5',
      }, {
        title: '晁补之',
        value: '0-1-6',
        key: '0-1-6',
      }],
    },{
      title: '南渡时期',
      value: '1-0',
      key: '1-0',
      children: [{
        title: '李清照',
        value: '1-0-0',
        key: '1-0-0',
      },{
        title: '张元干',
        value: '1-0-1',
        key: '1-0-1',
      },{
        title: '尤袤',
        value: '1-0-2',
        key: '1-0-2',
      },{
        title: '杨万里',
        value: '1-0-3',
        key: '1-0-3',
      },{
        title: '蔡伸',
        value: '1-0-4',
        key: '1-0-4',
      },{
        title: '陈与义',
        value: '1-0-5',
        key: '1-0-5',
      }],
    },{
      title: '南宋中期',
      value: '1-1',
      key: '1-1',
      children: [{
        title: '辛弃疾',
        value: '1-1-0',
        key: '1-1-0',
      },{
        title: '张孝祥',
        value: '1-1-1',
        key: '1-1-1',
      },{
        title: '洪适',
        value: '1-1-2',
        key: '1-1-2',
      },{
        title: '刘过',
        value: '1-1-3',
        key: '1-1-3',
      }],
    },{
      title: '南宋后期',
      value: '1-2',
      key: '1-2',
      children: [{
        title: '吴文英',
        value: '1-2-0',
        key: '1-2-0',
      },{
        title: '吴潜',
        value: '1-2-1',
        key: '1-2-1',
      },{
        title: '张炎',
        value: '1-2-2',
        key: '1-2-2',
      },{
        title: '戴复古',
        value: '1-2-3',
        key: '1-2-3',
      }],
    },{
      title: '宋元易代',
      value: '1-3',
      key: '1-3',
      children: [{
        title: '刘辰翁',
        value: '1-3-0',
        key: '1-3-0',
      },{
        title: '文天祥',
        value: '1-3-1',
        key: '1-3-1',
      }],
    }]
  }

  static defaultProps = {
    width: 800,
    height: 600,
  }

  getAuthorInfo() {
    let author_info = {}
    for(let i = 0, l = life_experience.length; i < l; i++) {
        author_info[life_experience[i]['姓名']]=life_experience[i]
    }
    return author_info
  }

  onSelectorChange = (value) => {
    this.setState({ authorValue: value })
  }

  hlRoute = (route_id)=>{
    d3.selectAll(`#${route_id}`)
      .attr('opacity',0.5)
  }

  componentDidMount() {
    const height = this.props.height, width = this.props.width    

    let svg = d3
    .select(this.container)
    .append('svg')
    .attr('width',width)
    .attr('height',height)

    let projection = 
      d3.geoMercator()
        .center([106, 37])
        .scale(scale)
        .translate([width * t_x, height * t_y])

    let getLoc = (query)=>{
      for(let i = 0, len_i = geoInfo.length; i < len_i; i++){
        for(let j = 0, len_j = geoInfo[i].children.length; j < len_j; j++){
          if(geoInfo[i].children[j].name === query){
            let city = geoInfo[i].children[j]
            return projection([+city.log, +city.lat])
          }
        }
      }
      return 0
    }

    let path = d3.geoPath()
    .projection(projection);
    svg.selectAll("path")
            .data(map.features)
            .enter()
            .append("path")
            .attr("stroke", 'rgba(0,0,0,0.3)')
            .attr("stroke-width", 1)
            .attr("d", function (d) {
                return path(d);
            })
            .attr('fill','rgba(0,0,0,0)')

    let pathFunc = d3
    .line()
    .x(function (d) {
        return d.x
    })
    .y(function (d) {
        return d.y
    })

    let drawLocPoint = (loc)=>{
      let pr = getLoc(loc)
      if(pr){
        let index = this.locList.indexOf(loc)
        let clr = circleColor(this.locCnt[index])
        let className = "point"
        this.locAuthor[index].forEach(author=>{
          className += (" "+author)
        })
        svg.append("circle")  
          .attr("class", className)  
          .attr("cx",pr[0])  
          .attr("cy",pr[1])  
          .attr("r", 4)
          .style('fill', clr)
          .style('fill-opacity', 0.8)
          .style('stroke', clr)
          .style('stroke-opacity', 1)
          .style("filter","url(#glow)")
          .on('mouseover',()=>{
            console.log(loc)
            d3.selectAll(`.${loc}`)
            .attr('opacity',0.4)
          })
          .on('mouseout',()=>{
            d3.selectAll(`.${loc}`)
            .attr('opacity',0.0)
          })
      }
    }

    let drawRoute = (route, route_id, route_clr)=>{
      let _route = route
      .map(r=>{
        let pos = getLoc(r)
        if(pos) return {x:pos[0],y:pos[1]}
        else return 0
      })
      .filter(r=>r !== 0)
      let className = "route"
      route.forEach(loc=>{
        className += (" "+loc)
      })
      svg.append('path')
        .attr('class',className)
        .attr('id', route_id)
        .attr('d', pathFunc(_route))
        .attr('stroke', route_clr)
        .attr('stroke-width', 5)
        .attr('stroke-linecap', "round")
        .attr('opacity', 0)
        .attr('fill', 'none')
    }

    for(let i = 0, len = pathList.length; i < len; i++){
      let name = pathList[i].name
      pathList[i].path.forEach((path, j)=>{
        let route_id = name + j,
        route_clr = this.author_info[name]['派别'] === '豪放派' ? 'orange' : 'black'
        drawRoute(path.route, route_id, route_clr)
      })
    }

    pathList.forEach((author)=>{
      let name = author.name
      author.path.forEach((path)=>{
        path.route.forEach((loc)=>{
          let index = this.locList.indexOf(loc)
          if(index === -1){
            this.locList.push(loc)
            this.locCnt.push(1)
            this.locAuthor.push([name])
          }
          else {
            this.locCnt[index]++
            if(this.locAuthor[index].indexOf(name) === -1){
              this.locAuthor[index].push(name)
            }
          }
        })
      })
    })
    let colorRuler = ['#ffc29b','#ffbd93','#ffb68a','#ffb081','#ffaa78','#ffa46f','#ff9e64','#ff975c','#ff9152','#ff8a47','#ff823d','#ff7b33','#ff7426','#ff6b17','#ff6300']
    let min = this.locCnt.reduce((x,y)=>x<y?x:y)
    let max = this.locCnt.reduce((x,y)=>x>y?x:y)
    let len = colorRuler.length - 1
    let basic_domain = new Array(len + 1).fill(0).map((d,i)=>(i / len))
    let domain = basic_domain.map(d=>(min+d*(max-min)))
    let circleColor = d3
      .scaleLinear()
      .clamp(true)
      .domain(domain)
      .range(colorRuler)

    let defs = svg.append("defs")

    //Filter for the outside glow
    let filter = defs.append("filter")
      .attr("width", "300%")
      .attr("x", "-100%")
      .attr("height", "300%")
      .attr("y", "-100%")
      .attr("id","glow");

    filter.append("feGaussianBlur")
      .attr("class", "blur")
      .attr("stdDeviation","3")
      .attr("result","coloredBlur");

    let feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in","coloredBlur");
    feMerge.append("feMergeNode").attr("in","SourceGraphic");

    this.locList.forEach(loc=>{
      drawLocPoint(loc)
    })
    console.log(this.locAuthor)
  }

  componentDidUpdate(){
    let author = this.props.author
    d3.selectAll('.route')
    .attr('opacity',0)
    if(author !== 'none'){
      for(let i = 0, len = pathList.length; i < len; i++){
        let name = pathList[i].name    
        if(name === author['姓名']){
          let route_color = author['派别'] === '豪放派' ? 'orange' : 'black'
          pathList[i].path.forEach((path, j)=>{
            let route_id = name + j
            this.hlRoute(route_id)
          })
          break          
        }
      }
    }
    if(this.state.authorValue.length === 0){ 
      d3.selectAll('.point')
      .attr('visibility', 'visible')
      sStore.setAuthorsStory([])
    }
    else{
      d3.selectAll('.point')
        .attr('visibility', 'hidden')
      let treeData = this.treeData
      let len = treeData.length
      let authors = []
      this.state.authorValue.forEach(author=>{
        let value = author.slice(0,3)
        for (let i = 0; i < len; i++){
          if(treeData[i].value === value){
            let children = treeData[i].children
            let len = children.length
            if(author.length === 5){
              for(let j = 0; j < len; j++){
                if(children[j].value === author){
                  d3.selectAll(`.${children[j].title}`)
                  .attr('visibility', 'visible')
                  authors.push(children[j].title)
                  break
                }
              }
            }
            else{
              for(let j = 0; j < len; j++){
                d3.selectAll(`.${children[j].title}`)
                .attr('visibility', 'visible')
                authors.push(children[j].title)
              }
            }
            break
          }
        }
      })
      sStore.setAuthorsStory(authors)
    }
  }
  render() {
    const tProps = {
      treeData: this.treeData,
      value: this.state.authorValue,
      onChange: this.onSelectorChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '筛选词人',
      style: {
        position: 'absolute',
        left: '70%',
        width: '195px',
        zIndex: 1,
      },
    }
    return (
      <div style={{ 
        width: '1200px',
        position: "relative" 
      }}>
      <TreeSelect {...tProps} />
      <div style = {{
        position: 'relative',
        width: '200px',
        left: '-20%',
        zIndex: 0,
        }}>
        <Map width={this.props.width*0.15} height={this.props.height}/>
      </div>
      <div
        className="map-view"
        ref={ref => {
        this.container = ref;
        }}
        style={{
        position: "relative",
        top: -this.props.height,
        width: this.props.width,
        height: this.props.height,
        zIndex: 100,
        }}>
      </div>
      </div>
    )
  }
}

