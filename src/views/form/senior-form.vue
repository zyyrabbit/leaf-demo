<template>
  <view-container class="leaf-senior-form">
    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="16" class="leaf-senior-form__wrap">
        <el-row type="flex" justify="center">
          <el-col :xs="22" :md="22">基本信息</el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="20" :md="16">
            <el-form :model="seniorForm" label-width="80px">
              <el-form-item label="标题名称">
                <el-input v-model="seniorForm.name"></el-input>
              </el-form-item>
              <el-form-item label="标题名称" required>
                <el-input v-model="seniorForm.name"></el-input>
              </el-form-item>
              <el-form-item label="选项内容" required>
                <el-radio-group v-model="seniorForm.value1">
                  <el-radio-button label="标一"></el-radio-button>
                  <el-radio-button label="标二"></el-radio-button>
                  <el-radio-button label="标三"></el-radio-button>
                  <el-radio-button label="标四"></el-radio-button>
                  <el-radio-button label="标五"></el-radio-button>
                  <el-radio-button label="标六"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="地址选择">
                <el-select v-model="seniorForm.region" placeholder="请选择地址">
                  <el-option label="广州" value="guangzhou"></el-option>
                  <el-option label="深圳" value="shenzhen"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否隐藏">
                <el-switch v-model="seniorForm.delivery"></el-switch>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="16" class="leaf-senior-form__wrap">
        <el-row type="flex" justify="center">
          <el-col :xs="22" :md="22">产品方案</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :md="16">
            <el-transfer v-model="seniorForm.value" :data="data"></el-transfer>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="16" class="leaf-senior-form__wrap">
        <el-row type="flex" justify="center">
          <el-col :xs="22" :md="22">产品属性</el-col>
        </el-row>
        <el-row type="flex" justify="center" class="leaf-senior-form__wrap--table">
          <el-col :xs="22" :md="22">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="属性名称" width="150">
                <template slot-scope="{row}">
                  <el-input v-model="row.name" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="code" label="属性编码" width="120">
                <template slot-scope="{row}">
                  <el-input v-model="row.code" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="attr" label="属性选择" width="120">
                <template slot-scope="{row}">
                  <el-select v-model="row.attr" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="desc" label="属性描述" width="120">
                <template slot-scope="{row}">
                  <el-input v-model="row.desc" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="visible" label="可见性" width="100">
                <template slot-scope="{row}">
                  <el-checkbox v-model="row.visible"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="{row}">
                  <el-button type="text">上移</el-button>
                  <el-button type="text">下移</el-button>
                  <el-button type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="leaf-senior-form__btns">
      <el-col :xs="20" :md="16">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </el-col>
    </el-row>
  </view-container>
</template>
<script lang="ts">
import * as HTTP_GENERAL from "@/mocks/dashboard.ts";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SeniorForm extends Vue {
  private seniorForm = {
    name: "",
    region: "",
    delivery: false,
    type: ["选项一", "选项二"],
    value1: "标四",
    time: "",
    value: [1, 4]
  };

  private data = [
    {
      key: 1,
      label: `备选项 1`
    },
    {
      key: 2,
      label: `备选项 2`
    },
    {
      key: 3,
      label: `备选项 3`,
      disabled: true
    },
    {
      key: 4,
      label: `备选项 4`
    }
  ];

  private tableData = [{
    name: 'zyy',
    code: '',
    attr: '选项1',
    desc: '天河区',
    visible: true
  }]

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

  private onSubmit() {
    console.log("submit!");
  }
}
</script>
<style lang="scss">
.leaf-senior-form {
  .view-container-body {
    background-color: $leaf-primary-color-background;
  }

  &__wrap {
    padding-bottom: 20px;
    background-color: $leaf-primary-color-white;
    &--table {
      margin-top: 30px;
    }
  }

  &__btns {
    margin-top: 50px;
    text-align: right;
    line-height: 50px;
    background-color: $leaf-primary-color-white !important;
  }
}
</style>