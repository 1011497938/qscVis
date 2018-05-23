import React from 'react';
import * as d3 from 'd3';
export default class SonicLine extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static defaultProps = {
    width: 1920,
    height: 1000
  }

  componentDidMount() {
    const width = this.props.width,
      height = this.props.height
    let hxs = ["4411431", "1213311", "2133421", "3442244", "4123412", "1244321"],
    mjh = ["4411", "224", "1131", "243", "3124", "4214", "1212233", "1134224", "432", "21422", "114", "413", "243", "234", "224", "421", "444211", "4411234", "4233124", "422", "12412", "214"],
    sdgt = ["3211", "1324", "44", "431", "1232", "24323", "33411", "411411", "11422", "342114", "432243", "14442", "33413", "24421", "312", "134", "422", "4134", "2424222", "231122", "431221", "34322", "44223", "13421"],
    ssm = ["2244", "3311", "113311", "432224", "4211", "113343", "321", "3212", "443", "411", "444212", "342111", "243", "213211", "3112", "243121", "224143", "421", "3311", "444", "3142432"],
    yll = ["2214", "4323", "4311", "124324", "244", "2111", "231443", "42321", "444", "1311", "4322314", "1243122", "441", "34112", "113324", "234", "3124", "3412", "14223314", "4431312", "43221"],
    yyl = ["1311", "1224", "1424", "3412", "123433114", "2234", "2244", "244224", "312", "1133", "414323", "2133", "1211", "221234", "4212", "4124", "13214", "3123", "4224", "142143", "224", "2133", "4243"]

    let sonic = [hxs, mjh, sdgt, ssm, yll, yyl]

    let svg = d3
        .select(this.container)
        .append('svg')
        .attr('width',width)
        .attr('height',height)

    let basicLine = d3
        .line()
        .x(function (d) {
          return d.x
        })
        .y(function (d) {
          return d.y
        })

    let toneLine = basicLine.curve(d3.curveBasis)

    let ofs_x = width / 40,
      step = width / 130,
      step_y = height / sonic.length,
      ofs_y = step_y / 2,
      basic_fluct = step_y / 2 * 0.3

    let total = 4
    let color = ['#bbbbbb','#989898','#787878','#595959']
    let fill_color = 'rgba(89,89,89)'
    let opc = [0.2,0.3,0.4,0.5]
    let fluct = [-basic_fluct, -2*basic_fluct, -3*basic_fluct, -4*basic_fluct]
    sonic.forEach((s,k)=>{
      // for(let n = 0; n < total; n++){
      for(let n = total - 1; n > -1; n--){        
        let data = []
        let basic_line_data = 0        
        s.forEach((d, i) => {
          let arr = d.split('')
          let len = arr.length, tone = (n+1).toString(), flu = fluct[n]
          svg
            .append("path")
            .attr("d", toneLine([
              {x:ofs_x+basic_line_data, y:ofs_y + k * step_y},
              {x:ofs_x+basic_line_data+(len-1)*step, y:ofs_y + k * step_y}
            ]))
            .attr("stroke", 'black')
            .attr("stroke-width", 2)
            .attr("fill", "none")
          arr.forEach((v, j) => {
            if (v === tone) {
              let tmp = data.length
              if(tmp){
                data.push({
                  x: (data[tmp-1].x + ofs_x + basic_line_data + j * step )/2,
                  y: ofs_y + flu + k * step_y
                })  
                data.push({
                  x: ofs_x + basic_line_data + j * step,
                  y: ofs_y + k * step_y
                })  
                svg
                .append("path")
                .attr("d", toneLine([data[tmp-1],data[tmp],data[tmp+1]]))
                .attr("stroke", fill_color)
                .attr("stroke-width", 2)
                .attr("fill", fill_color)
                .attr("opacity",opc[1])
              }
              else{
                data.push({
                  x: ofs_x + basic_line_data + j * step,
                  y: ofs_y + k * step_y
                })
              }
            }
          })
          basic_line_data+=len*step
        })
      }
    })



  }

  render() {
    return (
      <div
        className="sonic-line"
        ref={ref => {
        this.container = ref;
      }}
        style={{
        width: this.props.width,
        height: this.props.height
      }}></div>
    );
  }
}
