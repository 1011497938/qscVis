import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery';

import story_line_info from '../../data/storyline/story_line_info.json';
import sStore from 'store/sstore';
import { observer } from "mobx-react";

const startAngle = -120
const AngleTrans = 2*Math.PI/360

const _totalAngle = 300, _radius = 1150
const poetArray = [
    '林逋', '柳永', '晏殊', '欧阳修',  '晏几道',  '苏轼',  '秦观',  '李清照',  '陆游',  '范成大',  '杨万里',  
    '尤袤',  '辛弃疾',  '吴文英',  '刘辰翁',  '文天祥'
]
const poetOfs = {
    '林逋':[0,0], '柳永':[0,0], '晏殊':[-70,100], '欧阳修':[0,0],  '晏几道':[100,100],  '苏轼':[-25,100],  '秦观':[50,200],  
    '李清照':[-100,350],  '陆游':[200,500],  '范成大':[0,100],  '杨万里':[0,100],  
    '尤袤':[0,0],  '辛弃疾':[-300,0],  '吴文英':[0,0],  '刘辰翁':[0,0],  '文天祥':[0,0]
}   //left,top

@observer
export default class SurrondMap extends React.Component{
    constructor(){
        super()
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
    

    componentDidMount(){
        const width = 3240
        const height = 3240
        const center = [1525,1475]

        var svg = d3.select(this.container)
        .append("svg")
        .attr("id", "mapsurrond_svg")
        .attr('width', width)
        .attr('height', height)

        var lineGenerator = d3.line()
                        .x((d) =>{
                                return d[0]
                            })
                        .y((d) =>{
                                return d[1];
                        });
        
        //后面的图需要处理
        var year =  [960, 0, 1000, 0, 1040, 0, 1080, 0, 1120, 0, 1160, 0, 1200, 0, 1240, 0, 1280]
        year.forEach((element, index)=>{
            const ofsAngle = (_totalAngle+40)/year.length
            const ofsX = _radius*Math.cos((index*ofsAngle+startAngle-10)*AngleTrans),
                  ofsY = _radius*Math.sin((index*ofsAngle+startAngle-10)*AngleTrans)
            let data = [
                [center[0]+ofsX*0.8, 
                center[1]+ofsY*0.8]
                ,
                [center[0]+ofsX*1.2, 
                center[1]+ofsY*1.2]
            ]

            svg.append('path')
            .attr('stroke', '#c6cbcc')
            .attr('stroke-width', '3')
            .attr('fill', 'none')
            .attr('d', lineGenerator(data));

            let rotate = (index*ofsAngle+startAngle+90)>90?(index*ofsAngle+startAngle-90-10):(index*ofsAngle+startAngle+90-10)
            svg.append('text')
            .attr('class', 'text_year')
            .attr('transform', 'translate(' + (center[0]+ofsX*1.15)+ ',' + (center[1]+ofsY*1.15) + ') rotate('+ rotate +')')
            .attr('fill','black')
            .attr('font-size', '50px')
            .text(element===0?'':element)
        })
        // 连线
        const note = [
            { name:"梅妻鹤子", pos:[550,460], link:['林逋']}, 
            { name:"晏欧", pos:[1650,0], link:['晏殊', '欧阳修']}, 
            { name:"二晏", pos:[2300,100], link:['晏殊', '晏几道']}, 
            { name:"苏辛", pos:[2900,2100], link:['苏轼', '辛弃疾']}, 
            { name:"中兴四大诗人", pos:[2300,2550], link:['尤袤','杨万里','范成大','陆游']}, 
            { name:"济南二安", pos:[1050,2600], link:['李清照', '辛弃疾']} 
        ]  //left, top

        note.forEach((e,i)=>{
            console.log(e)
            let one_note = $('<div>' + e.name + '</div>')
            one_note.attr('id','text-map-note' + e.name);
            one_note.css({
                'font-size': '50px',
                'background-color': '#72726e',
                'color': 'white',
                'margin': '30px',
                'width': '250px',
                'height' : '250px',
                'position': 'absolute',
                'border-radius' : '50%',
                'text-align' : 'center',
                'opacity' : '0.9',
                'left' : e.pos[0] + 'px',
                'top' : e.pos[1] + 'px',
                'line-height' : '250px',
                'z-index' : '34'
            })
            if (e.name==='中兴四大诗人') {
                one_note.css({
                    'width' : '320px',
                    'height' : '320px',
                    'line-height': '320px'
                })
            }
            one_note.on('mouseenter', (event)=>{
                console.log(e.link)
                e.link.forEach((poet,i)=>{
                    $('#mapsurrond-' + poet).css('opacity', '1')
                })
                event.preventDefault()
            }).on('mouseleave', (event)=>{
                console.log(e.link)
                e.link.forEach((poet,i)=>{
                    $('#mapsurrond-' + poet).css('opacity', '0.6')
                })
                event.preventDefault()
            })
            $(this.container).append(one_note)
        })
    }
    render(){
        var loadImg = () => {
            var poetList = []
            poetArray.forEach(function(e,i){
                // console.log('../../res/poet/' + (i+1) + ' ' + e + '.png')
                const ofsAngle = _totalAngle/poetArray.length
                let thisStyle = {
                    position:'absolute',
                    top: (-1178+_radius*Math.sin((i*ofsAngle+startAngle)*AngleTrans)+poetOfs[e][1])+'px',
                    left: (1316+ _radius*Math.cos((i*ofsAngle+startAngle)*AngleTrans)+poetOfs[e][0]) +'px',
                    zIndex: 99,
                    opacity: 0.6
                }
                poetList.push(
                    <img    src={require('../../res/poet/' + e + '.png')}  
                            style={thisStyle} height={e==='晏殊'||e==='晏几道'?360:500} 
                            id={'mapsurrond-' + e}  
                            key={'mapsurrond-' + e} 
                            alt={e} 
                            title={e}
                            onMouseEnter={(event)=> {
                                    // console.log(e)
                                    story_line_info.forEach((element, i) => {
                                        if (element["姓名"]===e) {
                                            sStore.setAuthor(element)
                                        }
                                    })
                                    $('#mapsurrond-' + e).css('opacity', '1')
                                    event.preventDefault()
                                }
                            }
                            onMouseLeave={(event)=>{
                                $('#mapsurrond-' + e).css('opacity', '0.6')
                                event.preventDefault()
                            }}
                    /> )
            })
            return poetList
        }
        return (
            <div style={{position:'absolute', top:'1821px'}}>
                <div 
                ref = {
                    ref => {
                        this.container = ref;
                    }
                }
                style={{top:'-2380px', position: 'absolute'}}
                />
                <img src={require('../../res/poet/竹子.png')}  style={{position:'absolute', top:'-902px', left:'408px'}} height={400} id='map-bamboo' key='map-bamboo' alt='竹子' title='竹子'/> 
                <img src={require('../../res/poet/山脉.png')}  style={{position:'absolute', top:'32px', left:'1050px'}} width={1900} id='map-moutain' key='map-mountain' alt='山脉' title='山脉'/> 
                <img src={require('../../res/poet/图例.png')}  style={{position:'absolute', top:'-700px', left:'3400px'}} width={400} height={200} id='map-sample' key='map-sample' alt='图例' title='图例'/>
                <img src={require('../../res/poet/circle.png')}  style={{position:'absolute', top:'-1860px', left:'554px',zIndex:'1'}} width={_radius*2-400} id='map-circle' key='map-circle'/>  
                {loadImg()}
            </div>
        )
    }
}