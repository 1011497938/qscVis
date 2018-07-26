import React, {Component} from 'react';
import * as d3 from 'd3';
import CiCloud from 'component/ciCloud';
import ObjectLine from 'component/objectLine';
import MapView from 'component/mapView';
import StoryView from 'component/storyView';
import SonicView from 'component/sonicView';
import TitleDistrib from 'component/titleDistrib';
import FreqLine from 'component/FreqLine';

import sStore from 'store/sstore';
import { observer } from "mobx-react";
import title0 from '../../../res/万水千山走遍.png' 
import title1 from '../../../res/草木皆有情.png' 
import title2 from '../../../res/春风化雨.png' 
import data_news from '../../../res/数据新闻logo.png' 
import zju_vag from '../../../res/ZJU_VAG_logo.png' 


@observer
export default class Home extends Component {
    componentDidMount(){
    }

    render() {
        const bg = {
            background: `url(${require("../../../res/background.png")})`,
            width: '1920px',
            height: '8959px',
            // backgroundSize: '100%'
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'space-around',
            // alignItems: 'center'
        }
        const text_size = 18
        const text_line_height = 1.5*text_size
        return (
            <div style = { bg }>

                <div id="title" style = {{
                    position:'absolute',
                    top: '237px',
                    left: '900px',
                    width: '108px',
                    color: 'black',
                    fontSize: '60px',
                    fontFamily: 'W9',
                    fontWeight: 'bold',
                    writingMode : 'tb-rl'
                }}>
                    宋词缱绻，何处画人间
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '1191px',
                    left: '848px',
                    width: '518px', 
                    }}>
                    <p>
                    新华网数据新闻联合浙江大学可视化小组研究团队，
                    以《全宋词》为样本，挖掘描绘出两宋319年间，
                    那些闪光词句背后众多优秀词人眼中的大千世界。
                    项目历时一个月，分析词作近21000首、词人近1330家、词牌近1300个，
                    挖掘数据纬度涵盖词作者、词作所属词牌名、意象及其所承载的情绪。
                    </p>
                </div>

                <div className="label-text" style = {{
                    position:'absolute',
                    top: '1686px',
                    left: '1301px',
                    width: '260px', 
                    }}>
                    <p>
                        图《清明上河图（局部）》张择端&nbsp;北宋
                    </p>
                </div>
                <div className="label-text" style = {{
                    position:'absolute',
                    top: '4651px',
                    left: '780px',
                    width: '180px', 
                    }}>
                    <p>
                        图《全宋词》词频统计结果
                    </p>
                </div>
                <div className="label-text" style = {{
                    position:'absolute',
                    top: '5020px',
                    left: '1383px',
                    width: '178px', 
                    }}>
                    <p>
                        图《全宋词》常见意象统计
                    </p>
                </div>
                <div className="label-text" style = {{
                    position:'absolute',
                    top: '7302px',
                    left: '1144px',
                    width: '11.5%', 
                    }}>
                    <p>
                        图《全宋词》词牌与词人数量统计
                    </p>
                </div>
                <div style = {{
                    position:'absolute',
                    top: '1770px',
                    left: '751px',
                    width: '277px', 
                    }}>
                    <img src={ title0 } />
                </div>
                <div className='sub-title' style = {{
                    position:'absolute',
                    top: '1770px',
                    left: '771px',
                    width: '277px', 
                    }}>
                    万水千山走遍
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '1877px',
                    left: '848px',
                    width: '518px', 
                    }}>
                    <p>
                    宋代词人，大多走仕途。
                    </p>
                    <p>
                    自宋太祖立下“不可杀士大夫”的遗诏，士大夫在宋朝得到了最大限度的尊重和培养。
                    宋代可考的词人，多数在25岁上下的年纪即入仕并终身从政。
                    为官游历、体察民情的经验是丰富的创作素材，因而他们的作品中充满了对生活细节的品读，
                    充满画面感。杭州是词人最常造访之地。从柳永楼台上酒杯里的秋水夕阳，
                    到苏轼笔下风味堂的野菊、剑潭桥的荷叶，再到辛弃疾泛舟西子湖上、“一舸弄烟雨”，
                    杭州的繁华富饶，延续了整个宋朝。
                    </p>
                </div>
                <div 
                    id="map-view"
                    style={{
                        position:'absolute',
                        top:'2150px',
                        left:'500px'
                    }}
                    >
                    <MapView author={sStore.author}/>
                </div>

                <div 
                    id="storyView"
                    style={{
                        position:'absolute',
                        top: '2787px',
                        left: '260px'
                    }}
                    >
                    <StoryView authors = {sStore.authors_story}/>
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '3198px',
                    left: '848px',
                    width: '518px', 
                    }}>
                    <p>
                    杜甫所言“文章憎命达”在宋代亦有所证，以北宋苏轼、南宋辛弃疾为最。
                    苏轼未能延续初入仕途的光芒，一贬再贬，却从未丧失斗志。他用激越的词句书写沿途的人间万象，
                    使得词脱离辅助宴曲的狭窄角色，也能如诗一样承载家国情怀。
                    自此，继柳永“执手相看泪眼，竟无语凝噎”的婉约词之后，苏轼开创了“人生如梦，一尊还酹江月”的豪放词风先河。
                    </p>
                    <p>
                    到了南宋，有辛弃疾与之呼应，并称“苏辛”。辛弃疾一生作词数量为唐宋词家之最，
                    《全宋词》中收录达629篇，人称“词中之龙”。他是少年抗金的仗剑侠士，却仕途坎坷，
                    恢复中原的壮志终生未报。因而他的作品，以“廉颇老矣，尚能饭否”继承豪放词风的同时，
                    又多了“玉壶光转，一夜鱼龙舞”的浪漫璀璨。
                    </p>
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '3584px',
                    left: '848px',
                    width: '518px', 
                    }}>
                    <p>
                    可就在这个“学而优则仕”的黄金年代，有一众隐士，终生淡泊名利，云游四海。
                    北宋初年有林逋，一生漫游于江淮一带，梅妻鹤子，淡泊名利。
                    南渡之后，有婉约词人姜夔，一生屡试不第、转徙江湖、贫困潦倒；
                    同时代还有豪放词人戴复古，游历于长江两岸，以“专业诗人”的身份体察民间疾苦。
                    </p>
                    <p>
                    公元1127年，金兵攻陷东京，北宋亡，南宋立。难民南迁，李清照亦被群起的慌乱裹挟着避乱江南，
                    前半生的优雅诗意就此打破。不再有“浓睡不消残酒”的安逸，也无暇顾及落花春雨，丈夫病逝，家财尽失：
                    千古第一才女就这样守着涩酒苦茶、冷雨寒窗，度过了“凄凄惨惨戚戚”的人生后半程。
                    </p>
                </div>

                <div style = {{
                    position:'absolute',
                    top: '3960px',
                    left: '583px',
                    width: '445px', 
                    }}>
                    <img src={ title1 } />
                </div>
                <div className='sub-title' style = {{
                    position:'absolute',
                    top: '3970px',
                    left: '603px',
                    width: '445px', 
                    }}>
                    草木皆有情，词即人生
                </div>

                <div 
                    id="cloud"
                    style={{
                        position:'absolute',
                        top:'4050px',
                        left:'400px',
                    }}
                    >
                    <CiCloud />   
                </div>
                
                <div className="title-text" style = {{
                    position:'absolute',
                    top: '4707px',
                    left: '843px',
                    width: '518px', 
                    }}>
                    <p>
                    史书中的宋朝，士大夫主导朝廷和带领军队。
                    他们力避战争，多用谈判处理矛盾，使得这个积弱不振的朝代绵延三百余年之久。
                    大抵是文人治国所带动的书卷气氛，宋词总有或浓或淡的迷茫和愁情。
                    无论是柳永“酒醒何处”、陆游“梦断何处”还是李清照找寻“人何处”，
                    亦或是辛弃疾“梦里寻她千百度”，宋代词人好像在不停发问，而寻找的答案，便隐藏在这广袤人间。
                    </p>
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '5074px',
                    left: '843px',
                    width: '518px', 
                    }}>
                    <p>
                    宋代词人偏爱风，因为涌动的空气能承载多种情感：
                    吹散酒后的愁云、传递得志的欢欣，亦能推动战舰扬帆远航。
                    而宋词的绝妙之处正是在于其运用意象、借物抒怀的高超水准。
                    或许是“檀渊之盟”换来的百余年稳定使得城邦安于物产丰富的平原丘陵，
                    所以宋词惯常使用的意象中少有典故，多用花鸟草木、楼宇船舶等平淡景象。
                    在《全宋词》收录百篇以上的词人中，辛弃疾和吴文英最善用意象抒怀。
                    他们的年代，一个刚刚南渡，一个即将灭亡，一样的乱世，一样的思绪万千。
                    但前者力图建功立业，眼界宽广；后者终生隐逸，情感细腻雅致，人称“诗中李商隐”。
                    </p>
                    <p>
                    正所谓“以我观物，万物皆着我色彩”，透过意象看去，是宋代词人丰富的内心世界。
                    宋代是程朱理学的发源，主张修养本性、收敛欲望，因而整个文人阶层都沉浸在自省的氛围之中。
                    毕竟，万水千山走遍，冷暖人情历尽，叩问本心才是词人的真性情。
                    词人们常沉思，有时还挟带着现世的种种忧愁。
                    北宋晏几道，如其父晏殊，才华绝伦；少年中第，然家道中落，暮年沦为阶下囚。
                    他的世界，多沉浸在落花、春草、小楼之中回味情人相思。
                    而南宋末年的刘辰翁将思考上升为家国，一生著书立作，在山水草木之间安放无处施展的忠诚。
                    </p>
                </div>
                
                <div 
                    id="objectLine"
                    style={{
                        position:'absolute',
                        top:'5708px'
                    }}
                >
                    <ObjectLine />
                </div>
                
                <div style = {{
                    position:'absolute',
                    top: '6564px',
                    left: '615px',
                    width: '413px',
                    }}>
                    <img src={ title2 } />
                </div>
                <div className='sub-title' style = {{
                    position:'absolute',
                    top: '6574px',
                    left: '655px',
                    width: '413px',
                    }}>
                    春风化雨，历久弥新
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '6680px',
                    left: '848px',
                    width: '518px', 
                    }}>
                    <p>
                    李唐以来，词在五代十国的动荡纷扰中变得厚实坚硬，
                    终于在宋代登上大雅之堂，与唐诗并称“双绝”。
                    得益于其音乐天性，词跳脱出诗的严整对仗，自带独特的节奏感，
                    且遣词造句较之唐诗更加口语化，利于抒发情感，营造意境。
                    如同现代音乐使用“C大调”“g小调”等调式谱曲，词牌是配词吟唱的曲调。
                    它决定了词的格律，也就是词的平仄音韵和长短节拍。
                    《全宋词》共收录词牌约1300个，词牌浣溪沙、水调歌头、菩萨蛮、鹧鸪天和满江红使用最为频繁。
                    只可惜古曲早已失落，今人已无法聆听旧时被和曲而歌的宋词是何等绮丽动人了。
                    </p>
                </div>

                <div 
                    id="title-view"
                    style={{
                        position:'absolute',
                        top:'7000px',
                        left:'320px',
                    }}
                    >
                    <TitleDistrib />
                </div>

                <div style = {{
                    position:'absolute',
                    top: '4960px',
                    left:　'273px'
                    }}
                    id = "freq-line">
                    <FreqLine width={1470} height={32} />
                </div>

                <div className="title-text" style = {{
                    position:'absolute',
                    top: '7349px',
                    left: '848px',
                    width: '518px', 
                    }}>
                    <p>
                    本文筛选其中常见的词牌，基于词谱和意象分布将其下的著名词篇绘制出来，以期为宋词提供新的赏析角度。
                    </p>
                </div>

                <div 
                    id="sonicView"
                    style={{
                        position:'absolute',
                        top:'7500px',
                        left: '400px'
                    }}
                >
                    <SonicView />
                </div>

                <div style = {{
                    position:'absolute',
                    top: '8507px',
                    left: '487px',
                    width: '413px',
                    }}>
                    <img src={ data_news } />
                </div>
                <div style = {{
                    position:'absolute',
                    top: '8477px',
                    left: '670px',
                    width: '20px',
                    height: '152px'
                    }}>
                    <svg>
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="152"
                        stroke="#666"
                        strokeWidth="2"
                        strokeDasharray = "3 3"
                    />
                    </svg>
                </div>
                <div style = {{
                    position:'absolute',
                    top: '8477px',
                    left: '700px',
                    width: '413px',
                    }}>
                    <img src={ zju_vag } />
                </div>

                <div className="bottom-text" style = {{
                    position:'absolute',
                    top: '8477px',
                    left: '1002px',
                    width: '539px', 
                    }}>
                    <p>
                    监制：陈为，马秩群
                    </p>
                    <p>
                    统筹：马倩，张玮，潘如晟
                    </p>
                    <p>
                    技术指导：马昱欣
                    </p>
                    <p>
                    诗词指导：    
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
                    数据分析：陈建旭，李朋洋，谭思危，叶少杰
                    </p>
                    <p>
                    前端：陈建旭，李朋洋，谭思危，叶少杰，梁辰，谭小茜
                    </p>&nbsp;<p>
                    </p>
                    <p>
                    制作单位：浙江大学CAD&CG国家重点实验室 新华网
                    </p>
                    <p>
                    版权所有：浙江大学CAD&CG国家重点实验室 新华网股份有限公司
                    </p>
                    <p>
                    Copyright&copy;2000 - 2018 XINHUANET.com&nbsp;&nbsp;All Rights Reserved
                    </p>
                </div>

            </div>            
        )
    }
}
