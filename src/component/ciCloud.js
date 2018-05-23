import React from 'react';
import * as d3 from 'd3'
import Js2WordCloud from 'js2wordcloud'
import shape from '../../res/shape.png'
export default class CiCloud extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static defaultProps = {
    width: 1000,
    height: 625,
  }

  componentDidMount() {
    let ColorRuler = [
      '#979896','#777876','#585957','#3b3c3b','#202120','#000000'
    ]
    let list = this.props.list
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
        fontFamily: '隶书',
        minFontSize: 30, 
        maxFontSize: 130,    
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

    let wc = new Js2WordCloud(this.container)
    wc.showLoading({
        backgroundColor: '#fff',
        text: '载入中……',
        effect: 'spin'
    })
    setTimeout(function() {
        wc.hideLoading()
        wc.setOption(options)
    }, 200)
    window.onresize = ()=>{
        wc.resize()
    }
  }

  render() {
    return (
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
    );
  }
}
