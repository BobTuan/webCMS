// 对时间进行设置
function fnW(str) {
    var num;
    str >= 10 ? num = str : num = "0" + str;
    return num;
}
//获取当前时间
var timer = setInterval(function () {
    var date   = new Date();
    var year   = date.getFullYear();        //当前年份
    var month  = date.getMonth();           //当前月份
    var data   = date.getDate();            //天
    var hours  = date.getHours();           //小时
    var minute = date.getMinutes();         //分
    var second = date.getSeconds();         //秒
    var day    = date.getDay();             //获取当前星期几 
    var ampm   = hours < 12 ? 'am' : 'pm';
    $jq('#time').html(fnW(hours) + ":" + fnW(minute) + ":" + fnW(second));
    $jq('#date').html('<span>' + year + '/' + (month + 1) + '/' + data + '</span><span>' + ampm + '</span><span>周' + day + '</span>')

}, 1000)



var startColor       = ['#0e94eb', '#c440ef', '#efb013', '#2fda07', '#d8ef13', '#2e4af8', '#0eebc4', '#f129b1', '#17defc', '#f86363'];
var borderStartColor = ['#0077c5', '#a819d7', '#c99002', '#24bc00', '#b6cb04', '#112ee2', '#00bd9c', '#ce078f', '#00b2cd', '#ec3c3c'];



//入库量占比，带边框效果的饼图
function chart1() {
    //data 为模拟数据
    var data = [{
        name   : '阅读',
        value  : 192581,
        percent: '30.8721',
    }, {
        name   : '整理',
        value  : 215635,
        percent: '34.076',
    }];
    var myChart  = echarts.init(document.getElementById('pie'));
    var myChart1 = echarts.init(document.getElementById('pie1'));
    window.addEventListener('resize', function () {
        myChart.resize();
        myChart1.resize();
    });

    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += '<p><span><i class="legend" style="background:' + startColor[i] + '"></i></span>' + data[i].name + '<span class="pie-number" style="color:' + startColor[i] + '">' + data[i].value + '</span>' + Number(data[i].percent).toFixed(2) + '%</p>';
    }

    $jq('.pie-data').append(str);


    function deepCopy(obj) {
        if (typeof obj !== 'object') {
            return obj;
        }
        var newobj = {};
        for (var attr in obj) {
            newobj[attr] = obj[attr];
        }
        return newobj;
    }
    var xData = [],
        yData = [];
    data.map((a, b) => {
        xData.push(a.name);
        yData.push(a.value);
    });


    var RealData   = [];
    var borderData = [];
    data.map((item, index) => {
        var newobj  = deepCopy(item);
        var newobj1 = deepCopy(item);
        RealData.push(newobj);
        borderData.push(newobj1);
    });
    RealData.map((item, index) => {
        item.itemStyle = {
            normal: {
                color: {
                    type      : 'linear',
                    x         : 0,
                    y         : 0,
                    x2        : 0,
                    y2        : 1,
                    colorStops: [{
                        offset: 0,
                        color : startColor[index]  // 0% 处的颜色
                }, {
                        offset: 1,
                        color : startColor[index]  // 100% 处的颜色
                }],
                    globalCoord: false  // 缺省为 false
                },
            }
        }
    });
    borderData.map((item, index) => {
        item.itemStyle = {
            normal: {
                color: {
                    type      : 'linear',
                    x         : 0,
                    y         : 0,
                    x2        : 0,
                    y2        : 1,
                    colorStops: [{
                        offset: 0,
                        color : borderStartColor[index]  // 0% 处的颜色
                }, {
                        offset: 1,
                        color : borderStartColor[index]  // 100% 处的颜色
                }],
                    globalCoord: false  // 缺省为 false
                },
            }
        }
    });
    var option = {
        tooltip: {
            trigger: 'item',
            //            position: ['30%', '50%'],
            confine  : true,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
        // 主要展示层的
            {
                radius: ['50%', '85%'],
                center: ['50%', '50%'],
                type  : 'pie',
                label : {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                name: "阅读",
                data: RealData
        },
        // 边框的设置
            {
                radius: ['45%', '50%'],
                center: ['50%', '50%'],
                type  : 'pie',
                label : {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                animation: false,
                tooltip  : {
                    show: false
                },
                data: borderData
        }
    ]
    };

    myChart.setOption(option);
    myChart1.setOption(option);
}

chart1()


//阅读数据还是笔记数据
$jq("#barType").on('click', 'li', function () {
    $jq(this).addClass('active').siblings('li').removeClass('active');
    $jq('#barTitle').html($jq(this).html() + '数据');
    $jq('#tabBtn').data('state', $jq(this).data('value'));
    if ($jq(this).data('value') == 1) {
        $jq('.table1').eq(0).show().siblings('table').hide();
    } else if ($jq(this).data('value') == 2) {
        $jq('.table1').eq(1).show().siblings('table').hide();
    }
    chart3($jq(this).data('value'), 0);
    chart4(chart4Data, $jq(this).data('value'), 0);
})

//阅读还是笔记
$jq("#barTypes").on('click', 'li', function () {
    $jq(this).addClass('active').siblings('li').removeClass('active');
    $jq('#barTitles').html($jq(this).html() + '数据');
    $jq('#tabBtns').data('state', $jq(this).data('value'));
    if ($jq(this).data('value') == 1) {
        $jq('.table2').eq(0).show().siblings('table').hide();
    } else if ($jq(this).data('value') == 2) {
        $jq('.table2').eq(1).show().siblings('table').hide();
    }
    chart3($jq(this).data('value'), 1);
    chart4(chart4Data, $jq(this).data('value'), 1);

})

// 柱状图
function chart3(type, chartType) {
    var myChart  = echarts.init(document.getElementById('chart3'));
    var myCharts = echarts.init(document.getElementById('chart3s'));
    window.addEventListener('resize', function () {
        myChart.resize();
        myCharts.resize();
    });

    //    设置背景阴影的参数，获取数据的最大值

    var data; //横坐标数据，不动
    var data_; //模拟数据
    if (type == 1) {
        data_ = [{
                name : "入库件",
                value: 584
            },
            {
                name : "滞留件",
                value: 152
            }, {
                name : "丢失件",
                value: 100
            },
            {
                name : "正常件",
                value: 689
            },
            {
                name : "派送件",
                value: 200
            }, {
                name : "自提件",
                value: 121
            }, {
                name : "退签件",
                value: 92
            }]
    } else if (type == 2) {
        data_ = [{
                name : "入库件",
                value: 568
                }, {
                name : "丢失件",
                value: 287
                }]
    }
    var series_data; //绘制图表的数据
    //绘制图表
    var yMax = 0;
    for (var j = 0; j < data_.length; j++) {
        if (yMax < data_[j].value) {
            yMax = data_[j].value;
        }
    }
    var dataShadow = [];
    for (var i = 0; i < 10; i++) {
        dataShadow.push(yMax * 2);
    }

    if (type == 1) {
        data = ['入库件', '在库件'];

        if (chartType == '') {
            $jq(' .dph-data1').html(data_[0].value);
            $jq(' .dph-data2').html(data_[1].value + data_[3].value);
            $jq(' .dph-data3').html(data_[3].value);
            $jq(' .dph-data4').html(data_[2].value);
            $jq(' .dph-data5').html(data_[1].value);
            $jq(' .dph-data6').html(data_[4].value + data_[5].value);
            $jq(' .dph-data7').html(data_[4].value);
            $jq(' .dph-data8').html(data_[5].value);
            $jq(' .dph-data9').html(data_[6].value);
        } else if (chartType == 0) {
            $jq('.table1 .dph-data1').html(data_[0].value);
            $jq('.table1 .dph-data2').html(data_[1].value + data_[3].value);
            $jq('.table1 .dph-data3').html(data_[3].value);
            $jq('.table1 .dph-data4').html(data_[2].value);
            $jq('.table1 .dph-data5').html(data_[1].value);
            $jq('.table1 .dph-data6').html(data_[4].value + data_[5].value);
            $jq('.table1 .dph-data7').html(data_[4].value);
            $jq('.table1 .dph-data8').html(data_[5].value);
            $jq('.table1 .dph-data9').html(data_[6].value);
        } else if (chartType == 1) {
            $jq('.table2 .dph-data1').html(data_[0].value);
            $jq('.table2 .dph-data2').html(data_[1].value + data_[3].value);
            $jq('.table2 .dph-data3').html(data_[3].value);
            $jq('.table2 .dph-data4').html(data_[2].value);
            $jq('.table2 .dph-data5').html(data_[1].value);
            $jq('.table2 .dph-data6').html(data_[4].value + data_[5].value);
            $jq('.table2 .dph-data7').html(data_[4].value);
            $jq('.table2 .dph-data8').html(data_[5].value);
            $jq('.table2 .dph-data9').html(data_[6].value);
        }

        series_data = [
            { // For shadow
                type      : 'bar',
                barWidth  : 20,
                xAxisIndex: 2,
                tooltip   : {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(14, 148, 235, 0.102)'
                    }
                },
                data     : dataShadow,
                animation: false
            },
            {
                name      : '入库件',
                type      : 'bar',
                barGap    : '-100%',
                barWidth  : '40%',
                xAxisIndex: 1,
                itemStyle : {
                    normal: {
                        color: '#0e94eb'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [data_[0], 0, 0, 0, 0],
            },
            {
                name      : '滞留件',
                type      : 'bar',
                stack     : '在库件',
                xAxisIndex: 1,
                itemStyle : {
                    normal: {
                        color: 'rgba(239,176,19,.9)'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [0, data_[1], 0, 0, 0],
            }
        ]


    } else if (type == 2) {
        data = ['入库件', '在库件', '出库件', '丢失件', '撤销件'];
        if (chartType == '') {
            $jq('.mail-data1').html(data_[0].value);
            $jq('.mail-data2').html(data_[2].value + data_[5].value);
            $jq('.mail-data3').html(data_[1].value);
            $jq('.mail-data4').html(data_[2].value);
            $jq('.mail-data5').html(data_[3].value);
            $jq('.mail-data6').html(data_[4].value);
            $jq('.mail-data7').html(data_[5].value);
        } else if (chartType == 0) {
            $jq('.table1 .mail-data1').html(data_[0].value);
            $jq('.table1 .mail-data2').html(data_[2].value + data_[5].value);
            $jq('.table1 .mail-data3').html(data_[1].value);
            $jq('.table1 .mail-data4').html(data_[2].value);
            $jq('.table1 .mail-data5').html(data_[3].value);
            $jq('.table1 .mail-data6').html(data_[4].value);
            $jq('.table1 .mail-data7').html(data_[5].value);
        } else if (chartType == 1) {
            $jq('.table2 .mail-data1').html(data_[0].value);
            $jq('.table2 .mail-data2').html(data_[2].value + data_[5].value);
            $jq('.table2 .mail-data3').html(data_[1].value);
            $jq('.table2 .mail-data4').html(data_[2].value);
            $jq('.table2 .mail-data5').html(data_[3].value);
            $jq('.table2 .mail-data6').html(data_[4].value);
            $jq('.table2 .mail-data7').html(data_[5].value);
        }

        series_data = [
            { // For shadow
                type      : 'bar',
                barWidth  : 20,
                xAxisIndex: 2,
                tooltip   : {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(14, 148, 235, 0.102)'
                    }
                },
                data     : dataShadow,
                animation: false
            },
            {
                name      : '入库件',
                barGap    : '-100%',
                barWidth  : '40%',
                type      : 'bar',
                xAxisIndex: 1,
                itemStyle : {
                    normal: {
                        color: '#0e94eb'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [data_[0], 0, 0, 0, 0],
            },
            {
                name      : '正常件',
                type      : 'bar',
                stack     : '在库件',
                xAxisIndex: 1,
                itemStyle : {
                    normal: {
                        color: 'rgba(239,176,19,.9)'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [0, data_[5], 0, 0, 0, 0],
                },
            {
                name      : '丢失件',
                type      : 'bar',
                xAxisIndex: 1,
                itemStyle : {
                    normal: {
                        color: 'rgba(239,176,19,.9)'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [0, 0, 0, data_[1], 0],
                    },
            {
                name      : '滞留件',
                type      : 'bar',
                xAxisIndex: 1,
                stack     : '在库件',
                itemStyle : {
                    normal: {
                        color: 'rgba(239,176,19,0.4)'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },

                data: [0, data_[2], 0, 0, 0],
                    },
            {
                name      : '撤销件',
                type      : 'bar',
                xAxisIndex: 1,
                itemStyle : {
                    normal: {
                        color: 'rgba(239,176,19,0.3)'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [0, 0, 0, 0, data_[3]],
                    },
            {
                name      : '出库件',
                type      : 'bar',
                xAxisIndex: 1,
                stack     : '退签件',
                itemStyle : {
                    normal: {
                        color: 'rgba(196,64,239,0.8)'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [0, 0, data_[4], 0, 0],
                    }

                    ]
    }

    var option = {
        title: '',
        grid : {
            top         : '10%',
            containLabel: true
        },
        tooltip: {
            show: true
        },
        xAxis: [{
                type     : 'category',
                show     : false,
                data     : data,
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            {
                type       : 'category',
                position   : "bottom",
                data       : data,
                boundaryGap: true,
                // offset: 40,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            {
                show     : false,
                data     : dataShadow,
                axisLabel: {
                    inside   : true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
        },
        ],
        yAxis: [{
                show     : true,
                splitLine: {
                    show     : false,
                    lineStyle: {
                        color: "#0e94eb"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show : true,
                    color: '#0e94eb'
                }
        }, {
                show         : false,
                type         : "value",
                nameTextStyle: {
                    color: '#0e94eb'
                },
                axisLabel: {
                    color: '#0e94eb'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
        },
            {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
                }],
        //        color: ['#e54035'],
        series: series_data
    }
    if (chartType === '') {
        myChart.clear();
        myCharts.clear();
        myChart.setOption(option);
        myCharts.setOption(option);
    } else if (chartType === 0) {
        myChart.clear();
        myChart.setOption(option);
    } else if (chartType === 1) {
        myCharts.clear();
        myCharts.setOption(option);
    }
}
// 默认显示笔记数据
chart3(1, '')
//更新显示的数据
$jq('#switchBtn').on('click', 'span', function () {
    $jq(this).addClass('active').siblings().removeClass('active');
    if ($jq(this).data('datatype') == 'income') {
        $jq('#totalProfit').html('100');
    } else if ($jq(this).data('datatype') == 'expend') {
        $jq('#totalProfit').html('200');
    }
})