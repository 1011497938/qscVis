import React, {Component} from 'react';
import CiCloud from 'component/ciCloud';
import ObjectLine from 'component/objectLine';
import MapView from 'component/mapView';
import StoryView from 'component/storyView';
import SonicView from 'component/sonicView';
import FreqLine from 'component/FreqLine';
import CiPaiBarChart from 'component/ciPaiBarChart';

import sStore from 'store/sstore';
import { observer } from "mobx-react";
import title0 from '../../../res/万水千山走遍.png' 
import title1 from '../../../res/草木皆有情.png' 
import title2 from '../../../res/春风化雨.png' 
import data_news from '../../../res/数据新闻logo.png' 
import zju_vag from '../../../res/ZJU_VAG_logo.png' 
import qrcode_vag from '../../../res/qrcode_vag.png' 
import qrcode_xinhua from '../../../res/qrcode_xinhua.png' 
import title from '../../../res/title.png' 
import nav_en from '../../../res/nav_en.png'
import nav from '../../../res/nav.png'
import nav_0 from '../../../res/nav_0.png'
import nav_1 from '../../../res/nav_1.png'
import nav_2 from '../../../res/nav_2.png'
import objects from '../../../res/objects.jpg'
import { Affix } from 'antd';

const map_width = 1800, story_width = 1920, cloud_width = 1800
@observer
export default class BigWindows extends Component {
    constructor() {
        super();
        this.state = {
          isZh: false
        }
    }
    componentDidMount(){
        const width = +window.screen.availWidth
    }

    render() {
        const bg = {
            background: `url(${require("../../../res/background_big.jpg")})`,
            width: '21120px',
            height: '3240px',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
        }
        const text_size = 18
        const text_line_height = 1.5*text_size
        const width = +window.screen.availWidth, height = +window.screen.availHeight
        const affix_height = 60*2.56
        const affix_top = height*1920/width
        return (
            <div id = "mobile-page" style = { bg }>
                <div 
                    id="objectLine"
                    style={{
                        position:'absolute',
                        left:'16000px',
                        top: '1179px'
                    }}
                >
                    <ObjectLine />
                </div>
                {/* Object Line 注释 */}
                <div style = {{
                    position:'absolute',
                    top: '1500px',
                    left: '15750px',
                    }}>
                    <svg
                        width = '1000'
                        height = '500'
                    >
                    {
                    ['#EC5737','#5D513B','#163471','#F0C239','#339999'].map((c,i)=>(
                        <line
                            key = {i}
                            x1 = "100"
                            y1 = { 10 + i * 40 }
                            x2 = "250"
                            y2 = { 10 + i * 40 }
                            stroke = {c}
                            strokeWidth = "20"
                        />
                    ))
                    }
                    {
                    ['喜','怒','哀','乐','思'].map((c,i)=>(
                        <text
                            key = {i}
                            x = "280"
                            y = { 25 + i * 40 }
                            fill = 'black'
                            fontSize = '30'
                            fontFamily = 'W5'
                            fontWeight = 'bold'
                        >
                        {c}
                        </text>
                    ))
                    }
                    <circle 
                    cx="100" 
                    cy="200" 
                    r="45"
                    fill = "#e5e5e5"
                    transform = 'translate(300,-100)'
                    />

                    <circle 
                    cx="100" 
                    cy="200" 
                    r="40"
                    fill = "none"
                    stroke = "#000115"
                    strokeWidth = "2"
                    transform = 'translate(300,-100)'
                    />
                    <text
                        x = "100"
                        y = "165"
                        fill = 'black'
                        fontSize = '30'
                        fontFamily = 'W5'
                        fontWeight = 'bold'
                        style = {{
                            writingMode : 'tb-rl'
                        }}
                        transform = 'translate(300,-100)'
                    >
                    意象
                    </text>
                    <path 
                    d = "M 102 152
                        A 50 50 0 0 1 133 165
                        M 135 168
                        A 50 50 0 0 1 132 235
                        M 130 237
                        A 50 50 0 0 1 102 248
                        M 99 248
                        A 48 48 0 0 1 64, 169
                        M 66 166
                        A 50 50 0 0 1 98, 152
                    "
                    fill="none"
                    stroke="black"
                    strokeWidth="5"
                    transform = 'translate(300,-100)'
                    />
                    <text
                        x = "150"
                        y = "130"
                        fill = 'black'
                        fontSize = '30'
                        fontFamily = 'W5'
                        fontWeight = 'bold'
                        transform = 'translate(300,-100)'
                    >
                    情绪表达
                    </text>
                    <text
                        x = "150"
                        y = "165"
                        fill = 'black'
                        fontSize = '30'
                        fontFamily = 'W5'
                        fontWeight = 'bold'
                        transform = 'translate(300,-100)'
                    >
                    次数占比
                    </text>
                    <line
                        x1="120"
                        y1="155"
                        x2="147"
                        y2="136"
                        stroke="black"
                        strokeWidth="2"
                        transform = 'translate(300,-100)'
                    />

                    </svg>
                </div>
                <div 
                    id="cloud"
                    style={{
                        position:'absolute',
                        top: '180px',
                        left:'15750px',
                    }}
                    >
                    <CiCloud isZh={true}/>   
                </div>

                {/* 诗人所处年代 */}
                <div 
                    id="storyView"
                    style={{
                        position:'absolute',
                        top: '1387px',
                        left: '9960px',
                        zIndex: 2
                    }}
                    >
                    <StoryView authors = {sStore.authors_story}/>
                </div>
                <div 
                    style={{
                        position:'absolute',
                        top: '2400px',
                        left: '9923px',
                        width: '20px',
                        height: '500px',
                        fontSize: '60px',
                        fontWeight: 'bold',
                        fontFamily: 'W5',
                        zIndex: 2,
                        writingMode : 'tb-rl'
                    }}
                    >
                    词人作品数量
                </div>



                <div 
                    id="map-view"
                    style={{
                        position:'absolute',
                        top: '550px',
                        left:'5800px'
                    }}
                    >
                    <MapView author={sStore.author}/>
                </div>


                <div 
                    id="sonicView"
                    style={{
                        position:'absolute',
                        top:'1350px',
                        left: '1800px'
                    }}
                >
                    <SonicView/>
                </div>

                <div
                    id="ciPai"
                    style={{
                        position:'absolute',
                        top:'2420px',
                        left: '4100px'
                    }}
                >
                    <CiPaiBarChart/>
                </div>
            </div>  
        )
    }
}
