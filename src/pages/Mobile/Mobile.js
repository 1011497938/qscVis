import React, {Component} from 'react';
import $ from  'jquery';
import CiCloud from 'component_mobile/ciCloud';
import MapView from 'component_mobile/mapView';
import StoryView from 'component_mobile/storyView';
import SonicView from 'component_mobile/sonicView';
import FreqLine from 'component_mobile/FreqLine';

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
export default class Mobile extends Component {
    constructor() {
        super();
        this.state = {
          isZh: false
        }
    }
    componentDidMount(){
        const width = +window.screen.availWidth
        $('#title0_link')
            .click(()=>{
                $('.nav').css('display', 'none')
                $('#nav_img_0').css('display', 'block')
                $('html, body').animate({
                    scrollTop: $('#title0').offset().top - 80*1920/width},
                    {duration:500, easing: 'swing'})
            })
        $('#title1_link')
        .click(()=>{
            $('.nav').css('display', 'none')
            $('#nav_img_1').css('display', 'block')
            $('html, body').animate({
                scrollTop: $('#title1').offset().top - 80*1920/width},
                {duration:500, easing: 'swing'})
        })
        $('#title2_link')
        .click(()=>{
            $('.nav').css('display', 'none')
            $('#nav_img_2').css('display', 'block')
            $('html, body').animate({
                scrollTop: $('#title2').offset().top - 80*1920/width},
                {duration:500, easing: 'swing'})
        })
    }

    render() {
        const bg = {
            background: `url(${require(this.state.isZh? "../../../res/background_mobile.jpg" : "../../../res/background_mobile_en.png")})`,
            width: '1919px',
            height: '27354px',
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
                <div style={{
                    zIndex: 999,
                    position:'absolute',
                    top: '3443.44px', 
                    width: '1919px',
                    height: `${affix_height}px`                  
                }}>
                <Affix 
                    offsetTop= {0}
                >
                <div 
                style={{
                    width: '1919px',
                    height: `${affix_height}px`,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <div
                    id = 'title0_link'
                    style = {{
                        width: `${1920/3}px`,
                        height: `${affix_height}px`,
                    }}>
                    </div>
                    <div
                    id = 'title1_link'
                    style = {{
                        width: `${1920/3}px`,
                        height: `${affix_height}px`,
                    }}>
                    </div>
                    <div
                    id = 'title2_link'
                    style = {{
                        width: `${1920/3}px`,
                        height: `${affix_height}px`,
                    }}>
                    </div>
                    <img 
                    className = 'nav'
                    id = 'nav_img'
                    src={this.state.isZh? nav : nav_en} 
                    style={{
                        position: 'absolute',
                        width: '1920px',
                        top: '-11px',
                        left: '0px',
                        pointerEvents: 'none',
                        display: 'block'
                    }}/>
                    <img 
                    className = 'nav'
                    id = 'nav_img_0'
                    src={this.state.isZh? nav_0: nav_en} 
                    style={{
                        position: 'absolute',
                        width: '1920px',
                        top: '-11px',
                        left: '0px',
                        pointerEvents: 'none',
                        display: 'none'
                    }}/>
                    <img 
                    className = 'nav'
                    id = 'nav_img_1'
                    src={this.state.isZh? nav_1 : nav_en} 
                    style={{
                        position: 'absolute',
                        width: '1920px',
                        top: '-11px',
                        left: '0px',
                        pointerEvents: 'none',
                        display: 'none'
                    }}/>
                    <img
                    className = 'nav'
                    id = 'nav_img_2'
                    src={this.state.isZh? nav_2: nav_en} 
                    style={{
                        position: 'absolute',
                        width: '1920px',
                        top: '-11px',
                        left: '0px',
                        pointerEvents: 'none',
                        display: 'none'
                    }}/>
                </div>

                 </Affix>
                </div>

                <div id="title" style = {{
                    position:'absolute',
                    top: '412px',
                    left: this.state.isZh? '1000px' : '940px',
                    width: '50px',
                    transform: 'scale(0.4) translate(-180px,-2700px)'
                }}>
                    <img src={ title } width="350"/>
                </div>
                
                {
                this.state.isZh?
                <div/>
                :
                <div  style = {{
                    position:'absolute',
                    top: '1060px',
                    left: '309px',
                    width: '1500px',
                    fontWeight: 'bold',
                    fontSize: '80px',
                    lineHeight : '50px',
                    transform: 'rotate(90deg)'
                }}
                className = "en">
                    <p>Immersing in Song Ci, <br/> Singing Tenderly and Seeking Forever</p>
                </div>
                }

                
                <div className="title-text" style = {{
                    position:'absolute',
                    top: '3740px',
                    left: '205px',
                    width: '1510px', 
                    lineHeight: this.state.isZh? '':'70px',
                    }}>
                    <p>
                    {this.state.isZh? 
                        "新华网数据新闻联合浙江大学可视化小组研究团队，以《全宋词》为样本，挖掘描绘出两宋319年间，那些闪光词句背后众多优秀词人眼中的大千世界。项目历时半年，分析词作近21000首、词人近1330家、词牌近1300个，挖掘数据纬度涵盖词作者、词作所属词牌名、意象及其所承载的情绪。"
                        :
                        "The project was done on cooperation of the Xinhua Data News and the Visual Analytics Group of Zhejiang University. In summer of 2018, by mining the gorgeous words in the Whole Poetry of Song, we mapped a colorful world belonged to the Chinese Song Ci poets during the 319-year's Dynasty. More than 21000 pieces of works have been analyzed, referring to about 1330 poets and tunes. The data was collected in dimension of poets, tunes, images and the emotions behind."
                    }
                    </p>
                </div>

                <div className="label-text" style = {{
                    position:'absolute',
                    top: '4851px',
                    left: this.state.isZh? '1129px' : '1029px',
                    width: '800px', 
                    }}>
                    {this.state.isZh? '图 《清明上河图（局部）》张择端&nbsp;北宋' : 'Chinese Symphonic Picture Ascending the River at Qingming Festival, Zhang Zeduan, Song Dynasty'}
                </div>
                
                <div className="label-text" style = {{
                    position:'absolute',
                    zIndex: 10,
                    top: this.state.isZh? '7850px' : '7606px',
                    left: this.state.isZh? '750px' : '550px',
                    width: '1000px', 
                    }}>
                        {this.state.isZh? '图 宋代词人游历路线图' : 'The Migration of the Poets in Song Dynasty'}
                </div>
                <div className="label-text" style = {{
                    position:'absolute',
                    zIndex: 10,
                    top: this.state.isZh? '9910px' : '10750px',
                    left: this.state.isZh? '1300px' : '1067px',
                    width: this.state.isZh? '600px' : '1000px', 
                    }}>
                        {this.state.isZh? '图 宋代词人生平及所处年代图谱' : 'The timeline of the Poets in Song Dynasty'}
                </div>
                <div className="label-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '12650px' : '14250px' ,
                    left: this.state.isZh? '700px' : '400px',
                    width: '1200px', 
                    }}>
                        {this.state.isZh? '图 《全宋词》词频统计结果' : 'The word Frequency Statistics of the Whole Poetry of Song'}
                </div>
                <div className="label-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '13650px': '15380px',
                    left: this.state.isZh? '704px' : '369px',
                    width: '1300px', 
                    }}>
                        {this.state.isZh? '图 《全宋词》常见意象统计' : 'The Common Images Used Statistics in the Whole Poetry of Song'}
                </div>
                <div className="label-text" style = {{
                    position:'absolute',
                    top: this.state.isZh?'16250px' : '18400px',
                    left: this.state.isZh? '704px' : '510px',
                    width: '1000px', 
                    }}>
                        {this.state.isZh? '图 宋词常用意象及其表达情绪统计' : 'The Popular Images and Emotions of the Typical Poets'}
                </div>
                <div style = {{
                    position:'absolute',
                    top: this.state.isZh? '5064px' : '5100px',
                    left: this.state.isZh? '1162px' : '850px',
                    width: '548px',
                    transform: 'scale(2.3,2.3) translate(130px,40px)' 
                    }}>
                    <img src={ title0 } style={this.state.isZh?{}:{width:'524px', maxHeight:'75px'}}/>
                </div>
                {this.state.isZh?
                <div id='title0' className='sub-title' style = {{
                    position:'absolute',
                    top: this.state.isZh? '5064px' : '5093px',
                    left: '1162px',
                    width: this.state.isZh? '800px' : '548px', 
                    }}>
                    万水千山走遍
                </div>
                :
                <div id='title0' className='en-sub-title' style = {{
                    position:'absolute',
                    top: '5151px',
                    left: '900px',
                    width: '1000px', 
                    lineHeight: '60px',
                    fontSize: '78px',
                    letterSpacing: '-8px'
                    }}>
                    A Long Life, an Arduous Journey
                </div>             
                }


                <div className="title-text" style = {{
                    position:'absolute',
                    top: '5280px',
                    left: '205px',
                    width: '1520px', 
                    
                    }}>
                    {this.state.isZh? 
                        <div>
                            <p>
                            宋代词人，大多走仕途。
                            </p>
                            <p>
                            自宋太祖立下“不可杀士大夫”的遗诏，士大夫在宋朝得到了最大限度的尊重和培养。宋代可考的词人，多数在25岁上下的年纪即入仕并终身从政。为官游历、体察民情的经验是丰富的创作素材，因而他们的作品中充满了对生活细节的品读，充满画面感。北宋都城开封的盛景在《清明上河图》中显露无余。词人们生长于斯，格外偏爱这里的烟火气味。周邦彦就曾歌咏东京汴梁城“箫鼓喧，人影参差，满路飘香麝。”杭州则是词人最常造访之地。从柳永楼台上酒盅里的秋水夕阳，到苏轼笔下风味堂的野菊、剑潭桥的荷叶，再到辛弃疾泛舟西子湖上“一舸弄烟雨”，杭州的繁华富饶，延续了整个宋朝。
                            </p>
                        </div>
                        :
                        <div>
                            <p>
                            Benefiting from the founder (Song Taizu)'s posthumous edict, the scholar-officials in Song dynasty were exempted from the death penalty. They were widely respected and supported by the court and the commonalty, hence most of the poets were able to achieve on the official career. Starting in the age of 25, they spent their whole life in official promotion and relegation, travelling and observing among the people, which greatly enriching the materials for their writing. 
                            </p>
                        </div>
                    }
                </div>
                <div 
                    id="map-view"
                    style={{
                        position:'absolute',
                        top:this.state.isZh? '6450px': '6074px',
                        left:'338px'
                    }}
                    >
                    <MapView author={sStore.author} width={map_width} height={map_width*0.75}/>
                </div>

                <div style = {{
                    position:'absolute',
                    top: this.state.isZh? '7700px': '7300px',
                    left: '100px',
                    zIndex: 2
                    }}>
                    <svg
                        width = '800'
                        height = '400'
                    >
                    <g
                        transform = 'scale(4,4) translate(-30,10)'>
                    <circle
                        cx = '50'
                        cy = '20'
                        r  = '3'
                        stroke = '#37395D'
                        fill = '#575A8B'
                        fillOpacity = '0.55'
                     />
                     <circle
                        cx = '80'
                        cy = '15'
                        r  = '8'
                        stroke = '#37395D'
                        fill = '#575A8B'
                        fillOpacity = '0.55'
                     />
                    <line
                        x1 = "41"
                        y1 = "23.5"
                        x2 = "93"
                        y2 = "23.5"
                        stroke = 'black'
                        strokeWidth = "1"
                    />
                    <line
                        x1 = "40"
                        y1 = "20"
                        x2 = "90"
                        y2 = "3"
                        stroke = 'black'
                        strokeWidth = "1"
                    />
                    </g>
                    <text
                        className = "legend-text"
                        x = "30"
                        y = "260"
                    >
                    {this.state.isZh?'1-123（次）' : '1-123 (Times)' }
                    </text>
                    <g
                        transform = 'scale(4,4) translate(50,-70)'>
                    {
                        [[40,80],[70,90],[55,105]].map((d,i)=>(
                            <circle
                            key = {i}
                            cx = {d[0]}
                            cy = {d[1]}
                            r  = '5'
                            stroke = '#37395D'
                            fill = '#575A8B'
                            fillOpacity = '0.55'
                            />
                        ))
                    }
                    <path d="
                        M 40 80
                        A 20 20 0 0 1 70 90
                        A 25 25 0 0 1 55 105
                    "
                    fill="none"
                    stroke="black"
                    strokeWidth="1"/>
                    </g>
                    <text
                        className = "legend-text"
                        x = {this.state.isZh? "320" : "360"}
                        y = "260"
                    >
                    {this.state.isZh?'行进路线' : 'route'}
                    </text>
                    </svg>  
                </div>

                <div 
                    id="storyView"
                    style={{
                        position:'absolute',
                        top: this.state.isZh? '9300px' : '10200px',
                        left: '0px',
                        zIndex: 2
                    }}
                    >
                    <StoryView width={story_width} height = {5/15*story_width} isZh = {this.state.isZh}/>
                </div>

                <div style = {{
                    position:'absolute',
                    top: this.state.isZh? '10040px' : '10940px',
                    left: '430px',
                    zIndex: 1
                    }}>
                    <svg
                        width = '1200'
                        height = '150'
                    >
                    <g
                        transform = 'translate(0,10)'
                    >
                        <path d="
                        M 30 20
                        L 40 0 L 60 0 L 70 20 L 90 20 
                        "
                        stroke = 'rgba(185,120,111, 0.9)'
                        strokeWidth = '2'
                        fill = 'none'
                        transform = 'scale(2, 2) translate(0,0)'/>
                        <path d="
                        M 30 20
                        L 40 0 L 60 0 L 70 20 L 90 20 
                        "
                        stroke = 'rgba(132,143,160,0.8)'
                        strokeWidth = '2'
                        fill = 'none'
                        transform = 'scale(2, 2) translate(0,40)'/>
                        <text
                            className = {this.state.isZh?"legend-text":""}
                            x = {this.state.isZh?"200":"190"}
                            y = "40"
                            fontSize = {this.state.isZh?'':'38'}
                        >
                        {this.state.isZh? "豪放派" : "Bold Faction"  }
                        </text>
                        <text
                            className = {this.state.isZh?"legend-text":""}
                            x =  {this.state.isZh?"200":"190"}
                            y = "40"
                            fontSize = {this.state.isZh?'':'38'}
                            transform = 'translate(0,80)'
                        >
                        {this.state.isZh? "婉约派" : "Grace Faction"  }
                        </text>
                        <g
                            transform = 'scale(2,2) translate(350, -150)'
                        >
                        <path d="
                            M 30 20
                            L 40 0 L 60 0 L 70 20 L 90 20 
                            "
                            stroke = 'rgba(185,120,111, 0.9)'
                            strokeWidth = '2'
                            fill = 'none'
                            transform = 'scale(1.5,1.5) translate(0,120)'/>
                        <line
                            x1="15"
                            y1="35"
                            x2="25"
                            y2="15"
                            stroke="#666"
                            strokeWidth="2" 
                            transform = 'translate(60, 144)'/>
                        <text
                            x = "25"
                            y = "15"
                            fill = 'black'
                            fontSize = '16'
                            fontFamily = 'W5'
                            transform = 'translate(60,144)'
                        >
                           {this.state.isZh? "词人仕途时期" : "Official Career"  }
                        </text>
                        <line
                            x1="15"
                            y1="35"
                            x2="25"
                            y2="15"
                            stroke="#666"
                            strokeWidth="2" 
                            transform = 'translate(105, 175)'/>
                        <text
                            x = "25"
                            y = "15"
                            fill = 'black'
                            fontSize = '16'
                            fontFamily = 'W5'
                            transform = 'translate(105, 175)'
                        >
                            {this.state.isZh? "词人平民时期" : "Common People"  }
                        </text>
                        </g>
                        <g transform="translate(65,0)">
                            <rect
                                x = "160"
                                y = "0"
                                height = "20"
                                width = "30"
                                fill = "#D4D4CA"
                                transform = 'scale(2.5, 2.5)translate(-15,0)'
                            />
                            <rect
                                x = "160"
                                y = "0"
                                height = "20"
                                width = "30"
                                strokeWidth = "1"
                                stroke = "black"
                                fill = "none"
                                transform = 'scale(2.5, 2.5) translate(-15,32)'
                            />
                            <text
                                className = {this.state.isZh?"legend-text":""}
                                x = "200"
                                y = "40"
                                fontSize = {this.state.isZh?'16':'38'}
                                transform = 'translate(250,0)'
                            >
                            {this.state.isZh? "词人仕途时期" : "Official Career"  }
                            </text>
                            <text
                                className = {this.state.isZh?"legend-text":""}
                                x = "200"
                                y = "40"
                                fontSize = {this.state.isZh?'16':'38'}
                                transform = 'translate(250,80)'
                            >
                            {this.state.isZh? "词人平民时期" : "Common People"  }
                            </text>
                        </g>
                    </g>
                    </svg>
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '8000px': '7700px',
                    left: '205px',
                    width: '1520px', 
                    }}>
                    {this.state.isZh? 
                    <div>
                        <p>
                        杜甫所言“文章憎命达”在宋代亦有所证，以北宋苏轼、南宋辛弃疾为最。苏轼未能延续初入仕途的光芒，一贬再贬，却从未丧失斗志。他用激越的词句书写沿途的人间万象，使得词脱离辅助宴曲的狭窄角色，也能如诗一样承载家国情怀。自此，继柳永“执手相看泪眼，竟无语凝噎”的婉约词之后，苏轼开创了“人生如梦，一尊还酹江月”的豪放词风先河。
                        </p>
                        <p>
                        到了南宋，有辛弃疾与之呼应，并称“苏辛”。辛弃疾一生作词数量为唐宋词家之最，《全宋词》中收录达629篇，人称“词中之龙”。他是少年抗金的仗剑侠士，却仕途坎坷，恢复中原的壮志终生未报。因而他的作品，有“了却君王天下事，赢得生前身后名”的豪情溢满，“廉颇老矣，尚能饭否”的壮志难酬，又有“玉壶光转，一夜鱼龙舞”的浪漫璀璨。
                        </p>                        
                    </div>
                    :
                    <div style={{lineHeight:'70px'}}>
                        <p>
                        Descripting the detail extensively, the Songci poets were always capable of creating mental pictures. Hangzhou was the city the poets visited most. As it was written by Liu-Yong, Su-Shi and Xin Qiji, changed were seasons and bloomed were the flowers, thrived was the city, prosperous and bustling the whole dynasty. Kaifeng (named Bianliang in Song), the prosperous and bustling capital city recorded in Chinese Symphonic Picture Ascending the River at Qingming Festival, was another place favored in Songci. Chou Pangyen, one of the epitomes of the Grace Faction, depicted in his poetry To the Tune of Chieh yü hua, "the drums boom far and near, the crowd's shadows rise and fall, fragrance wafts over all".
                        </p>
                        <p>
                        However, the article hates life, the great poetries were always written in adversity. The great poets Su-Shi and Xin Qiji in Song could be the case in the point. Su was on a premature decline just a few years since he was recognized and recommended by Ou Yang-xiu from the Imperial Examination. Frustrated as the successive relegation was, he never lost will. Instead, he looked into people's condition on the way to his post and wrote down his experience with passion and aspiration. In that way, after the Grace Faction in earlier Song, a new school of Songci, Bold Faction, had formed. Exalting beyond its former role as the lyrics of Conductus, the Songci in Bold Faction could carry poets' patriotism, as Su's sentence,  "But isn't life a dream, after all？Let me pledge this cup to the River, to the Moon.'
                        </p>       
                        <p>
                        Xin Qiji in late Song, was with Su-Shi in both poetry and life experience. Known as the 'Songci Dragon', he wrote the most among the poets in Tang and Song Dynasty, 629 pieces of his works were included into the Whole Poetry of Song. Uprising with the army and attending the war with Jurchen's Jin Dynasty, Xin had a tragic political career and never seen the recovering of his mother country. An idea of chivalry was reflected in his works, both heroism and romantism.
                        </p>                 
                    </div>
                    }
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '10200px' : '11090px',
                    left: '205px',
                    width: '1520px', 
                    }}>
                    {this.state.isZh? 
                    <div>
                        <p>
                        可就在这个“学而优则仕”的黄金年代，有一众隐士，终生淡泊名利，云游四海。北宋初年有林逋，梅妻鹤子，一生漫游于江淮一带。南渡之后，有婉约词人姜夔，一生屡试不第、转徙江湖、贫困潦倒；同时代还有豪放词人戴复古，游历于长江两岸，以“专业诗人”的身份体察民间疾苦。
                        </p>
                        <p>
                        公元1127年，金兵攻陷东京，北宋亡，南宋立。难民南迁，李清照亦被群起的慌乱裹挟着避乱江南，前半生的优雅诗意就此打破。不再有“浓睡不消残酒”的安逸，也无暇顾及落花春雨，丈夫病逝，家财尽失：千古第一才女就这样守着涩酒苦茶、冷雨寒窗，度过了“凄凄惨惨戚戚”的人生后半程。
                        </p>
                    </div>
                    :
                    <div style={{lineHeight:'70px'}}>
                        <p>
                        Obviously, it was an unprecedented time for the good scholar making an official. But there were ones who did exactly the opposite. They were hermits, indifferent to fame and fortune, wandering the whole world. Lin Bu, who spent his whole life wandering in Yangtze-Huai early Song, took a plum tree as his wife and cranes as children. Jiang-Kui and Dai Fugu were remarkable after moving to the South. Jiang, the representative figure in the Grace Faction, failed repeatedly in the imperial examination and drifted all his life while Dai made living by writing Songci, recording people and society along the Yangtze River.
                        </p>
                        <p>
                        In the year of 1127, the Northern Song went to its end after its capital Kaifeng was captured by Jurchen Army. Lost and frightened, Li Qingzhao was carried along with the refugees in the mass migration to the Southern Song, their surviving territory. It was at that time, Li, the ingenious woman poet, lost her husband, property and also, the first half of her life in concinnity and poetry. After that, the situation as depicted in her poem "That tipsy feeling still lingered after the restful night" would never happen. Instead, she spent her rest 28 years in endless sadness, dreary and loneliness, without a least cheer.
                        </p>
                    </div>
                    }
                </div>

                <div style = {{
                    position:'absolute',
                    top: this.state.isZh? '11338px' : '12938px',
                    left: this.state.isZh?'753px':'549px',
                    width: '989px', 
                    transform: 'scale(2.3,2.3) translate(260px,30px)' 
                    }}>
                    <img src={ title1 } style = {this.state.isZh?{}:{width:'620px', maxHeight:'75px'}}/>
                </div>
                <div id='title1' className= {this.state.isZh? 'sub-title' : 'en-sub-title' } style = {{
                    position:'absolute',
                    top: this.state.isZh? '11338px' : '12938px',
                    left: this.state.isZh? '753px' : '540px',
                    fontSize: this.state.isZh?'':'78px',
                    letterSpacing: this.state.isZh?'':'-8px',
                    width: '1500px', 
                    }}>
                    {this.state.isZh? "草木皆有情，词即人生" : "Every Life has its feelings, and, Poem is life "}
                </div>

                <div 
                    id="cloud"
                    style={{
                        position:'absolute',
                        top:this.state.isZh? '11520px': '13120px',
                        left:'60px',
                    }}
                    >
                    <CiCloud  width = {cloud_width} height = {cloud_width*0.6}/>   
                </div>
                
                <div className="title-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '12950px' : '14500px',
                    left: '205px',
                    width: '1520px', 
                    }}>
                    {this.state.isZh?
                    <p>
                    史书中的宋朝，士大夫主导朝廷和带领军队。他们力避战争，多用谈判处理矛盾，使得这个积弱不振的朝代绵延三百余年之久。宋词总有或浓或淡的迷茫和愁情，无论是柳永“酒醒何处”、陆游“梦断何处”还是李清照找寻“人何处”，亦或是辛弃疾“众里寻她千百度”，宋代词人好像在不停寻找，而生命的归宿终将在这广袤人间。
                    </p>
                    :
                    <p style={{lineHeight: '70px'}}>
                    According to historical records, it was the literati who held the real power at court and in army. Striving for peace and quiet, they negotiated with the surrounding countries to avoid war so that the beleaguered dynasty was able to continue for over 300 years. And the style of scholar-official had spread to the whole society. A feeling of melancholy was always running through the Songci poems. It seemed that the poets were at loss in seeking for the true life, as Xin Qiji wrote: "But in the crowd once and again I look for her in vain." 
                    </p>               
                    }
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '13950px' : '15500px',
                    left: '205px',
                    width: '1520px', 
                    }}>
                    {this.state.isZh?
                    <div>
                        <p>
                        宋词的绝妙之处在于其运用意象、借物抒怀的高超水准。或许是“澶渊之盟”换来的百余年稳定使得城邦安于物产丰富的平原丘陵，宋词惯常使用的意象中少有典故，多用花鸟草木、楼宇船舶等平淡景象。宋代词人最偏爱风，因为涌动的空气能承载多种情感：吹散酒后的愁云、传递得志的欢欣，亦能推动战舰扬帆远航。在《全宋词》收录百篇以上的词人中，辛弃疾和吴文英最善用意象抒怀。他们的年代，一个刚刚南渡，一个即将灭亡，一样的乱世，一样的思绪万千。但前者力图建功立业，眼界宽广；后者终生隐逸，情感细腻雅致，人称“词中李商隐”。
                        </p>
                        <p>
                        正所谓“以我观物，故物皆著我之色彩”，透过意象看去，是宋代词人丰富的内心世界。宋代是程朱理学的发源，主张修养本性、收敛欲望，因而整个文人阶层都沉浸在自省的氛围之中。毕竟，万水千山走遍，冷暖人情历尽，叩问本心才是词人的真性情。因而词人们常沉思，有时还挟带着现世的种种忧愁。北宋晏几道，如其父晏殊，才华绝伦；少年中第，然家道中落，暮年沦为阶下囚。他的世界，多沉浸在落花、枯草、小楼之中回味情人相思。而南宋末年的刘辰翁将思考上升为家国，一生著书立作，在山水草木之间安放无处施展的忠诚。
                        </p>                        
                    </div>
                    :
                    <div style={{lineHeight:'70px'}}>
                        <p>
                        The expression technique, using literary images to convey their ideas or feelings, is the core to make Songci Poems impressive. More images of natural scene, like plants, animals and pavilions, were found in poems rather than literary quotations, which was probably because of the Song-Liao political alignment in Chanyuan in exchange for the hundred-year national stability and economic prosperity. The most high-frequency image is the wind, because there are so much to bear in the pure blowing wind, delighting, depressing and heartening. Among the poets who had more than a hundred poems in the Whole Poetry of Song, Xin Qiji and Wu Wenying were the two who using the most images for emotion expression. Their days, from the beginning of the Southern Song to the end of the whole dynasty, were all the same: utterly concerning the fate of themselves and the nation. But their styles were different. Xin was striving for achievements on a higher perspective while Wu, a life-long hermit, wrote with exquisiteness and elegance.
                        </p>
                        <p>
                        Every poet had his own unique and rich inner world, which reflected on the images he used. Effected by the originating Neo-Confucianism, the literati in Song Dynasty were immersed in an atmosphere of introspection, harnessing desires and cultivating minds. Having experienced the vicissitudes of life and ages, they tended to make inquiries of the true nature of themselves as well as the world they lived in. Hence the poets were always buried in muse with sorrow and empathy for the misfortunes. Yan Jidao in early Song and Liu Chenweng in late Song were the cases. For Yan, though smart and talented as his father Yan Shu, his life was going downhill since his family declined. Genius when young but prisoner in old age, he blended his memories and sickness in falling blossoms, withered grass and bleak houses. And Liu rose his concerns to the nation and people, converging his faith and ambition into the Mountains and Waters.
                        </p>
                    </div>
                    }

                </div>
                <div style = {{
                    position:'absolute',
                    top: this.state.isZh? '15850px' : '18050px',
                    left: this.state.isZh? '1000px' : '820px',
                    }}>
                    <svg
                        width = '1000'
                        height = '500'
                    >
                    <g
                        transform='scale(2,2) translate(200,10)'
                    >
                        {
                        ['#EC5737','#5D513B','#163471','#F0C239','#339999'].map((c,i)=>(
                            <line
                                key = {i}
                                x1 = "100"
                                y1 = { 10 + i * 30 }
                                x2 = "160"
                                y2 = { 10 + i * 30 }
                                stroke = {c}
                                strokeWidth = "10"
                            />
                        ))
                        }
                    </g>
                    {
                        (this.state.isZh? ['喜','怒','哀','乐','思']: ['Delight', 'Rage', 'Sorrow', 'Cheer', 'Thinking']).map((c,i)=>(
                            <text
                                className = "legend-text"
                                key = {i}
                                x = "725"
                                y = { 50 + i * 60 }
                            >
                            {c}
                            </text>
                        ))
                    }
                    <g 
                        transform='scale(2,2) translate(-53, -100)'
                    >
                        <circle 
                        cx="100" 
                        cy="200" 
                        r="45"
                        fill = "#e5e5e5"
                        />

                        <circle 
                        cx="100" 
                        cy="200" 
                        r="40"
                        fill = "none"
                        stroke = "#000115"
                        strokeWidth = "2"
                        />
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
                        />
                        <line
                            x1="120"
                            y1="155"
                            x2="147"
                            y2="136"
                            stroke="black"
                            strokeWidth="2"
                        />
                    </g>
                    <g>
                        <text
                            className = "legend-text"
                            x = {this.state.isZh? "97" : "36"}
                            y = {this.state.isZh? "150" : "206"}
                            style = {{
                                writingMode : this.state.isZh? 'tb-rl' : ''
                            }}
                        >
                        {this.state.isZh? '意象' : 'Image' }
                        </text>
                        <text
                            className = {this.state.isZh? "legend-text" : ''}
                            x = "200"
                            y = "60"
                            fontSize = '38'
                        >
                        {this.state.isZh? "情绪表达" : "The Proportion of "}
                        </text>
                        <text
                            className = {this.state.isZh? "legend-text" : ''}
                            x = "200"
                            y = "120"
                            fontSize = '38'
                        >
                        {this.state.isZh? "次数占比" : "Emotional Expression "}
                        </text>
                    </g>
                    </svg>
                </div>
                <div 
                    id="objectLine"
                    style={{
                        position:'absolute',
                        top: this.state.isZh? '16350px' : '18450px'
                    }}
                >
                    <img src = {objects} style = {{
                        position: 'absolute',
                        width: '1920px'
                    }}/>
                </div>
                
                <div style = {{
                    position:'absolute',
                    top: this.state.isZh? '18730px': '20700px',
                    left: this.state.isZh? '732px' : '700px',
                    width: '989px',
                    transform: 'scale(2.3,2.3) translate(250px,30px)' 
                    }}>
                    <img src={ title2 } style={this.state.isZh?{}:{width:'540px', maxHeight:'75px'}}/>
                </div>
                <div id='title2' className={this.state.isZh?'sub-title' : 'en-sub-title'} style = {{
                    position:'absolute',
                    top: this.state.isZh? '18730px' : '20700px',
                    left: this.state.isZh? '732px' : '598px',
                    width: '1500px',
                    fontSize: '78px',
                    letterSpacing: '-8px'
                    }}>
                    {this.state.isZh?'春风化雨，历久弥新' : 'Lubricant and tempting, grace everlasting'}
                    
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '19000px' : '20900px',
                    left: '205px',
                    width: '1520px', 
                    }}>
                    {this.state.isZh?
                    <p>
                    李唐以来，词在五代十国的动荡纷扰中变得厚实坚硬，终于在宋代登上大雅之堂，与唐诗并称“双绝”。得益于其音乐天性，词跳脱出诗的严整对仗，自带独特的节奏感，且遣词造句较之唐诗更加口语化，利于抒发情感，营造意境。如同现代音乐使用“C大调”“g小调”等调式谱曲，词牌是配词吟唱的曲调。它决定了词的格律，也就是词的平仄音韵和长短节拍。只可惜古曲早已失落，今人已无法聆听旧时被和曲而歌的宋词是何等绮丽动人了。
                    </p>
                    :
                    <p style={{lineHeight:'70px'}}>
                    Started in Liang Dynasty, formed in Tang Dynasty and enhanced during the discord period of Five Dynasties and Ten Kingdoms, Ci poetry finally reached to its peak in Song Dynasty and was rated as the superb works, together with Tang poetry, in the ancient Chinese literature. However, comparing to Tang poetry that was in strict antithesis, more colloquial words were used in Ci poetry to better express the poet's feelings and artistic concept, which is a sign of its music and rhythm nature. Cipai, the tunes of Ci poetry, determines the rules and forms of poetic composition. More than 1300 Cipai were recorded in the Whole Poetry of Song. Among which, Cipai 'Silk-Washing Stream' 'Prelude To Water Melody' 'Pusaman' 'Partridge Sky' 'The River All Red' are the five used the most.
                    </p> 
                    }

                </div>

                <div 
                    id = "freq-line"
                    style = {{
                        position:'absolute',
                        top: this.state.isZh? '13700px' : '15200px',
                        left:　'50px'
                    }}
                    >
                    <FreqLine width={1823} height={82} />
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '19700px',
                    left: '205px',
                    width: '1520px', 
                    display: this.state.isZh? 'block':'none'
                    }}>
                    <p>
                    《全宋词》共收录词牌约1300个，词牌浣溪沙、水调歌头、菩萨蛮、鹧鸪天和满江红使用最为频繁。本文筛选其中常见的词牌，基于词谱和意象分布将其下的著名词篇绘制出来，以期为宋词提供新的赏析角度。
                    </p>
                </div>

                <div style={{
                        position:'absolute',
                        top: this.state.isZh? '20310px' : '22000px',
                        left: '784px',
                        transform: 'scale(2.5,2.5)'
                    }}>
                    <img style={{position:'absolute', top: '50px'}}
                        src = {require('../../../res/sonic_legend.png')} 
                    />         
                    <svg style={{position:'absolute'}}>
                    <g
                        transform = 'translate(0,50)'>
                        <line 
                            x1="15"
                            y1="35"
                            x2="20"
                            y2="23"
                            stroke="#666"
                            strokeWidth="2" />
                        <text
                            x = "5"
                            y = "20"
                            fill = 'black'
                            fontSize = '15'
                            fontFamily = 'W5'>
                            {this.state.isZh? '平音' : 'Level Tones'}
                        </text>
                        <line 
                            x1="38"
                            y1="40"
                            x2="40"
                            y2="50"
                            stroke="#666"
                            strokeWidth="2" />
                        <text
                            x = "25"
                            y = "65"
                            fill = 'black'
                            fontSize = '15'
                            fontFamily = 'W5'>
                            {this.state.isZh? '仄音' : 'Oblique Tones'}
                        </text>
                        <line 
                            x1="110"
                            y1="20"
                            x2="120"
                            y2="10"
                            stroke="#666"
                            strokeWidth="2" />
                        <text
                            x = "120"
                            y = "5"
                            fill = 'black'
                            fontSize = '15'
                            fontFamily = 'W5'>
                            {this.state.isZh? '词中该位置出现意象' : 'The image refered in the poem'}
                        </text>
                    </g>                    
                    </svg>           
                </div>
                <div 
                    id="sonicView"
                    style={{
                        position:'absolute',
                        top: this.state.isZh? '20600px' : '22300px',
                        left: '0px',
                    }}
                >
                    <SonicView />
                </div>

                <div className="bottom-text" style = {{
                    position:'absolute',
                    top: this.state.isZh? '22100px' : '24000px',
                    left: '120px',
                    width: '1700px', 
                    transform: 'translateY(570px)'
                    }}>
                    {this.state.isZh?
                    <div>
                        <p>
                        注：
                        </p>
                        <p>
                        1.本文中宋词意象选取基于该领域学者判断，遴选常见的57个意象进行分析。
                        </p>
                        <p>
                        2.“喜、怒、哀、乐、思”五种情绪的常用描写亦来自学者判断。
                        </p>
                        <p>
                        3.宋代词人提取自《全宋词》，以其中收录篇目最多的20位作为叙述对象。
                        </p>
                        <p>
                        4.文中所设计地图依据中国历史地图勾勒外廓而成，仅作为疆域范围辅助图表和文字，并非精确绘制。
                        </p>
                    </div>
                    :
                    <div>
                        <p>
                        NOTES:
                        </p>
                        <p>
                        1.The measured images and emotions were chosen by scholars.
                        </p>
                        <p>
                        2.The 20 typical poets were determined by their poetries included in the Whole Poetry of Song.
                        </p>
                        <p>
                        3.The map of the Song Dynasty was sketched based on the Historical Atlas of China.
                        </p>
                    </div>
                    }

                </div>
                <div style = {{transform: this.state.isZh? 'translateY(-330px)' : 'translateY(1430px)'}}>
                    <div style = {{
                        position:'absolute',
                        top: '23872px',
                        left: '123px',
                        width: '410px',
                        transform: 'translateY(100px)'
                        }}>
                        <img src={ data_news } width="350" />
                    </div>
                    <div style = {{
                        position:'absolute',
                        top: '23872px',
                        left: '550px',
                        width: '410px',
                        }}>
                        <img src={ qrcode_xinhua } width="350"/>
                    </div>
                    <div style = {{
                        position:'absolute',
                        top: '23872px',
                        left: '960px',
                        width: '20px',
                        height: '400px'
                        }}>
                        <svg height="400">
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="350"
                            stroke="#666"
                            strokeWidth="10"
                            strokeDasharray = "15 15"
                        />
                        </svg>
                    </div>
                    <div style = {{
                        position:'absolute',
                        top: '23872px',
                        left: '1040px',
                        width: '410px',
                        }}>
                        <img src={ zju_vag } width="350"/>
                    </div>
                    <div style = {{
                        position:'absolute',
                        top: '23872px',
                        left: '1450px',
                        width: '410px',
                        }}>
                        <img src={ qrcode_vag } width="350"/>
                    </div>
                    <div className="bottom-text" style = {{
                        position:'absolute',
                        top: '24250px',
                        left: '120px',
                        width: '1700px', 
                        }}>
                        {this.state.isZh?
                        <div>
                            <p>资料来源：《全宋词》《中国历史地图集》《全宋词典故考释辞典》中南民族大学唐宋文学编年地图</p>
                            <p>&nbsp;</p>
                            <p>
                            监制：陈为，马轶群
                            </p>
                            <p>
                            统筹：马倩，张玮，潘如晟
                            </p>
                            <p>
                            诗词指导：姚逸超    
                            </p>
                            <p>
                            文案：马倩
                            </p>
                            <p>
                            设计：马倩，张玮
                            </p>
                            <p>
                            朗诵：刘子华
                            </p>
                            <p>
                            数据分析：潘如晟、陈建旭、叶少杰、李朋洋、谭思危、马昱欣
                            </p>
                            <p>
                            前端开发：潘如晟、谭思危、李朋洋、彭雨荷
                            </p>
                            <p>
                            制作单位：浙江大学CAD&CG国家重点实验室<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新华网数据新闻部
                            </p>
                            <p>
                            版权所有：浙江大学CAD&CG国家重点实验室<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新华网股份有限公司
                            </p>
                            <p>
                            Copyright&copy;2000&nbsp;-&nbsp;2018 XINHUANET.com<br/>All Rights Reserved
                            </p>
                        </div>
                        :
                        <div>
                            <p><b>REFERENCE: </b>The Whole Poetry of Song, The Historical Atlas<br/> of China, Allusions Dictionary of Song Ci Poetry, the Chronological Map Database of the Central University for Nationalities</p>
                            <p>&nbsp;</p>
                            <p>
                            <b>Supervisor: </b>Wei Chen, Yiqun Ma
                            </p>
                            <p>
                            <b>Manager: </b> Catherine Ma, Wei Zhang, Rusheng Pan
                            </p>
                            <p>
                            <b>Poetry Instructor: </b>Yichao Yao
                            </p>
                            <p>
                            <b>Editor:</b>Catherine Ma
                            </p>  
                            <p>
                            <b>Designer:</b>Catherine Ma, Wei Zhang
                            </p>
                            <p>
                            <b>Reciter: </b> Zihua Liu
                            </p>
                            <p>
                            <b>Data Analysis: </b>Rusheng Pan, Jianxu Chen, Shaojie Ye, Pengyang li, Siwei Tan, Yuxin Ma
                            </p>
                            <p>
                            <b>Web Developing: </b>Rusheng Pan, Siwei Tan, Pengyang Li, Yuhe Peng
                            </p>
                        </div>
                        }
                    </div>
                </div>
            </div>  
        )
    }
}
