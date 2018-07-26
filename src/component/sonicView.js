import React from 'react';
import * as d3 from 'd3';
import { Select } from 'antd';
import data_for_sonic_view from '../../data/data_for_sonic_view.json';
import AUDIOS from '../../data/audio_for_ci.json';

import AiHong from '../../res/imageSVG/哀鸿.svg';
import Chan from '../../res/imageSVG/蝉.svg';
import DengGao from '../../res/imageSVG/登高.svg';
import DuJuan from '../../res/imageSVG/杜鹃.svg';
import JinLing from '../../res/imageSVG/金陵.svg';
import Jiu from '../../res/imageSVG/酒.svg';
import Ju from '../../res/imageSVG/菊.svg';
import Lan from '../../res/imageSVG/兰.svg';
import Liu from '../../res/imageSVG/柳.svg';
import LiuChao from '../../res/imageSVG/六朝.svg';
import Lou from '../../res/imageSVG/楼.svg';
import Ma from '../../res/imageSVG/马.svg';
import Mei from '../../res/imageSVG/梅.svg';
import QiangDi from '../../res/imageSVG/羌笛.svg';
import QinSe from '../../res/imageSVG/琴瑟.svg';
import QingNiao from '../../res/imageSVG/青鸟.svg';
import ShaOu from '../../res/imageSVG/沙鸥.svg';
import Shui from '../../res/imageSVG/水.svg';
import Song from '../../res/imageSVG/松.svg';
import WuTong from '../../res/imageSVG/梧桐.svg';
import XiaoXiang from '../../res/imageSVG/潇湘.svg';
import Xue from '../../res/imageSVG/雪.svg';
import Yue from '../../res/imageSVG/月.svg';
import Yun from '../../res/imageSVG/云.svg';
import ChangTing from '../../res/imageSVG/长亭.svg';
import Zhou from '../../res/imageSVG/舟.svg';
import Zhu from '../../res/imageSVG/竹.svg';

const Option = Select.Option;
const COLORS = {"喜":"rgb(247,78,112)", "乐":"rgb(253,206,62)", "思":"rgb(60,182,117)", "忧":"#00f5ff", "悲":"rgb(81,100,182)", "惧":"#ffffff", "怒":"rgb(126,99,94)"};
const CIPAIS = ["鹧鸪天","苏幕遮","清平乐","浣溪沙","蝶恋花"];
const TRANSFORMS = {
    "水": "translate(0,27) scale(1.2)",
    "马": "translate(0,10)",
    "酒": "translate(0,3) scale(1.5)",
    "云": "scale(1.2)",
    "楼": "translate(0,-8) scale(1.2)",
    "竹": "translate(0,-8) scale(1.2)",
    "梅": "translate(0,-8) scale(1.2)",
    "雪": "translate(0,2) scale(1.5)",
    "月": "translate(0,-5) scale(0.8)",
    "兰": "translate(0,9) scale(2)",
    "潇湘": "translate(0,9) scale(2)",
    "长亭": "translate(0,15) scale(1.5)",
    "梧桐": "scale(1.5)",
    "蝉": "translate(0,26) scale(0.5)",
    "云": "translate(0,-3) scale(1.1)",
    "杜鹃": "translate(0,23)",
}

export default class SonicView extends React.Component {
	constructor() {
        super();
        let datac = CIPAIS
		this.state = {
            selectedCipai: 0,
            data: data_for_sonic_view[datac[0]],
            dataOfCipai: datac,
        };
	}

	static defaultProps = {
		width: 1200,
		height: 1000,
		text: ''
    }

    componentDidMount() {
        this.paintAll();
    }
    
    componentDidUpdate() {
        this.paintAll();
    }
    
    paintAll() {
        //d3.select(this.container).selectAll("svg > *").remove();
        d3.select(this.container).select("#sv_svg").remove();
        d3.select(this.container)
            .append('svg')
            .attr('width', this.props.width)
            .attr('height', this.props.height)
            .attr('id', "sv_svg");

        this.state.data.map((d, i) => this.paintLine(d,i));
        //d3.select(this.container).select("#sv_svg").attr("transform", "translate(200,0)")
    }

    paintLine(data, index) {
        const setState = this.setState.bind(this);
        let svg = d3.select(this.container).select("#sv_svg");
        let tl = (this.props.width-400)/data["text"].length;
        let idle_x = 20>tl ? tl : 20, idle_y=350, line_height = 8, base_y = index*idle_y+400;
        let base_x = 80;
        let mp3dom = document.getElementById("sv_wav");
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
          .attr("stdDeviation","5")
          .attr("result","coloredBlur");
    
        let feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in","coloredBlur");
        feMerge.append("feMergeNode").attr("in","SourceGraphic");

        const overFunc = (d,j) => {
            console.log("over")
            clearTimeout(this.audio_pause)
            d3.select('#rythm_line').remove()
            d3.select('#rythm_text').remove()

            let a = AUDIOS[this.state.dataOfCipai[this.state.selectedCipai]][data["qupai"]]
            let pz = data["PZlist"]
            let time = data["TIME"]
            let wav = d3.select("#sv_wav")
            let pos = 0, sep_1 = 0
            pz.slice(0,j).forEach((d,k)=>{
                if(d == -1){
                    pos++
                    sep_1 = k+1
                }
            })
            let sep_2 = pz.slice(j,pz.length-1).indexOf(-1) + j
            wav.attr("src", () => {
                return "./"+a;
            })
            mp3dom.currentTime = time[pos]
            mp3dom.play()
            this.audio_pause = setTimeout(()=>{
                mp3dom.pause()
                d3.select('#rythm_line').remove()
                d3.select('#rythm_text').remove()

            }, (time[pos+1] - time[pos]) *　1000)
            d3.select(this.container).select("#sv_svg")
            .append("rect")
            .attr("id","rythm_line")
            .attr("width",15)
            .attr("height",line_height)
            .attr("fill","orange")
            .attr("x",sep_1*idle_x+base_x)
            .attr("y",base_y)
            .style("filter","url(#glow)")
            .transition(
                d3.transition()
                .duration((time[pos+1] - time[pos]) *　1000)
            )
            .attr("x",sep_2*idle_x+base_x - 15)
            .attr("y",base_y)

            console.log(data["text"].slice(2,data["text"].length-1).indexOf('/')+2 , j)//.indexOf('/'), j)
            let temp = data["text"].slice(2,data["text"].length-1).indexOf('/')+2
            let huanhang = temp <= j
            d3.select(this.container).select("#sv_svg")
            .append("rect")
            .attr("id","rythm_text")
            .attr("width",20)
            .attr("height",20)
            .attr("fill","orange")
            .attr("opacity", 0.5)
            .attr("x",huanhang ? (sep_1-temp)*20+base_x : sep_1*20+base_x)
            .attr("y",huanhang ? base_y - 166 : base_y - 188)
            .style("filter","url(#glow)")
            .transition(
                d3.transition()
                .duration((time[pos+1] - time[pos]) *　1000)
            )
            .attr("x",huanhang ? (sep_2-temp - 1)*20+base_x : (sep_2-1)*20+base_x)
            .attr("y",huanhang ? base_y - 166 : base_y - 188)

        };
        const outFunc = (d,j) => {
            // mp3dom.pause();
            // clearTimeout(this.audio_pause)
            // d3.select('#rythm_line').remove()
        };

        let text_ci = [];
        let temp = data["text"].substr(1);
        while(temp.indexOf("/")!=-1){
            let k = temp.indexOf("/");
            text_ci.push(temp.substr(0, k));
            temp = temp.substr(k+1);
        }
        svg.append("text")
            .attr("x", function(d){
                return base_x;
            })
            .attr("y", function(d){
                return base_y - 200;
            })
            .attr("font-size", 20)
            .text(this.state.dataOfCipai[this.state.selectedCipai]+(" ("+data["qupai"]+")"));
        svg.selectAll("._sonicviewtext"+index)
            .data(text_ci)
            .enter()
            .append("text")
            .attr("x", function(d){
                return base_x;
            })
            .attr("y", function(d,j){
                return base_y - 200 + 20*(j+1) + 10;
            })
            .attr("font-size", 20)
            .attr("font-family", "W9")
            .text((d) => d);
                 
        let keysetQX = [];
        for(let key in data["QXlist"]){
            keysetQX.push(parseInt(key));
        }
        svg.selectAll("._sonicviewcircle"+index)
            .data(keysetQX)
            .enter()
            .append("circle")
            .attr("cx",function(d,j){
                return d*idle_x+base_x;
            })
            .attr("cy",function(d,j){
                return base_y-15;
            })
            .attr("r",function(d,j){
                return 40;
            })
            .attr("fill",function(d,j){
                return COLORS[data["QXlist"][d.toString()]];
            })
            .attr("opacity",function(d,j){
                return 0.6;
            })
            // .on("mouseover",overFunc)
            // .on("mouseout",outFunc);
        
        let keysetYX = [];
        for(let key in data["YXlist"]){
            keysetYX.push(parseInt(key));
        }
        keysetYX.map((d, i) => {
            let ele = d3.select("#_sonicviewimageinner"+index+i);
            let YX = data["YXlist"][d.toString()];
            ele.attr("transform", () => "translate(" + (d*idle_x-50-i*100+base_x+idle_x/2) + "," +(base_y-(index+1)*(100)-index*(4)+1) + ")" + (YX in TRANSFORMS ?  " "+TRANSFORMS[YX] : "") )
            // .on("mouseover",overFunc)
            // .on("mouseout",outFunc);
        })

        svg.selectAll("._sonicviewline"+index)
        .data(data["PZlist"])
        .enter()
        .append("rect")
        .attr("width",function(d,j){
            if(d==1||d==2)
                return idle_x;
            else if(d==0)
                return idle_x*0.8;
            else
                return 0;
        })
        .attr("height",function(d,j){
            return line_height;
        })
        .attr("x",function(d,j){
             return j*idle_x+base_x;
        })
        .attr("y",function(d,j){
             return base_y;
        })
        .attr("fill",function(d,j){
            return '#000';
        })
        .on("mouseover",overFunc)
        // .on("mouseout",outFunc)
    }

    getImage(YX, id, key){
        switch(YX){
            case "哀鸿": return <AiHong width={100} height={100} id={id} key={key} />;
            case "蝉": return <Chan width={100} height={100} id={id} key={key} />;
            case "登高": return <DengGao width={100} height={100} id={id} key={key} />;
            case "杜鹃": return <DuJuan width={100} height={100} id={id} key={key} />;
            case "金陵": return <JinLing width={100} height={100} id={id} key={key} />;
            case "酒": return <Jiu width={100} height={100} id={id} key={key} />;
            case "菊": return <Ju width={100} height={100} id={id} key={key} />;
            case "兰": return <Lan width={100} height={100} id={id} key={key} />;
            case "柳": return <Liu width={100} height={100} id={id} key={key} />;
            case "六朝": return <LiuChao width={100} height={100} id={id} key={key} />;
            case "楼": return <Lou width={100} height={100} id={id} key={key} />;
            case "马": return <Ma width={100} height={100} id={id} key={key} />;
            case "梅": return <Mei width={100} height={100} id={id} key={key} />;
            case "羌笛": return <QiangDi width={100} height={100} id={id} key={key} />;
            case "琴瑟": return <QinSe width={100} height={100} id={id} key={key} />;
            case "青鸟": return <QingNiao width={100} height={100} id={id} key={key} />;
            case "沙鸥": return <ShaOu width={100} height={100} id={id} key={key} />;
            case "水": return <Shui width={100} height={100} id={id} key={key} />;
            case "松": return <Song width={100} height={100} id={id} key={key} />;
            case "梧桐": return <WuTong width={100} height={100} id={id} key={key} />;
            case "潇湘": return <XiaoXiang width={100} height={100} id={id} key={key} />;
            case "雪": return <Xue width={100} height={100} id={id} key={key} />;
            case "月": return <Yue width={100} height={100} id={id} key={key} />;
            case "云": return <Yun width={100} height={100} id={id} key={key} />;
            case "长亭": return <ChangTing width={100} height={100} id={id} key={key} />;
            case "舟": return <Zhou width={100} height={100} id={id} key={key} />;
            case "竹": return <Zhu width={100} height={100} id={id} key={key} />;
        }
    }

	render() {   
		return (
            <div 
                style={{
                    "opacity": 0.9, 
                    "zIndex":10, 
                    "position":'relative',
                    "width":this.props.width, 
                    "height":this.props.height,                   
                }}
                ref={ref => {this.container = ref;}}
            >
                <Select
                    showSearch
                    style={{
                        "position":'relative',
                        "width": '100px',
                        "top":'10px',
                        "left":this.props.width-460
                    }}
                    placeholder="选择词牌"
                    optionFilterProp="children"
                    onChange={(value) => {this.setState({
                        selectedCipai:value, 
                        data:data_for_sonic_view[this.state.dataOfCipai[value]]
                    })}}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.state.dataOfCipai.map((d, i) => {
                        return <Option value={i} key={i}>{d}</Option>;
                    })}
                </Select>
                      
                <audio id="sv_wav" src={""} preload="preload">
                    Your browser does not support the audio element.
                </audio>
                <div 
                    id="sv_svgDiv"
                    style={{
                        "position":'absolute',
                        "opacity": 0.75, 
                    }}
                >
                    {this.state.data.map((d0, i0) => {
                        let data = [];
                        for(let key in d0["YXlist"]){
                            data.push(d0["YXlist"][key]);
                        }
                        let res = (<div key={i0}>
                                {data.map((YX, j) => {
                                    return this.getImage(YX, "_sonicviewimageinner"+i0+j, j);
                                })}</div>)
                        return res;
                    })}   
                </div>         
			</div>
		);
	}
}
