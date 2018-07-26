import React from 'react';
import cipai from '../../data/cipai.json';
import * as d3 from 'd3';

export default class TitleDistrib extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  static defaultProps = {
    width: 1300,
    height: 300
  }

  render() {
    return (
      <div
      className="title-view"
      ref={ref => {
      this.container = ref;
      }}
      style={{
      width: this.props.width,
      height: this.props.height
      }}>
      </div>
    );
  }

  componentDidMount() {
    const height = this.props.height, width = this.props.width    
    let data = cipai

    let svg = d3
    .select(this.container)
    .append('svg')
    .attr('width',width)
    .attr('height',height)

    let treemap=d3.treemap()
      .tile(d3.treemapResquarify)
      .size([width,height])
      .round(true)
      .paddingInner(1);
    
    let hi=d3.hierarchy(data)
    .sum(function(d){ return d.size; })
    .sort(function(a,b){return b.value-a.value;});
    
    treemap(hi);
    
    let cell=svg.selectAll("g")
    .data(hi.leaves())
    .enter().append("g");
    
    let ColorRuler = [
      '#979896','#777876','#585957','#3b3c3b'//,'#202120','#000000'
    ]
    let min_weight = 0
    let max_weight = 48  
    let len = ColorRuler.length - 1
    let basic_domain = new Array(len + 1).fill(0).map((d,i)=>(i / len))
    let domain = basic_domain.map(d=>(min_weight+d*(max_weight-min_weight)))
    let ciColor = d3
      .scaleLinear()
      .clamp(true)
      .domain(domain)
      .range(ColorRuler)

    cell.append("rect")
      .attr("x",function(d){ return d.x0; })
      .attr("y",function(d){ return d.y0; })
      .attr("width",function(d){ return d.x1-d.x0; })
      .attr("height",function(d){ return d.y1-d.y0; })
      .attr("fill",function(d) { return ciColor(d.data.size); })
    
    cell.append('title').text((d)=>(d.data.name+":"+d.data.size))
  }
}

