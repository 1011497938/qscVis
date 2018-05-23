import React, {Component} from 'react';
import * as d3 from 'd3';
import ci_freq from '../../../data/ci_freq.json';
import CiCloud from 'component/ciCloud';
import ObjectLine from 'component/objectLine';
import MapView from 'component/mapView';
import StoryView from 'component/storyView';
export default class Home extends Component {
    componentDidMount(){
        // let t = d3.transition()
        // .delay(1000)
        // .duration(1000)
        
        // d3.select('#cloud')
        // .transition(t)
        // .style(
        //     'transform','translate(100px, 0px)'
        // )
    }

    render() {
        const bg = {
            background: `url(${require("../../../res/background.png")})`,
            width: '1890px',
            height: '6884px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        }
        return (
            <div style = { bg }>
                <div id="title" style = {{
                    position:'absolute',
                    top: '500px',
                    left: '900px',
                    width: '20px'
                }}>
                    激浊扬清，馥郁千年
                </div>
                <div id="title-text" style = {{
                    position:'absolute',
                    top: '400px',
                    left: '700px',
                    width: '340px', 
                    paddingLeft: '500px',
                    textAlign: 'justify'
                    }}>
                    <p>
                    中国文化的精髓，不在那些华丽的中式服装。
                    精美的瓷器，恢弘的建筑，而在于我们的文字。
                    文字是中华民族的滥觞之地，是每一个中国人血脉里流淌了千年的文化传承。
                    一段好的文字，通常只是几个字，简单的排列组合一下，就能瞬间把我们击中。
                    </p>
                </div>
                <div style={{position:'relative',top:'1400px'}}>
                    <ObjectLine />
                </div>
                <div 
                    id="cloud"
                    style={{position:'relative',top:'700px'}}
                    >
                    <CiCloud list = {ci_freq}/>   
                </div>
                <div id="storyView">
                    <StoryView />
                </div>
                <div id="map">
                    <MapView />
                </div>
                {/* <div id="object">
                    <ObjectLine />
                </div> */}
            </div>            
        )
    }
}