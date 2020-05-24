function bubbleChart() {
    const width  = 280;
    const height = 580;
    const centre = { x: width/2, y: height/2 };
    //该参数表示气泡出来时候的引力大小，也就是控制快慢的，可以根据宽高具体调整
    const forceStrength = 0.02;
  
    // these will be set in createNodes and chart functions
    let svg     = null;
    let bubbles = null;
    let labels  = null;
    let nodes   = [];
    function charge(d) {
      return Math.pow(d.radius, 2.0) * 0.01
    }
    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(charge))
      // .force('center', d3.forceCenter(centre.x, centre.y))
      .force('x', d3.forceX().strength(forceStrength).x(centre.x))
      .force('y', d3.forceY().strength(forceStrength).y(centre.y))
      .force('collision', d3.forceCollide().radius(d => d.radius + 5));
  
    // force simulation starts up automatically, which we don't want as there aren't any nodes yet
    simulation.stop();
  
    // data manipulation function takes raw data from csv and converts it into an array of node objects
    // each node will store data and visualisation values to draw a bubble
    // rawData is expected to be an array of data objects, read in d3.csv
    // function returns the new node array, with a node for each element in the rawData input
    // 根据原始数据创建漂浮
    function createNodes(rawData) {
      const maxSize     = d3.max(rawData, d => +d.size);
      const radiusScale = d3.scaleSqrt()
        .domain([5, maxSize])
        //此参数控制气泡的大小，表示气泡的半径范围
        .range([5, 50])
  
      const myNodes = rawData.map(d => ({
        ...d,
        radius: radiusScale(+d.size),
        size  : +d.size,
        x     : Math.random() * width,
        y     : Math.random() * height
      }))
      return myNodes;
    }
    function getData() {
          //这里我使用了jquery,dom操作感觉比较方便
          // alert($(this)[0]);
          // alert(Object.keys($(this)))
          var tag = $(this)['context']['__data__']['id']
          console.log(tag)
          window.parent.cleanNote();
          window.parent.initContent();
          window.parent.closePageslide();
          window.parent.getTagList(tag);
          // alert(Object.keys($(this)['context']['__data__']))
  
      }
    function onMouseMove() {
  
             // this would work, but not when its called in a function
            //  console.log(typeof(this))
            //  console.log(Object.keys(this))
            //  console.log(this['__on'])
            d3.select(this)
            .attr('stroke', d => '#FF1493')
            // .attr('fill','#FF1493')
            // .attr('fill', 'red')
            // console.log(d3.select(this).style("fill"))
            // console.log(1)
            // d3.select(this).style("fill", "red");
            // console.log(2)
            // console.log(d3.select(this).style("fill"))

  
    }
    function onMouseOut(){
      d3.select(this)
            .attr('stroke', 'none')
            // .attr('fill','#3CB371')
            // .style('fill', '#3CB371')

    }
    // selector为容器，后面为原始数据
    let chart = function chart(selector, rawData) {
      nodes = createNodes(rawData);
      svg   = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      const elements = svg.selectAll('.bubble')
        .data(nodes, d => d.id)
        .enter()
        .append('g')
        .on("click", getData)
        .on('mousemove', onMouseMove)
        .on('mouseout', onMouseOut)
        
  
      //Container for the gradients
      var defs   = svg.append("defs");
      var filter = defs.append("filter")
        .attr("id","glow");
  
      filter.append("feGaussianBlur")
        .attr("class", "blur")
        .attr("stdDeviation","4")
        .attr("filterUnits","userSpaceOnUse")
        .attr("result","coloredBlur");
  
      var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in","coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in","SourceGraphic");
  
      bubbles = elements
        .append('circle')
        .classed('bubble', true)
        .attr('r', d => d.radius)
        .attr('fill', d => 'transparent')
        .attr('stroke', d => '#3CB371')
      labels = elements
        .append('text')
        .style('fill', '#3CB371')
      labels1 = labels
        .append('tspan')
        .attr('dy', '-0.1em')
        .style('text-anchor', 'middle')
        .style('font-size', 10)
        .text(d => {
          //加此判断是避免字数太多而气泡的半径太小，盛不下
          if(d.size>100){
            return d.id
          }
        })
      // 下面文字的标题大小
      labels2 = labels
        .append('tspan')
        .attr('dy', '1.1em')
        .style('text-anchor', 'middle')
        .style('font-size', 12)
        .text(d => {
          //加此判断是避免字数太多而气泡的半径太小，盛不下，现在只能根据数值大小判断，这一点感觉不科学，应该根据半径判断
          if(d.size>100){
            return d.groupid
          }
        })
      simulation.nodes(nodes)
        .on('tick', ticked)
        .restart();
  
      d3.selectAll("circle")
          .style("filter","url(#glow)");
    }
    function ticked() {
      bubbles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y)
      labels1
        .attr('x', d => d.x)
        .attr('y', d => d.y)  
      labels2
        .attr('x', d => d.x)
        .attr('y', d => d.y)  
    }
    return chart;
  }
  
  // new bubble chart instance
  let myBubbleChart = bubbleChart();
//   const datadata      = [
//     {id:'北京',groupid:'24.32%',size:900},
//     {id:'河北',groupid:'16.48%',size:610},
//     {id:'山东',groupid:'12.7%',size:470},
//     {id:'广东',groupid:'10.81%',size:400},
//     {id:'新疆',groupid:'10.81%',size:400},
//     {id:'人工智能',groupid:'8.1%',size:300},
//     {id:'云南',groupid:'8.1%',size:300},
//     {id:'云南',groupid:'8.1%',size:300},
//     {id:'湖南',groupid:'8.1%',size:300},
//     {id:'江苏智能',groupid:'1%',size:120},
//     {id:'浙江',groupid:'1%',size:120},
//     {id:'香港',groupid:'1%',size:130},
//   ]
  


var user = getParams("user");
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r   = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
if(user){
    console.log("树状结构");
    $.ajax({
        url : "http://127.0.0.1:8000/notes/getAllTags",
        data: {
            "user": user,
            },
        async   : true,            // 是否异步
        dataType: "JSON",
        success : function(data){
            console.log(data)
            datadata = data['data']['data']
            console.log(datadata)
            myBubbleChart('#bubble-box', datadata);
        },
        error:function(data){
            console.log(JSON.stringify(data));
        }
    })
}