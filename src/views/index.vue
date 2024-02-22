<template>
  <div class="app-container home">
    <el-space direction="vertical" :fill="true" size="large" wrap style="width: 100%;">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card card1" shadow="never">
            <div class="title">品类数量</div>
            <div class="text numbers">20</div>
            <el-divider />
            <div class="increase">今日新增 <sup>↝ 0</sup></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card card2" shadow="never">
            <div class="title">产品数量</div>
            <div class="text numbers">32</div>
            <el-divider />
            <div class="increase">今日新增 <sup>↝ 0</sup></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card card3" shadow="never">
            <div class="title">设备数量</div>
            <div class="text numbers">1012</div>
            <el-divider />
            <div class="increase">今日新增 <sup>↝ 0</sup></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card card4" shadow="never">
            <div class="title">上报数据量</div>
            <div class="text numbers">2921</div>
            <el-divider />
            <div class="increase">今日新增 <sup>↝ 0</sup></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card1" shadow="never">
            <template #header>
              <div class="card-header">
                <h3>设备数量统计</h3>
              </div>
            </template>
            <div class="chart-device-num" ref="chartDeviceNumStat"></div>
            <div style="position: absolute;left: 13%;top:50%;font-size: 30px;">11234</div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card1" shadow="never">
            <template #header>
              <div class="card-header">
                <h3>设备状态统计</h3>
              </div>
            </template>
            <el-row>
              <el-col :span="6">
                <div class="chart-device-online" ref="chartDeviceOnline"></div>
                <div class="dev-sub online">
                  在线设备<br />
                  <p>80%</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="chart-device-offline" ref="chartDeviceOffline"></div>
                <div class="dev-sub">离线设备</div>
              </el-col>
              <el-col :span="6">
                <div class="chart-device-active" ref="chartDeviceActive"></div>
                <div class="dev-sub">待激活设备</div>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card1" shadow="never">
            <template #header>
              <div class="card-header">
                <h3>消息量统计</h3>
              </div>
            </template>
            <div class="chart-msg-stat" ref="chartMsgStat"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-space>
  </div>
</template>

<script setup name="Index" lang="ts">
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent, TitleComponent, ToolboxComponent, GridComponent } from 'echarts/components'
import { PieChart, LineChart, GaugeChart } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  UniversalTransition,
  GaugeChart,
])
const chartDeviceNumStat = ref()
const chartDeviceOnline = ref()
const chartDeviceOffline = ref()
const chartDeviceActive = ref()
const chartMsgStat = ref()

const goTarget = (url: string) => {
  window.open(url, '__blank')
}

onMounted(() => {
  document.getElementById('breadcrumb-container')!.style.display = 'none'

  echarts.init(chartDeviceNumStat.value).setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      right: '10%',
      align: 'left',
      orient: 'vertical',
      icon: 'circle',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        center: ['30%', '50%'],
        label: {
          show: false,
          position: 'outside',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '一路开关' },
          { value: 735, name: '插座' },
          { value: 580, name: '二路开关' },
          { value: 484, name: '门磁' },
          { value: 300, name: '门锁' },
          { value: 300, name: '水表' },
          { value: 300, name: '电表' },
          { value: 300, name: '水泵' },
          { value: 220, name: '智能风扇' },
          { value: 300, name: '调光灯' },
        ],
      },
    ],
  })

  echarts.init(chartDeviceOnline.value).setOption({
    series: [
      {
        type: 'gauge',
        startAngle: 360,
        endAngle: 0,
        progress: {
          show: true,
          width: 12,
          itemStyle: {
            color: '#00dd99',
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, '0'],
          formatter: function (value) {
            return value + '个'
          },
        },
        data: [
          {
            value: 82,
          },
        ],
      },
    ],
  })

  echarts.init(chartDeviceOffline.value).setOption({
    series: [
      {
        type: 'gauge',
        startAngle: 360,
        endAngle: 0,
        progress: {
          show: true,
          width: 12,
          itemStyle: {
            color: '#ff5500',
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, '0'],
          formatter: function (value) {
            return value + '个'
          },
        },
        data: [
          {
            value: 14,
          },
        ],
      },
    ],
  })

  echarts.init(chartDeviceActive.value).setOption({
    series: [
      {
        type: 'gauge',
        startAngle: 360,
        endAngle: 0,
        progress: {
          show: true,
          width: 12,
          itemStyle: {
            color: '#0055bb',
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, '0'],
          formatter: function (value) {
            return value + '个'
          },
        },
        data: [
          {
            value: 3,
          },
        ],
      },
    ],
  })

  echarts.init(chartMsgStat.value).setOption({
    title: {},
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['上行消息量', '下行消息量'],
      textStyle: {
        fontWeight: 'bolder',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['02-01', '02-02', '02-03', '02-04', '02-05', '02-06', '02-07'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '上行消息量',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '下行消息量',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Microsoft YaHei';
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }

  .box-card {
    background-position-x: right;
    background-repeat: no-repeat;

    :first-child {
      padding: 0px 8px 0px !important;
      min-height: 0px;
    }
    .title {
      font-size: 18px;
      line-height: 50px;
      font-weight: bold;
      color: #999;
    }
    .numbers {
      font-size: 38px;
      font-weight: bold;
      padding-left: 10px;
    }
    .increase {
      padding: 0 10px 15px 10px;
      font-weight: bold;
      color: #999;
      sup {
        font-size: 20px;
        color: #00dd00;
      }
    }
  }

  .box-card.card1 {
    background-image: url('@/assets/images/index/card1.png');
  }

  .box-card.card2 {
    background-image: url('@/assets/images/index/card2.png');
  }

  .box-card.card3 {
    background-image: url('@/assets/images/index/card3.png');
  }

  .box-card.card4 {
    background-image: url('@/assets/images/index/card4.png');
  }

  .box-card1 {
    :first-child {
      padding: 0px 8px 0px !important;
      min-height: 0px;
    }
  }

  .chart-device-num {
    height: 200px;
  }
  .chart-device-online,
  .chart-device-offline,
  .chart-device-active {
    height: 120px;
  }
  .chart-msg-stat {
    height: 250px;
  }

  .dev-sub {
    height: 80px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }

  .dev-sub.online {
    p {
      color: #00dd99;
    }
  }
}
</style>
