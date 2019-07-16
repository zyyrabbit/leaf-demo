<template>
  <view-container class="leaf-card-list">
   <el-row :gutter="20" class="leaf-card-list-wrap">
      <el-col :xs="24" :md="6">
        <el-card class="leaf-card-list-item leaf-card-list-item--add" shadow="hover" :body-style="{ padding: '0' }">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="6" v-for="o in 6" :key="o">
        <el-card class="leaf-card-list-item" shadow="hover" :body-style="{ padding: '0' }">
          <h4 class="leaf-card-list-item--title">Leaf-Card</h4>
          <p class="leaf-card-list-item--content">
            项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述
          </p>
          <div class="leaf-card-list-item__desc leaf-clearfix">
            <span class="float-left">5小时前更新</span>
            <span class="leaf-float-right">创建者：admin</span>
          </div>
          <div class="leaf-card-list-item__bottom">
            <el-row type="flex" justify="space-between">
              <el-col :span="8"  v-for="o in 3" :key="o">
                <el-button type="text">操作按钮</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </view-container>
</template>
<script lang="ts">
import * as HTTP_GENERAL from "@/mocks/dashboard.ts";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CardList extends Vue {
  private currentDate: Date = new Date();
}
</script>
<style lang="scss">
  .leaf-card-list-wrap {
    margin-top: -30px;
    background-color: rgb(250, 248, 248);
    padding: 0 20px;
    height: 100%;
    overflow: auto;
  }
  .leaf-card-list-item {
    margin-top: 20px;
    padding: 20px 20px 0;
    height: 194px;
    overflow-y: auto;
    position: relative;

    &:hover {
      cursor: pointer;
    }

    &--content {
      margin: 20px 0;
    }

    &__desc {
      margin-bottom: 10px;
    }

    &__bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 1px solid rgb(243, 241, 241);
      background-color: #FAFAFA;
      text-align: center;
    }
  }
  .leaf-card-list-item--add {
    border: 5px rgb(231, 230, 230) dotted;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-icon-plus {
      font-size: 80px;
      color: rgb(231, 230, 230);
    }
  }
</style>