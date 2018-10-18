import React from 'react';
import * as d3 from 'd3';
import cipai_poet from '../../data/cipai.json';
import famous_poet from '../../data/factions_for_authors.json'
import $ from 'jquery';

export default class CiPaiBarChart extends React.Component{
    constructor(){
        super()
        this.state = {
            width : 1550,
            height : 800,
        }
    }
    data = []
    componentDidMount(){
        // console.log(cipai_poet.groups)
        var cipai_poetArray = cipai_poet.groups
        var data = this.data
        var poets = [], cipai = new Set([]), cipai_index = {}
        var poets_class = {}, poet_weight = {}
        for(let i in cipai_poetArray){
            let poetArray = cipai_poetArray[i].groups
            let cipaiName = cipai_poetArray[i].label
            for(let j in poetArray){
                let poet= poetArray[j]
                let poetName = poet.label
                data[poetName] = data[poetName] ? data[poetName] :[]
                data[poetName][cipaiName] = poet.weight
            }
        }

        // console.log(famous_poet)
        let maxWeight = 0, minWeight = 10000
        var tempData = [], upLimit = 100
        for(let poet in data){
            let totoalWeight = 0
            let array = data[poet]
            for(let cipai in array){
                totoalWeight += array[cipai]
            }
            if(totoalWeight>=upLimit){
                var contains = ()=>{
                    let flag = false
                    famous_poet.forEach((e)=>{
                        if (e.author===poet) {
                            poets_class[poet] = e.faction
                            return flag = true
                        }
                    })
                    return flag
                }
                if (contains()) {
                    tempData[poet] = data[poet]
                    poet_weight[poet] = totoalWeight
                    maxWeight = maxWeight < totoalWeight? totoalWeight : maxWeight
                    minWeight = minWeight > totoalWeight? totoalWeight: minWeight
                    for(let index in array){
                        cipai.add(index)
                    }            
                }
            }
        }
        
        data = tempData
        // 区分豪放婉约
        var haoPoets = []
        var wanPoets = []
        for(let poet in data){
            poets.push(poet)
            if (poets_class[poet]==='豪放派') {
                haoPoets.push(poet)
            }else{
                wanPoets.push(poet)
            }
        }
        haoPoets = haoPoets.sort((a,b) => {
            if (poet_weight[a] < poet_weight[b]) {
                return -1;
            } else if (poet_weight[a] > poet_weight[b]) {
                return 1;
            } else {
                return 0;
            }
        })
        wanPoets = wanPoets.sort((a,b) => {
            if (poet_weight[a] < poet_weight[b]) {
                return 1;
            } else if (poet_weight[a] > poet_weight[b]) {
                return -1;
            } else {
                return 0;
            }
        })
        poets = [...haoPoets, ' ', ...wanPoets]


        // console.log(poets)
        var tempCiPai = []
        cipai.forEach((element)=>{
            tempCiPai.push(element)
        })
        cipai = tempCiPai

        cipai = cipai.sort((a,b) =>{
            let aNum = 0;
            let bNum = 0;
            for(let i in cipai_poetArray){
                if (cipai_poetArray[i].label===a) {               
                    aNum = cipai_poetArray[i].weight
                }
                if (cipai_poetArray[i].label===b) {
                    bNum = cipai_poetArray[i].weight
                }
            }
            // console.log(a, b, aNum, bNum)
            if (aNum < bNum) {
                return 1;
            } else if (aNum > bNum) {
                return -1;
            } else {
                return 0;
            }
        })
        cipai = cipai.slice(0,30)

        var count = 0
        cipai.forEach((element)=>{
            cipai_index[element] = count++      
        })

        var width = this.state.width
        var height = this.state.height

        var svg = d3.select(this.container)
        .append("svg")
        .attr("id", "ciPaiBarChart_svg")
        .attr('width', width)
        .attr('height', height)

        var palegreen = d3.rgb(248, 200, 190);	//桃粉色
        var darkgreen = d3.rgb(202, 72, 109);		//深桃红
        var color = d3.interpolate(darkgreen, palegreen);		//颜色插值函数
        var colorLinear = d3.scaleLinear()
		.domain([0, count])
        .range([0, 1]);
        
        // console.log(color(linear(40)))

        let startX = 20, 
            startY = height-150
        let ofsX = (width - startX)/poets.length
        var scaleY = d3.scaleLinear()
        var fontSize = 30
        scaleY.domain([0,maxWeight*0.8])
              .range([0, startY-10])
        
        svg.selectAll(".cipai_poet_name")
           .data(poets)
           .enter()
           .append('text')
           .attr('class', 'cipai_poet_name')
           .attr("x",(d,i) => {return startX + ofsX*i} )
           .attr("y",startY)
           .attr('fill','black')
           .attr('font-size', fontSize + 'px')
           .attr('style', "writing-mode:tb-rl")
           .text((d)=>{return d})

        var indexX = 0
        var posY = startY-5
        for(let poet in poets){
            poet = poets[poet]
            // console.log(poet, poets)
            let array = data[poet]
            posY = startY-5
            cipai.forEach((element)=>{
                if(array && array[element]){
                    // console.log(cipai, cipai_index[cipai], colorLinear(cipai_index[cipai]))
                    // console.log(element, array[element])
                    svg.append('rect')
                    .attr('class', 'rect_cipai_' + element + cipai_index[element] + "_" + poet)
                    .attr("width", 20)
                    .attr("height", scaleY(array[element]))
                    .attr("x", startX+ofsX*indexX-fontSize/2+5)
                    .attr("y", posY - scaleY(array[element]))
                    .attr("fill",color(colorLinear(cipai_index[element])))
                    .attr("alt", element)
                    posY -= scaleY(array[element]) + 1      
                }       
            })
            indexX++
        }

        //坐标轴
       var axis = d3.axisRight(scaleY.range([startY-10,0])).ticks(2);
       var gAxis = svg.append("g")
               .attr("transform", "translate(900, 1)")
               .attr('class', 'axisBar');
       // 绘制坐标轴
       gAxis.call(axis)
            .attr('font-size', '30px')


        //图注
        var cipaiIndex = 0, noteStartX = 1400, noteStartY=330, noteX, noteY, noteTotalHeight=350
        const showNum = 10
        for (let i = 0; i < 2; i++) {
            noteX = noteStartX  - i * 25
            noteY = noteStartY
            for (let j = 0; j < showNum; j++) {
                const element = cipai[cipaiIndex];
                const cipai_height = (noteTotalHeight-showNum)/showNum

                svg.append('rect')
                .attr('class', 'rect_cipai_note')
                .attr("width", 20)
                .attr("height", cipai_height)
                .attr("x", noteX)
                .attr("y", noteY)
                .attr("fill",color(colorLinear(cipai_index[element])))

                svg.append('text')
                .attr('class', 'text_cipai_note')
                .attr("x", noteX + (i==0?70:-45) -40 )
                .attr("y", noteY+27)
                .attr('fill','black')
                .attr('font-size', '25px')
                .attr('style', "writing-mode: rl")
                .text(element)

                cipaiIndex += 1
                noteY -= cipai_height + 2
            }
        }
            
    }
    render(){
        return(
        <div ref = {
                ref => {
                    this.container = ref;
                }
            }
            style = {
                {
                    position: "absolute"
                }
            }>
            <div style={{top: '485px', left: '-60px', backgroundColor:'black', color:'white', width: '53px', position: 'absolute', padding: '10px'}}>豪放派</div>
            <div style={{top: '485px', right: '-50px', backgroundColor:'black', color:'white', width: '53px', position: 'absolute', padding: '10px'}}>婉约派</div>
        </div>
        )
    }
}

