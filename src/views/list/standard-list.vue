<template>
  <view-container class="leaf-standard-list">
    <el-card>
      <el-row>
        <el-col :xs="20" :md="12">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary">新建</el-button>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listForm.batchOperate" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="20" :md="12" class="leaf-text-align-right">
          <el-form :inline="true">
            <el-form-item>
              <el-select v-model="listForm.batchOperate" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="listForm.account"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search"></el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="text" @click="isShowMore=!isShowMore">高级搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <div :class="{'leaf-standard-list__search-more': isShowMore}">
        <el-collapse-transition>
          <el-form v-show="isShowMore" :model="listForm" label-width="100px">
            <el-row>
              <el-col :xs="20" :md="8">
                <el-form-item label="施工单位">
                  <el-input v-model="listForm.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="20" :md="8">
                <el-form-item label="施工单操作">
                  <el-input v-model="listForm.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="20" :md="8">
                <el-form-item label="租户ID">
                  <el-input v-model="listForm.account"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="20" :md="8">
                <el-form-item label="产品实例ID">
                  <el-input v-model="listForm.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="20" :md="8">
                <el-form-item label="产品ID">
                  <el-input v-model="listForm.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="20" :md="8">
                <el-form-item label="施工单位">
                  <el-input v-model="listForm.account"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col :xs="20" :md="20">
                  <el-button type="primary">搜索</el-button>
                  <el-button type="primary">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-transition>
      </div>
      <div>
        <el-table :data="tableData">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="role" label="角色" min-width="100"></el-table-column>
          <el-table-column prop="account" label="管理员账号" min-width="100"></el-table-column>
          <el-table-column prop="userName" label="用户名" min-width="100"></el-table-column>
          <el-table-column prop="mobile" label="手机号码" min-width="100"></el-table-column>
          <el-table-column prop="date" label="时间" min-width="100"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="{row}">
              <el-button type="text">上移</el-button>
              <el-button type="text">下移</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
       <!--  <el-pagination
          v-if="pageTotal > 10"
          @current-change="val => onPageChange('pageNum', val)"
          @size-change="val => onPageChange('pageSize', val)"
          :current-page="page.pageNum"
          :total="pageTotal"
        ></el-pagination> -->
      </div>
    </el-card>
  </view-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class List extends Vue {
  private dialogVisible: any = {
    certVisible: false,
    subjectVisible: false
  }
  private listForm = {
    batchOperate: '',
    account: ''
  }

  private rowsData = [];
  private tableData = [];

  private isShowMore: boolean = false;

  private options = [{
      value: '选项1',
      label: '选项1'
    }, {
      value: '选项2',
      label: '选项2'
    }, {
      value: '选项3',
      label: '选项3'
    }]
}
</script>
<style lang="scss">
  .leaf-standard-list {
    &__search-more {
      background-color: $leaf-primary-color-background;
      margin-bottom: 10px;
      padding: 40px;
    }
  }
</style>
