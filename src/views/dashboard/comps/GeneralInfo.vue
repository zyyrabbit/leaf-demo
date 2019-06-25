<template>
  <el-row :gutter="16" class="general-info">
    <el-col :xs="24" :md="8" class="left-col">
      <el-card>
        <div class="user-info">
          <div class="avatar">
            <span class="avatar-image"></span>
          </div>
          <div class="content">
            <div class="content--title" :title="loginUserName">{{welcomeMessage}} {{loginUserName}}</div>
            <div>
              <svg-icon name="briefcase"></svg-icon>
              {{UserRole}}
            </div>
            <div>
              <svg-icon name="map-marker-alt"></svg-icon>
              {{loginUserOrgName}}
              <!-- {{tenantName}}-{{loginUserOrgName}} -->
            </div>
          </div>
        </div>
        <div class="link-wrap"></div>
      </el-card>
    </el-col>
    <el-col :xs="24" :md="16" class="card-shadow">
      <el-row :gutter="16">
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="card-cont">
              <div class="card-cont--icon">
                <svg-icon name="user-online-cont"></svg-icon>
              </div>
              <div class="card-cont--data">
                <div class="value">
                  <count-to :endValue="countOfOnlineUser" :loading="countLoading" align="right"></count-to>
                </div>
                <span class="title">在线用户数</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="card-cont">
              <div class="card-cont--icon">
                <svg-icon name="user-cont"></svg-icon>
              </div>
              <div class="card-cont--data">
                <div class="value">
                  <count-to :endValue="countOfUser" :loading="countLoading" align="right"></count-to>
                </div>
                <div class="title">用户总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="card-cont">
              <div class="card-cont--icon card-cont--background" style="background:#72cdfd">
                <svg-icon name="user-group-cont"></svg-icon>
              </div>
              <div class="card-cont--data">
                <div class="value">
                  <count-to :endValue="countOfUserGroup" :loading="countLoading" align="right"></count-to>
                </div>
                <div class="title">用户组数</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="16" style="margin-top:10px">
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="card-cont">
              <div class="card-cont--icon">
                <svg-icon name="desktop-online-cont"></svg-icon>
              </div>
              <div class="card-cont--data">
                <div class="value">
                  <count-to :endValue="countOfOnlineDesktop" :loading="countLoading" align="right"></count-to>
                </div>
                <div class="title">在线桌面数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="card-cont">
              <div class="card-cont--icon">
                <svg-icon name="desktop-pool-cont"></svg-icon>
              </div>
              <div class="card-cont--data">
                <div class="value">
                  <count-to :endValue="countOfDesktop" :loading="countLoading" align="right"></count-to>
                </div>
                <div class="title">桌面总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-card>
            <div class="card-cont">
              <div class="card-cont--icon card-cont--background" style="background:#f692aa">
                <svg-icon name="desktop-pool"></svg-icon>
              </div>
              <div class="card-cont--data">
                <div class="value">
                  <count-to :endValue="countOfDesktopPool" :loading="countLoading" align="right"></count-to>
                </div>
                <div class="title">桌面池数</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import  *  as HTTP_GENERAL from '@/mocks/dashboard.ts';
import G2 from '@antv/g2';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GeneralInfo extends Vue {
  private get loginUserName() {
    return 'user_name';
  }

  private get UserRole() {
    return this.sysRoleNames.join('/') || '--';
  }

  private get welcomeMessage() {
    let now = new Date().getHours();
    if (now > 0 && now <= 6) {
      return '午夜好，';
    }
    if (now > 6 && now <= 11) {
      return '早上好，';
    }
    if (now > 11 && now <= 14) {
      return '中午好，';
    }
    if (now > 14 && now <= 18) {
      return '下午好，';
    }

    return '晚上好，';
  }

  private countLoading: boolean = true;
  private tenantName: string = '--';
  private loginUserOrgName: string = '--';
  private sysRoleNames: string[] = [];
  public countOfUser: number = 0;
  public countOfOnlineUser: number = 0;
  public countOfUserGroup: number = 0;
  public countOfOnlineDesktop: number = 0;
  public countOfDesktop: number = 0;
  public countOfDesktopPool: number = 0;

  public mounted() {
    this.getUserInfo();
    this.getGeneralInfo();
  }

  public async getUserInfo() {
    try {
      const r =  HTTP_GENERAL.getUserInfo;
      if (r.code === 0) {
        const {
          orgName,
          sysRoleNames,
          tenantName,
        } = r.data.generalSituationDetail;
        this.loginUserOrgName = orgName;
        this.sysRoleNames = sysRoleNames;
        this.tenantName = tenantName;
      }
    } catch (e) {
    } finally {
    }
  }

  public async getGeneralInfo() {
    try {
      const r = HTTP_GENERAL.getGeneralInfo;
      if (r.code === 0) {
        const {
          countOfUser, // 用户数
          countOfOnlineUser, //当前在线用户
          countOfUserGroup,
          countOfOnlineDesktop, //在线桌面数
          countOfDesktop, // 桌面数
          countOfDesktopPool, // 桌面池数
        } = r.data.generalSituationDetail;
        this.countLoading = false;
        this.countOfUser = countOfUser;
        this.countOfOnlineUser = countOfOnlineUser;
        this.countOfUserGroup = countOfUserGroup;
        this.countOfOnlineDesktop = countOfOnlineDesktop;
        this.countOfDesktop = countOfDesktop;
        this.countOfDesktopPool = countOfDesktopPool;
      }
    } catch (e) {}
  }
}
</script>
<style lang="scss" scoped>
.left-col {
  max-height: 170px;
  overflow: hidden;
  .user-info {
    display: flex;
    padding: 10px;
    .avatar {
      flex: 0 1 72px;
      margin-bottom: 8px;
      .avatar-image {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;
        background: $leaf-dashboard-background;
        background-repeat: none;
        background-size: contain;
      }
    }
    .content {
      position: relative;
      top: 4px;
      margin-left: 24px;
      flex: 1 1 auto;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      &--title {
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 12px;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
      }
      .svg-icon {
        width: 12px;
        height: 12px;
        fill: #c6c6c6;
        margin-right: 5px;
      }
    }
  }
  .link-wrap {
    height: 12px;
    margin-top: 20px;
    border-top: 1px solid #e9e9e9;
  }
}

.card-shadow {
  ::v-deep {
    .el-card {
      box-shadow: 0 4px 8px rgba(90, 97, 105, 0.08);
    }
  }
}

// 通用
.card-cont {
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  &--icon {
    width: 48px;
    height: 48px;
    .svg-icon {
      width: 48px;
      height: 48px;
    }
  }

  &--data {
    font-size: 14px;
    text-align: center;
    .value {
      font-size: 16px;
      color: #555555;
    }
    .title {
      font-size: 14spx;
      color: #999999;
    }
  }

  &--background {
    background: $leaf-primary-color;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    text-align: center;
    ::v-deep {
      .svg-icon {
        fill: $leaf-primary-color-white;
        width: 24px;
      }
    }
  }
}
// 宽屏
@media screen and (min-width: 1500px) {
  .card-cont {
    padding: 0 45px;
    &--icon {
      display: inline-block;
      vertical-align: middle;
    }

    &--data {
      display: inline-block;
      vertical-align: middle;
      margin-left: 30px;
    }

    ::v-deep {
      .count-to--wrap {
        text-align: center;
      }
    }
  }
}

// 窄屏，
@media screen and (max-width: 1500px) {
  .card-cont {
    &--icon {
      float: left;
    }

    &--data {
      float: right;
      padding-left: 15px;
    }
    // ::v-deep {
    //   .count-to--wrap {
    //     text-align: left;
    //   }
    // }
  }
}
</style>
