<template>
  <el-card class="dashboard-card chapter-title">
    <strong slot="header">资源使用情况</strong>
    <el-row>
      <el-col :xs="24" :md="16"  class="quota-chart">
        <div id="quota-pipeChart1"></div>
        <skeleton v-if="isLoading" type="circle" :count="4"></skeleton>
        <div v-if="!isLoading&& quotaTableData.length ===0">暂无数据</div>
      </el-col>
      <el-col :xs="24" :md="16"  class="quota-table">
        <el-table v-show="quotaTableData.length>0" :data="quotaTableData">
          <el-table-column prop="quotaName" label="资源类别"></el-table-column>
          <el-table-column prop="hasUsedValueFix" label="已使用"></el-table-column>
          <el-table-column prop="sumValueFix" label="总额"></el-table-column>
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

interface QutotaDict {
  [propName: string]: any;
}

interface QutotaTable {
  quotaId: string;
  quotaName: string;
  hasUsedValue: number;
  sumValue: number;
  hasUsedValueFix: string;
  sumValueFix: string;
}

@Component({
  components: {
    skeleton,
  },
})
export default class QuotaChart extends Vue {
  public isLoading: boolean = true;
  public quotaTableData: any[] = [];
  public mounted() {
    this.getQuotaDetail();
  }
  // 获取配额使用详情
  public async getQuotaDetail() {
    try {
      const r = HTTP_GENERAL.getQuotaDetail;
      if (r.code === 0) {
        // this.quotaTableData = this.formatQuota(r.data.data);
        this.quotaTableData = this.formatQuota_new(r.data);
        this.$nextTick(() => {
          let data = this.quotaTableData.map((quota: any) => {
            return {
              id: quota.orderBy,
              type: quota.quotaName,
              value:
                quota.sumValue == 0
                  ? 100
                  : this.toFixed(
                      (quota.hasUsedValue / quota.sumValue) * 100,
                      0,
                    ),
            };
          });
          this.renderQuota(data);
        });
      }
    } catch (e) {
    } finally {
      this.isLoading = false;
    }
  }
  // 绘制配额资源百分比
  public renderQuota(data: any, lines: number = 1) {
    let chart = new G2.Chart({
      container: `quota-pipeChart${lines}`,
      forceFit: true,
      height: 200,
      padding: 'auto',
    });
    chart.source(data);
    chart.tooltip({
      showTitle: false,
    });
    chart.legend(false);
    chart.facet('rect', {
      fields: ['type'],
      padding: 20,
      showTitle: false,
      eachView: function eachView(view: any, facet: any) {
        const data = facet.data;
        const colorList = [
          '#3BA1FF',
          '#6AD389',
          '#FCDB56',
          '#F2637B',
          '#FBC24C',
          '#AD86E3',
          '#F79DD8',
          '#E44E2D',
        ];
        const color = colorList[data[0].id] || '#3BA1FF';
        data.push({
          type: '剩余配额',
          value: 100 - data[0].value,
        });
        view.source(data);
        view.coord('theta', {
          radius: 0.8,
          innerRadius: 0.7,
        });
        view
          .intervalStack()
          .position('value')
          .color('type', [color, '#eceef1'])
          .opacity(1);
        view.guide().html({
          position: ['50%', '50%'],
          html:
            '<div class="g2-guide-html"><p class="qouta-title">' +
            data[0].type +
            '</p><p class="qouta-value">' +
            (data[0].value + '%') +
            '</p></div>',
        });
      },
    });
    chart.render();
  }

  public formatQuota(qutotaData: any) {
    console.log('qutotaData: ', qutotaData);
    // 构造翻译字典
    let qutotaDict: QutotaDict = {};

    qutotaData.quotaDTOs.forEach((quotaDTO: any) => {
      qutotaDict[quotaDTO.quotaId] = quotaDTO;
    });

    // 构造全额数据
    qutotaData.tenantQuotaDTOs.forEach((tenantQuotaDTO: any) => {
      const id = tenantQuotaDTO.quotaId;
      qutotaDict[id].sumValueFix = `${tenantQuotaDTO.sumQuotaValue} ${
        qutotaDict[id].quotaUnit
      }`;
      qutotaDict[id].sumValue = tenantQuotaDTO.sumQuotaValue;
    });

    // 构造已经使用数据
    qutotaData.desktopFlavorInstDTOs.forEach((desktopFlavorInstDTO: any) => {
      const id = desktopFlavorInstDTO.quotaId;
      qutotaDict[id].hasUsedValueFix = `${desktopFlavorInstDTO.sumQuotaValue} ${
        qutotaDict[id].quotaUnit
      }`;
      qutotaDict[id].hasUsedValue = desktopFlavorInstDTO.sumQuotaValue;
    });

    let voList: any = [];
    // 全额数据List 和 已使用数据List 长度有可能不一致。需要做特殊处理
    for (const key of Object.keys(qutotaDict)) {
      if (
        qutotaDict[key].hasOwnProperty('sumValue') ||
        qutotaDict[key].hasOwnProperty('hasUsedValue')
      ) {
        if (!qutotaDict[key].hasOwnProperty('sumValue')) {
          // qutotaDict[key].sumValueFix = `0 ${qutotaDict[key].quotaUnit}`;
          qutotaDict[key].sumValueFix = `- -`;
          qutotaDict[key].sumValue = 0;
        }
        if (!qutotaDict[key].hasOwnProperty('hasUsedValue')) {
          qutotaDict[key].hasUsedValueFix = `0 ${qutotaDict[key].quotaUnit}`;
          qutotaDict[key].hasUsedValue = 0;
        }
        voList.push(qutotaDict[key]);
      }
    }
    return voList;
  }
  public formatQuota_new(qutotaData: any) {
    // 构造翻译字典
    let qutotaDict: QutotaDict = {};
    // 构造全额数据
    qutotaData.tenantQuotaDTOs.forEach((tenantQuotaDTO: any) => {
      const quotaCode = tenantQuotaDTO.quotaCode;
      _.set(
        qutotaDict,
        `${quotaCode}.sumValueFix`,
        `${
          tenantQuotaDTO.sumOfQuotaValue ? tenantQuotaDTO.sumOfQuotaValue : '--'
        } ${tenantQuotaDTO.quotaUnit}`,
      );
      _.set(
        qutotaDict,
        `${quotaCode}.sumValue`,
        tenantQuotaDTO.sumOfQuotaValue,
      );
      _.set(qutotaDict, `${quotaCode}.quotaName`, tenantQuotaDTO.quotaName);
      _.set(qutotaDict, `${quotaCode}.quotaUnit`, tenantQuotaDTO.quotaUnit);
      _.set(qutotaDict, `${quotaCode}.orderBy`, tenantQuotaDTO.orderBy);
    });

    // 构造已经使用数据
    qutotaData.desktopFlavorInstDtos.forEach((desktopFlavorInstDTO: any) => {
      const quotaCode = desktopFlavorInstDTO.quotaCode;

      _.set(
        qutotaDict,
        `${quotaCode}.hasUsedValueFix`,
        `${
          desktopFlavorInstDTO.sumOfQuotaValue
            ? desktopFlavorInstDTO.sumOfQuotaValue
            : '0'
        } ${desktopFlavorInstDTO.quotaUnit}`,
      );
      if (qutotaDict[quotaCode] && !qutotaDict[quotaCode].quotaName) {
        _.set(
          qutotaDict,
          `${quotaCode}.quotaName`,
          desktopFlavorInstDTO.quotaName,
        );
      }
      if (qutotaDict[quotaCode] && !qutotaDict[quotaCode].orderBy) {
        _.set(qutotaDict, `${quotaCode}.orderBy`, desktopFlavorInstDTO.orderBy);
      }

      _.set(
        qutotaDict,
        `${quotaCode}.hasUsedValue`,
        desktopFlavorInstDTO.sumOfQuotaValue,
      );
      _.set(
        qutotaDict,
        `${quotaCode}.quotaUnit`,
        desktopFlavorInstDTO.quotaUnit,
      );
    });

    let voList: any = [];

    // 全额数据List 和 已使用数据List 长度有可能不一致。需要做特殊处理
    for (const key of Object.keys(qutotaDict)) {
      if (
        qutotaDict[key].hasOwnProperty('sumValue') ||
        qutotaDict[key].hasOwnProperty('hasUsedValue')
      ) {
        if (!qutotaDict[key].hasOwnProperty('sumValue')) {
          qutotaDict[key].sumValueFix = `- -`;
          qutotaDict[key].sumValue = 0;
        }
        if (!qutotaDict[key].hasOwnProperty('hasUsedValue')) {
          qutotaDict[key].hasUsedValueFix = `0 ${qutotaDict[key].quotaUnit}`;
          qutotaDict[key].hasUsedValue = 0;
        }
        voList.push(qutotaDict[key]);
      }
    }
    return voList;
  }

  private toFixed(num: number, d: number): number {
    num *= Math.pow(10, d);
    num = Math.round(num);
    return num / Math.pow(10, d);
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
  .quota-chart,
  .quota-table {
    width: 100%;
  }
}
// 小分辨率时，分为两行显示桌面和资源
@media screen and (max-width: 1500px) {
  .dashboard-card {
    height: 270px;
    .quota-chart {
      width: 60%;
      padding-right: 30px;
    }
    .quota-table {
      width: 40%;
    }
  }
}
</style>
<style lang="scss">
.g2-guide-html {
  text-align: center;
  .qouta-title {
    color: #afb0b1;
    font-size: 14px;
  }
  .qouta-value {
    font-size: 16px;
    padding-left: 5px;
  }
}
</style>
