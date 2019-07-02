<template>
  <el-card class="dashboard-card line-height-400 chapter-title">
    <strong slot="header">桌面分类占比</strong>
    <el-radio-group v-model="flavorType" @change="onFlavorTypeChange">
      <el-radio-button label="-1">全部</el-radio-button>
      <el-radio-button label="0">专属</el-radio-button>
      <el-radio-button label="1">共享</el-radio-button>
    </el-radio-group>
    <div id="pipeChart"></div>
  </el-card>
</template>
<script lang="ts">
import  *  as HTTP_GENERAL from '@/mocks/dashboard.ts';
import G2 from '@antv/g2';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FlavorChart extends Vue {
  public isLoading: boolean = true;
  public flavorType: string = '-1';
  public desktopModeChart: any = {};
  public desktopModes = [];
  public flavorTitle = '--';

  public mounted() {
    this.desktopModeChart = new G2.Chart({
      container: 'pipeChart',
      forceFit: true,
      height: 300,
      padding: [0, 200, 0, 0],
    });
    this.getflavorAndOrg();
  }

  // 获取桌面分类占比
  public async getflavorAndOrg() {
    const params = {
      userMode: this.flavorType,
    };
    try {
      const r =  HTTP_GENERAL.getflavorAndOrg;
      if (r.code === 0) {
        const { orgMembers, desktopModes, desktopNumOfOrg } = r.data.data;
        this.flavorTitle = desktopModes.length > 0 ? '模板占比' : '暂无数据';
        this.desktopModes = this.formatFlavor(desktopModes);
        this.renderChart(this.desktopModes);
      }
    } catch (e) {
    } finally {
      this.isLoading = false;
    }
  }
  // 绘制
  public renderChart(desktopModes: any) {
    const chart = this.desktopModeChart;
    chart.source(desktopModes);
    chart.legend({
      useHtml: true,
      flipPage: true,
      position: 'right',
      title: {
        text: '图例可滚动',
      },
      'g2-legend-marker': {
        borderRadius: 'none',
      },
      'g2-legend-title': {
        fontSize: '12px',
        fontWeight: 500,
        margin: 0,
        color: '#ff8800',
      },
    });
    chart.tooltip({
      showTitle: false,
    });
    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6,
      startAngle: (-1 * Math.PI) / 2,
      endAngle: (3 * Math.PI) / 2,
    });
    chart
      .intervalStack()
      .position('count')
      .color('模板名称', [
        '#4CA7FB',
        '#FBC24C',
        '#AD86E3',
        '#F79DD8',
        '#E44E2D',
        '#64AB4B',
      ])
      .opacity(1);

    chart.guide().html({
      position: ['50%', '50%'],
      html: `<div class="g2-guide-html"><p class="title">${
        this.flavorTitle
      }</p><p class="value"> </p></div>`,
    });
    chart.on('interval:mouseleave', function() {});
    chart.render();
  }
  // 格式化数据
  public formatFlavor(flavorData: any) {
    const MAX_COUNT = 10; // 超过此数,累加记为其他
    flavorData.forEach((x: any) => {
      x['模板名称'] = x.flavorName;
    });

    const flavorDataTop10 = flavorData.slice(0, MAX_COUNT);
    const flavorDataOthers = flavorData.slice(MAX_COUNT);

    if (flavorDataOthers.length > 0) {
      let sum = 0;
      flavorDataOthers.forEach((x: any) => {
        sum += x.count;
      });
      flavorDataTop10.push({
        模板名称: '其他',
        count: sum,
      });
    }
    return flavorDataTop10;
  }
  public onFlavorTypeChange() {
    this.desktopModeChart.clear();
    this.getflavorAndOrg();
  }

  public beforeDestroy() {
    this.desktopModeChart.destroy();
  }
}
</script>
