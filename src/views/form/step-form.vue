<template>
  <view-container class="leaf-step-form">

    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="16">
        <el-steps :active="1" simple>
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="16" class="leaf-step-form__wrap">
          <el-row type="flex" justify="center">
            <el-col :xs="20" :md="16">
              <el-form :model="stepForm" label-width="80px">
                <el-form-item label="标题名称">
                  <el-input v-model="stepForm.name"></el-input>
                </el-form-item>
                <el-form-item label="标题名称" required>
                  <el-input v-model="stepForm.name"></el-input>
                </el-form-item>
                <el-form-item label="选项内容" required>
                  <el-radio-group v-model="stepForm.value1">
                    <el-radio-button label="标一"></el-radio-button>
                    <el-radio-button label="标二"></el-radio-button>
                    <el-radio-button label="标三"></el-radio-button>
                    <el-radio-button label="标四"></el-radio-button>
                    <el-radio-button label="标五"></el-radio-button>
                    <el-radio-button label="标六"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="地址选择">
                  <el-select v-model="stepForm.region" placeholder="请选择地址">
                    <el-option label="广州" value="guangzhou"></el-option>
                    <el-option label="深圳" value="shenzhen"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否隐藏">
                  <el-switch v-model="stepForm.delivery"></el-switch>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :xs="20" :md="16" class="leaf-step-form__wrap--btns">
              <el-button>取消</el-button>
              <el-button type="primary">下一步</el-button>
            </el-col>
          </el-row>
      </el-col>
    </el-row>
  </view-container>
</template>
<script lang="ts">
import  *  as HTTP_GENERAL from '@/mocks/dashboard.ts';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class StepForm extends Vue {
  private stepForm = {
      name: '',
      region: '',
      delivery: false,
      type: ['选项一', '选项二'],
      value1: '标四',
      time: '',
      value: [1, 4]
  };

  private fileList = [];

  private data = [
    {
      key: 1,
      label: `备选项 1`,
    },
    {
      key: 2,
      label: `备选项 2`,
    },
    {
      key: 3,
      label: `备选项 3`,
      disabled: true
    },
    {
      key: 4,
      label: `备选项 4`,
    }
  ];
       

  private onSubmit() {
    console.log('submit!');
  }
}
</script>
<style lang="scss">
  .leaf-step-form {
    .view-container-body {
      background-color: $leaf-primary-color-background;
      padding-top: 50px;
    }

   &__wrap {
     margin-top: 50px;
     padding: 40px 0;
     background-color: $leaf-primary-color-white;

    &--btns {
      text-align: center;
      margin-top: 10px;
    }
   }
  }
</style>