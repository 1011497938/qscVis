import React, {Component} from 'react';
import CiCloud from 'component/ciCloud';
import ObjectLine from 'component/objectLine';
import MapView from 'component/mapView';
import StoryView from 'component/storyView';
import SonicView from 'component/sonicView';
import FreqLine from 'component/FreqLine';


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
                        top: '1300px'
                    }}
                >
                    <ObjectLine />
                </div>
            </div>  
        )
    }
}
