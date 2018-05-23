import React, {Component} from 'react';
import * as d3 from 'd3';
import famous_artist_image from '../../data/famous_artist_image.json';
import famous_image_emotion from '../../data/famous_image_emotion.json';

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
import Cao from '../../res/imageSVG/草.svg';

export default class ObjectLine extends Component {
    phoneticize = {
        "哀鸿" : "AiHong",
        "蝉" : "Chan",
        "登高" : "DengGao",
        "杜鹃" : "DuJuan",
        "金陵" : "JinLing",
        "酒" : "Jiu",
        "菊" : "Ju",
        "兰" : "Lan",
        "柳" : "Liu",
        "六朝" : "LiuChao",
        "楼" : "Lou",
        "马" : "Ma",
        "梅" : "Mei",
        "羌笛" : "QiangDi",
        "琴瑟" : "QinSe",
        "青鸟" : "QingNiao",
        "沙鸥" : "ShaOu",
        "水" : "Shui",
        "松" : "Song",
        "梧桐" : "WuTong",
        "潇湘" : "XiaoXiang",
        "雪" : "Xue",
        "月" : "Yue",
        "云" : "Yun",
        "长亭" : "ChangTing",
        "船" : "Zhou",
        "竹" : "Zhu",
        "草" : "Cao"
    }
    emotionColor = {
        "悲" : "Black",
        "思" : "Blue",
        "喜" : "Red",
        "乐" : "Green",
        "怒" : "White",
        "忧" : "steelblue",
        "惧" : "Gray"
    }
    ciPosY = {
        "哀鸿" : -40,
        "蝉" : -250,
        "登高" : -250,
        "杜鹃" : -150,
        "金陵" : -50,
        "酒" : -500,
        "菊" : -150,
        "兰" : -200,
        "柳" : -100,
        "六朝" : -40,
        "楼" : -400,
        "马" : -40,
        "梅" : -300,
        "羌笛" : -40,
        "琴瑟" : -40,
        "青鸟" : -350,
        "沙鸥" : -40,
        "水" : -200,
        "松" : -300,
        "梧桐" : -550,
        "潇湘" : -30,
        "雪" : -200,
        "月" : -40,
        "云" : -400,
        "长亭" : -300,
        "船" : -350,
        "竹" : -40,
        "草" : -100
    }
    poetArray = []
    poetAndImage = []
    ciArray = new Set([])
    data = famous_image_emotion

    constructor(props){
        super(props)
        this.state = {
            width : 1850,
            height : 800,
            selectedPoet : "1",
            selectedLink : ["", ""]
        }

        var poetArray = this.poetArray
        var poetAndImage = this.poetAndImage
        var ciArray = this.ciArray;
        var data = this.data

        for (let poetName in data) {
            poetArray.push(poetName)
            let ciFeq = []
            for(let ci in data[poetName]){
                let totalFrq = 0
                for(let imageFreq in data[poetName][ci])
                    totalFrq += data[poetName][ci][imageFreq]
                ciFeq.push({"name": poetName, "ciFreq":[ci, totalFrq]  })
                ciArray.add(ci)                    
            }
            poetAndImage.push(ciFeq)
        }

        for (let i = 0; i < poetAndImage.length; i++) {
            let poetName = poetAndImage[i][0]["name"]

            ciArray.forEach(function (element, sameElement, set) {
                let notHas = true
                for (let k = 0; k < poetAndImage[i].length; k++) {
                    if (poetAndImage[i][k]["ciFreq"][0] == element) {
                        notHas = false
                        break
                    } 
                }
                if (notHas) {
                    poetAndImage[i].push({"name":poetName, "ciFreq":[element, 0] })
                }  
            });
        }

    }

    link(poetName, imageName, g){
        var emotionColor = this.emotionColor
        var data = this.data
        let imageNode = g.selectAll(".rect_emotion_" + imageName)

        let emotions = []
        let thisImage = data[poetName][imageName]
        for( let Emotion in thisImage){
            emotions.push(Emotion)
        }

        let max, middle, min
        if (thisImage[emotions[0]]>=thisImage[emotions[1]] && thisImage[emotions[0]]>=thisImage[emotions[2]]) {
            max = emotions[0]
            if (thisImage[emotions[1]]>thisImage[emotions[2]]){
                middle = emotions[1]
                min = emotions[2]
            }else{
                middle = emotions[2]
                min = emotions[1]
            }
        }else if (thisImage[emotions[1]]>=thisImage[emotions[0]] && thisImage[emotions[1]]>=thisImage[emotions[2]]) {
            max = emotions[1]
            if (thisImage[emotions[0]]>thisImage[emotions[2]]){
                middle = emotions[0]
                min = emotions[2]
            }else{
                middle = emotions[2]
                min = emotions[0]
            }
        }else {
            max = emotions[2]
            if (thisImage[emotions[1]]>thisImage[emotions[0]]){
                middle = emotions[0]
                min = emotions[1]
            }else{
                middle = emotions[1]
                min = emotions[0]
            }
        }

        imageNode.filter(function(d, i) { return i == 0; })
                 .attr("fill", emotionColor[max])
                 // .transition().duration(100)
                 .style("opacity","1") 

        imageNode.filter(function(d, i) { return i == 1; })
                 .attr("fill", emotionColor[middle])
                 // .transition().duration(100)
                 .style("opacity","1") 
                 
        imageNode.filter(function(d, i) { return i == 2; })
                 .attr("fill", emotionColor[min])
                 // .transition().duration(100)
                 .style("opacity","1") 

        var node = g.select("#g_" + poetName).selectAll(".l-" + imageName)
        node
            // .transition().duration(100)
            .style("stroke-opacity","0.8")
            .style("stroke", emotionColor[max])   
    }
    reset(){
        var g = d3.select("#objectLine_g");
        g.selectAll(".l")
         .style("stroke-opacity","0.05")
         .style("stroke","#555")

        g.selectAll(".rect_emotion")
         .style("opacity","0") 
    }
    componentDidUpdate(){
        console.log("update")
        var selectedPoet = this.state.selectedPoet
        var poetArray = this.poetArray
        var data = this.data
        var phoneticize = this.phoneticize
        // console.log(selectedPoet)
        var g = d3.select("#objectLine_g");
        if (selectedPoet=="") {
            // this.reset()
        }else{
            this.reset()
            for( let image in data[selectedPoet]){
                this.link(selectedPoet, image, g)
            }
        }

        var selectedLink = this.state.selectedLink
        if (selectedLink[0] == "") {
            // this.reset()
         }else{
            this.reset()
            this.link(selectedLink[0], selectedLink[1], g)
         }
    }

    componentDidMount(){
        console.log("mount")
        var width = this.state.width,
            height = this.state.height

        var poetArray = this.poetArray
        var poetAndImage = this.poetAndImage
        var ciArray = this.ciArray;
        var data = this.data

        var ciPosY = this.ciPosY 
        var emotionColor = this.emotionColor
        var phoneticize = this.phoneticize


        // 绘制
        var svg = d3.select("#poet-link-image")
                    .append("svg")
                    .attr('width', width)
                    .attr('height', height);
        var g = svg.append("g").attr("transform", "translate(80,40)").attr('id', 'objectLine_g');;

        //定义数据转换函数  
        var tree = d3.tree()  
                     .size([width - 160, height-100]);

        //设置簇布局
        var stratify = d3.stratify()
                         .id(function (d) {return d.ciFreq;})
                         .parentId(function(d){ return d.name;});

        for (let i = 0; i < poetAndImage.length; i++) {
            let poet =  poetAndImage[i]
            if (poet.length==0) 
                continue

            poet.push({"name":"", "ciFreq": poet[0]["name"] })
            let rootNode = stratify(poet).sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });
 
            let links =  tree(rootNode).links()
            for (var j = 0; j < links.length; j++) {
                links[j].source.x -= poetAndImage.length * 4/3
                links[j].source.x += i * 2 * 4/3

                let targetName = links[j].target.id.split(",")[0]
                links[j].target.y += ciPosY[targetName]

                //放置svg
                let pName = phoneticize[targetName]
                if (i==0) {
                    let thisSVG = document.getElementById("objectLine_" + pName)
                    thisSVG.style.zIndex = 1
                    thisSVG.style.top = links[j].target.y + 20
                    thisSVG.style.left = links[j].target.x + 35                   
                }
            }

            let link = g.append('g')
                        .attr('id', 'g_' + poet[0]["name"])
                        .selectAll(".link")
                        .data(links)
                        .enter()
                        .append("path")
                        .style("fill","none")
                        .attr('class',  function(d){
                                            return "l-" + poet[0]["name"] + " l-" + d.target.id.split(",")[0] + " l"
                                        })
                        .style("stroke","#555")
                        .style("stroke-opacity","0.05")
                        .style("transition-property","stroke-opacity")
                        .style("transition-duration","0.3s")
                        .style("stroke-width", function(d){  
                                                    let width = d.target.data.ciFreq[1]/15  
                                                    if (width==0) 
                                                        return "0px"
                                                    else if (width<1)
                                                        return "1px"
                                                    else
                                                        return width<18?width:18 + "px"
                                                } 
                              )
                        .attr("d", d3.linkVertical()
                                     .x(function(d) {  return d.x; })
                                     .y(function(d) {  return d.y; })
                             )
                        .on("mouseover", function(d, i){
                            // this.style.strokeOpacity = "0.8"
                            // console.log(d.source.id, d.target.id.split(",")[0])
                            thisNode.setState({selectedLink : [d.source.id, d.target.id.split(",")[0]]})
                        })
                        .on("mouseout", function(d, i){
                            thisNode.setState({selectedLink : ["", ""]})
                        })

            var node = g.selectAll(".node")
                        .data(rootNode.descendants())
                        .enter().append("g")
                        .style("font", "10px sans-serif")
                        .style("fill", "#555")
                        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

            var thisNode = this
            node.append("circle")
                .attr('class', function(d){ return "c-" + d.id})
                .attr("r", function(d) { return d.children?10:0; })
                .on("mouseover", function(d, i){
                    let name = d.id.split(",")[0]
                    thisNode.setState({selectedPoet : name})
                })
                .on("mouseout", function(d, i){
                    thisNode.setState({selectedPoet : ""})
                })

            if (i==0) {
                node.append("rect")  
                    .attr('class', function(d){return 'rect_emotion_' + d.id.split(",")[0] + " rect_emotion" })
                    .attr("x", -60)
                    .attr("width", function(d){ return  d.children ?0:120; })  
                    .attr("height", 30)
                    .attr("fill", "#555")  
                    .style("opacity","0")
                node.append("rect")  
                    .attr('class', function(d){return 'rect_emotion_' + d.id.split(",")[0] + " rect_emotion" })
                    .attr("x", -60)
                    .attr("y", 35)
                    .attr("width", function(d){ return  d.children ?0:120; })  
                    .attr("height", 30)
                    .attr("fill", "#555") 
                    .style("opacity","0") 
                node.append("rect")  
                    .attr('class', function(d){return 'rect_emotion_' + d.id.split(",")[0] + " rect_emotion" })
                    .attr("x", -60)
                    .attr("y", 70)
                    .attr("width", function(d){ return  d.children ?0:120; })  
                    .attr("height", 30)
                    .attr("fill", "#555")  
                    .style("opacity","0")
            }


            node.append("text")
                .attr("dy", 3)
                .attr("font-size",20) 
                .attr("y", -20)
                .attr("x", 30)
                .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
                .text(function(d) {return d.children ? d.id:"";  })  //d.id.split(",")[0]

        }

    }

    render() {
        var images = [ "AiHong" ,"Chan" ,"DengGao" ,"DuJuan" ,"JinLing" ,"Jiu" ,"Ju" ,"Lan" ,"Liu" ,"LiuChao" ,"Lou" ,"Ma" ,"Mei" ,"QiangDi","QinSe" ,"QingNiao" ,"ShaOu" ,"Shui" ,"Song" ,"WuTong" ,"XiaoXiang" ,"Xue" ,"Yue" ,"Yun" ,"ChangTing" ,"Zhou" ,"Zhu" ,"Cao" ]
        return (
            <div>

                <Cao width={100} height={100} id="objectLine_Cao" style={{"position":"absolute"}}/>
                <Chan width={100} height={100} id="objectLine_Chan" style={{"position":"absolute"}}/>
                <DengGao width={100} height={100} id="objectLine_DengGao" style={{"position":"absolute"}}/>
                <DuJuan width={100} height={100} id="objectLine_DuJuan" style={{"position":"absolute"}}/>
                <JinLing width={100} height={100} id="objectLine_JinLing" style={{"position":"absolute"}}/>
                <Jiu width={100} height={100} id="objectLine_Jiu" style={{"position":"absolute"}}/>
                <Ju width={100} height={100} id="objectLine_Ju" style={{"position":"absolute"}}/>
                <Lan width={100} height={100} id="objectLine_Lan" style={{"position":"absolute"}}/>
                <Liu width={100} height={100} id="objectLine_Liu" style={{"position":"absolute"}}/>
                <Lou width={100} height={100} id="objectLine_Lou" style={{"position":"absolute"}}/>
                <Ma width={100} height={100} id="objectLine_Ma" style={{"position":"absolute"}}/>
                <Mei width={100} height={100} id="objectLine_Mei" style={{"position":"absolute"}}/>
                <QinSe width={100} height={100} id="objectLine_QinSe" style={{"position":"absolute"}}/>
                <QingNiao width={100} height={100} id="objectLine_QingNiao" style={{"position":"absolute"}}/>
                <ShaOu width={100} height={100} id="objectLine_ShaOu" style={{"position":"absolute"}}/>
                <Shui width={100} height={100} id="objectLine_Shui" style={{"position":"absolute"}}/>
                <Song width={100} height={100} id="objectLine_Song" style={{"position":"absolute"}}/>
                <WuTong width={100} height={100} id="objectLine_WuTong" style={{"position":"absolute"}}/>
                <XiaoXiang width={100} height={100} id="objectLine_XiaoXiang" style={{"position":"absolute"}}/>
                <Xue width={100} height={100} id="objectLine_Xue" style={{"position":"absolute"}}/>
                <Yue width={100} height={100} id="objectLine_Yue" style={{"position":"absolute"}}/>
                <Yun width={100} height={100} id="objectLine_Yun" style={{"position":"absolute"}}/>
                <ChangTing width={100} height={100} id="objectLine_ChangTing" style={{"position":"absolute"}}/>
                <Zhou width={100} height={100} id="objectLine_Zhou" style={{"position":"absolute"}}/>
                <Zhu width={100} height={100} id="objectLine_Zhu" style={{"position":"absolute"}}/>

                <div id="poet-link-image" style={{"zIndex":30}}></div>                         
            </div>            
        )
    }
}