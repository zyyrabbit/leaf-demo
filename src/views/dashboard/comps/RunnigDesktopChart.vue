<template>
  <el-card class="dashboard-card chapter-title">
    <strong slot="header">桌面运行情况</strong>
    <el-row>
      <el-col :xs="24" :md="16"  class="desktop-chart">
        <div id="mountNode"></div>
        <skeleton v-if="isLoading" type="bar" :count="5"></skeleton>
        <div v-if="!isLoading&& runningDesktopTabledata.length ===0">暂无数据</div>
      </el-col>
      <el-col :xs="24" :md="8"  class="desktop-table">
        <el-table
          v-show="!isLoading && runningDesktopTabledata.length>0"
          :data="runningDesktopTabledata"
        >
          <el-table-column prop="type" label="类别"></el-table-column>
          <el-table-column prop="personalDesktopVal" label="专属桌面"></el-table-column>
          <el-table-column prop="shareDesktopVal" label="共享桌面"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>
<script lang="ts">
import  *  as HTTP_GENERAL from '@/mocks/dashboard.ts';
import G2 from '@antv/g2';
import { Component, Vue } from 'vue-property-decorator';
import skeleton from './skeleton.vue';

@Component({
  components: {
    skeleton,
  },
})
export default class RunnigDesktopChart extends Vue {
  public isLoading: boolean = true;
  public runningDesktopTabledata: any[] = [];
  public mounted() {
    this.getRunningDesktop();
  }
  // 获取桌面运行情况
  public async getRunningDesktop() {
    try {
      const r = HTTP_GENERAL.getRunningDesktop;
      if (r.code === 0) {
        const data = this.formatRunningDesktop(r.data);
        // this.renderDesktopDetail(data);
        this.renderDesktopDetailVertical(data);
      }
    } catch (e) {
    } finally {
      this.isLoading = false;
    }
  }

  public formatRunningDesktop(data: any) {
    const {
      plannedMaxDesktopNum,
      freedomDesktopNum,
      createdDesktopNum,
      assignedDesktopNum,
    } = data;

    let chartData: any = [];
    let tableData: any = [];

    // 装配数据,chartData-绘图。tableData-制表
    function assemble(desktopStatusArr: object[], name: string) {
      const tempArr: any = [];
      let _personalDesktopVal: number = 0;
      let _shareDesktopVal: number = 0;
      desktopStatusArr.forEach((item: any) => {
        if (item.userMode === 0) {
          _personalDesktopVal = item.desktopNum;
        }
        if (item.userMode === 1) {
          _shareDesktopVal = item.desktopNum;
        }
        tempArr.push({
          type: name,
          opinion: item.userMode === 0 ? '专属桌面' : '共享桌面',
          value: item.desktopNum,
        });
      });

      tableData.push({
        type: name,
        personalDesktopVal: _personalDesktopVal,
        shareDesktopVal: _shareDesktopVal,
      });
      return tempArr;
    }

    const res = chartData
      .concat(assemble(plannedMaxDesktopNum, '总规划'))
      .concat(assemble(createdDesktopNum, '已创建'))
      .concat(assemble(assignedDesktopNum, '已分配'))
      .concat(assemble(freedomDesktopNum, '闲置中'));

    // 表格数据
    this.runningDesktopTabledata = tableData;
    return res;
  }

  // 绘制桌面运行情况 - 横向
  public renderDesktopDetail(dv: any) {
    const colorMap = {
      专属桌面: '#3AA0FF',
      共享桌面: '#975FE4',
    };

    const chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 200,
      padding: 'auto',
    });
    chart.source(dv);
    // 垂直堆叠 变为 水平堆叠
    chart.coord('rect').transpose();
    chart.axis('value', {
      label: {
        formatter: val => {
          return '';
        },
      },
    });
    chart
      .intervalStack()
      .position('type*value')
      .color('opinion', function(opinion: '专属桌面' | '共享桌面') {
        return colorMap[opinion];
      })
      .label('value', function(val: any) {
        var offset = -4;
        var shadowBlur = 2;

        var fill = 'white';
        return {
          position: 'middle',
          offset: offset,
          textStyle: {
            fill: fill,
            shadowBlur: shadowBlur,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
          formatter: (text: any, item: any, index: any) => {
            if (text == 0) {
              return '';
            }
            return text;
          },
        };
      });
    chart.render();
  }

  // 绘制桌面运行情况 - 纵向分组

  public renderDesktopDetailVertical(dv: any) {
    const colorMap = {
      专属桌面: '#3AA0FF',
      共享桌面: '#fbc24c',
    };
    var chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 200,
      padding: [40, 5, 70, 60],
    });
    chart.source(dv);


    chart.scale('value', {
      alias: '桌 面 数 量'
    });

    chart.axis('type', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
      tickLine: {
        length: 0,
      },
    });

    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
      title: {
        offset: 50,
      },
    });

    chart
      .interval()
      .position('type*value')
      .color('opinion', function(opinion: '专属桌面' | '共享桌面') {
        return colorMap[opinion];
      })
      .label('value')
      .opacity(1)
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1 / 32,
        },
      ]);
    chart.render();
  }
}
</script>
<style lang="scss" scoped>
.dashboard-card {
  margin-top: 16px;
  height: 470px;
  .el-table {
    margin-top: 0;
    margin-bottom: 0;
  }
  .desktop-chart,
  .desktop-table {
    width: 100%;
  }
}
// 小分辨率时，分为两行显示桌面和资源
@media screen and (max-width: 1500px) {
  .dashboard-card {
    height: 270px;
    .desktop-chart {
      width: 60%;
      padding-right: 30px;
    }
    .desktop-table {
      width: 40%;
    }
  }
}

//
</style>
