import React from 'react';
import * as d3 from 'd3';
import Js2WordCloud from 'js2wordcloud';
import shape from '../../res/shape.png';
import _QB from '../../data/ci_freq/全本.json';

import _HF from '../../data/ci_freq/词风/豪放.json';
import _WY from '../../data/ci_freq/词风/婉约.json';

import _BS0 from '../../data/ci_freq/年代/北宋前期.json';
import _BS1 from '../../data/ci_freq/年代/北宋中期.json';
import _BS2 from '../../data/ci_freq/年代/北宋后期.json';
import _ND from '../../data/ci_freq/年代/南渡时期.json';
import _NS0 from '../../data/ci_freq/年代/南宋中期.json';
import _NS1 from '../../data/ci_freq/年代/南宋后期.json';
// import _SY from '../../data/ci_freq/年代/宋元易代.json';

import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class CiCloud extends React.Component {
  constructor() {
    super();
    this.state = {value: 0};
    this.ColorRuler = [
      '#979896','#777876','#585957','#3b3c3b','#202120','#000000'
    ]
    this.ci_freq = [_QB, [_HF, _WY], [_BS0, _BS1, _BS2, _ND, _NS0, _NS1]]
  }

  static defaultProps = {
    width: 1000,
    height: 600,
  }

  onRadioChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  renderSingleCloud(list, cnt, container){
    let ColorRuler = this.ColorRuler
    let min_weight = list.map(item=>item[1]).reduce((x,y)=>x<y?x:y)
    let max_weight = list.map(item=>item[1]).reduce((x,y)=>x>y?x:y)  
    let len = ColorRuler.length - 1
    let basic_domain = new Array(len + 1).fill(0).map((d,i)=>(i / len))
    let domain = basic_domain.map(d=>(min_weight+d*(max_weight-min_weight)))
    let ciColor = d3
      .scaleLinear()
      .clamp(true)
      .domain(domain)
      .range(ColorRuler)
    const options = {
        fontFamily: 'W9',
        minFontSize: 30 / cnt, 
        maxFontSize: 100 / cnt,    
        tooltip: {
            show: true,
            formatter: function(item) {
                return '\"' + item[0] + '\"'+ '的词频: ' + item[1]
            }
        },
        list: list,
        color: (word, weight, fontSize, distance, theta)=>ciColor(weight),
        backgroundColor: 'rgba(0,0,0,0)',
        imageShape: shape,
        rotateRatio: 0
    }

    let wc = new Js2WordCloud(container)
    wc.showLoading({
        backgroundColor: 'rgba(0,0,0,0)',
        text: '渲染中……',
        effect: 'spin'
    })
    setTimeout(function() {
        wc.hideLoading()
        wc.setOption(options)
    }, 20)
    window.onresize = ()=>{
        wc.resize()
    }
  }

  renderCLoud(List){
    this.container.innerHTML = ""
    List.forEach(()=>{
      this.container.appendChild(document.createElement("div"))
    })
    this.container.style.display = 'flex'
    this.container.style.flexDirection = 'row'
    this.container.style.flexWrap = 'wrap'
    this.container.style.justifyContent = 'spaceAround'
    this.container.style.alignItems = 'center'
    List.forEach(((list,i)=>{
      let container = this.container.childNodes[i]
      let scale
      switch(List.length){
        case 2:
          container.style.height = "80%"
          container.style.width = "40%"
          container.style.margin = "5%"
          scale = 0.7
          break

        case 6:
          container.style.height = "40%"
          container.style.width = "27%"
          container.style.margin = "3%"
          scale = 0.3
          break
      }
    this.renderSingleCloud(list, List.length*scale, container)
    }))
  }

  componentDidMount() {
    this.renderSingleCloud(this.ci_freq[0], 1, this.container)
  }

  componentDidUpdate(){
    switch(this.state.value){
      case 0: //全本
        this.renderSingleCloud(this.ci_freq[0], 1, this.container)
        break

      case 1: //词风
        this.renderCLoud(this.ci_freq[1])
        break

      case 2: //年代
        this.renderCLoud(this.ci_freq[2])
        break
    }

  }

  render() {
    return (
      <div>
        <div
          className="ci-cloud"
          ref={ref => {
              this.container = ref;
          }}
          style={{
            width: this.props.width,
            height: this.props.height
          }}
        >
        </div> 
        <div 
          className="radio"
          style = {{
            position:'relative',
            top: '10px',
            left: '650px',
            fontFamily: 'W3',
            fontSize: '14px',
          }}> 
        <RadioGroup onChange={this.onRadioChange} value={this.state.value}>
          <Radio value={0}>全本&nbsp;&nbsp;</Radio>
          <Radio value={1}>按词风&nbsp;&nbsp;</Radio>
          <Radio value={2}>按年代</Radio>
        </RadioGroup>
        </div>    
      </div>
    );
  }
}
