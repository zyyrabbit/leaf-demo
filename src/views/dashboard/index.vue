<template>
  <div class="leaf-home-dashboard">
    <el-row>
      <general-info></general-info>
    </el-row>
    <el-row :gutter="16">
      <el-col :xs="24" :md="12" class="leaf-home-dashboard__runnig-desktop">
        <runnig-desktop-chart></runnig-desktop-chart>
      </el-col>
      <el-col :xs="24" :md="12" class="leaf-home-dashboard__quota-chart">
        <quota-chart></quota-chart>
      </el-col>
    </el-row>
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :xs="24" :md="12">
        <flavor-chart></flavor-chart>
      </el-col>
      <el-col :xs="24" :md="6">
        <el-card class="dashboard-card line-height-400 chapter-title">
          <strong slot="header">今日桌面活跃度Top10</strong>
          <div v-show="orgDesktops.length===0">暂无数据</div>
          <el-table
            v-show="orgDesktops.length>0"
            :border="false"
            cell-class-name="rank-row"
            :data="orgDesktops"
            class="desktop-list"
            :show-header="false">
            <el-table-column prop="rank" width="40px" :show-overflow-tooltip="false">
              <template slot-scope="scope">
                <span
                  class="label"
                  :class="{
                      'top': scope.$index < 3
                    }"
                >{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="desktopName">
              <template slot-scope="scope">{{scope.row.desktopName}}</template>
            </el-table-column>
            <el-table-column prop="secondOfUsingTime">
              <template slot-scope="scope">{{formatTimesMinute(scope.row.secondOfUsingTime)+' 分钟'}}</template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="6">
        <el-card class="dashboard-card line-height-400 chapter-title">
          <strong slot="header">今日用户活跃度Top10</strong>
          <div v-show="orgMembers.length===0">暂无数据</div>
          <el-table
            v-show="orgMembers.length>0"
            :border="false"
            cell-class-name="rank-row"
            :data="orgMembers"
            class="desktop-list"
            :show-header="false"
          >
            <el-table-column prop="rank" width="40px" :show-overflow-tooltip="false">
              <template slot-scope="scope">
                <span
                  class="label"
                  :class="{
                      'top': scope.$index < 3
                    }"
                >{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userName">
              <template slot-scope="scope">{{ scope.row.userName}}</template>
            </el-table-column>
            <el-table-column prop="secondOfUsingTime">
              <template slot-scope="scope">{{formatTimesMinute(scope.row.secondOfUsingTime)+' 分钟'}}</template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import  *  as HTTP_GENERAL from '@/mocks/dashboard.ts';
import G2 from '@antv/g2';
import { Component, Vue } from 'vue-property-decorator';
import RunnigDesktopChart from './comps/RunnigDesktopChart.vue';
import QuotaChart from './comps/QuotaChart.vue';
import FlavorChart from './comps/FlavorChart.vue';
import GeneralInfo from './comps/GeneralInfo.vue';
@Component({
  components: {
    RunnigDesktopChart,
    QuotaChart,
    FlavorChart,
    GeneralInfo
  },
})
export default class Index extends Vue {
  public orgMembers: object[] = [];
  // 部门桌面排名
  public orgDesktops: object[] = [];

  public mounted() {
    this.getTop10UserAndDesktop();
  }

  public async getTop10UserAndDesktop() {
    try {
      const r = HTTP_GENERAL.getTop10UserAndDesktop;
      if (r.code === 0) {
        this.orgDesktops = r.data.topOfDesktop;
        this.orgMembers = r.data.topOfUser;
      }
    } catch (e) {
    } finally {
    }
  }

  public formatTimesMinute(timeSeconds: number) {
    return Math.ceil(timeSeconds / 60);
  }
}
</script>
<style lang="scss" scoped>
.leaf-home-dashboard {
  padding: 20px 16px 16px;
  .header {
    margin-bottom: 15px;
    .title {
      font-size: 16px;
      color: #555555;
    }
    .info {
      color: #777777;
      line-height: 32px;
      .user-name {
        line-height: 17px;
        color: $leaf-primary-color;
        cursor: pointer;
      }
      .org-name {
        margin-left: 27px;
      }
    }
  }
  .el-card {
    border: 1px solid #ebeef5;
    border-radius: $leaf-border-radius;
  }
}

.line-height-400 {
  height: 400px;
}

.desktop-list {
  > li {
    margin-top: 8px;
    overflow: hidden;
  }

  .label {
    display: inline-block;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #f0f2f5;
    color: #324658;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }

  .top {
    background-color: #324658;
    color: #fff;
  }

  .number {
    float: right;
    margin-left: 16px;
  }
}

::v-deep {
  .el-card__header {
    font-size: 14px;
    padding: 15px 15px 0 15px;
    border: none;
    .chapter-title & {
      strong {
        border-left: 3px solid $leaf-primary-color;
        padding-left: 8px;
      }
    }
  }
  .el-card__body {
    padding: 15px;
  }
  .rank-row {
    padding: 5px 0 !important;
  }
  .el-table {
    margin-top: 0;
  }
}

@media screen and (max-width: 1500px) {
  // 分上下两栏
  .runnig-desktop,
  .quota-chart {
    width: 100%;
  }
}
</style>