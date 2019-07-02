<template>
  <view-container class="leaf-basic-form" title="基础表单">
    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="12">
        <el-form :model="basicForm" label-width="80px">
          <el-form-item label="标题名称">
            <el-input v-model="basicForm.name"></el-input>
          </el-form-item>
          <el-form-item label="标题名称" required>
            <el-input v-model="basicForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选项内容" required>
            <el-radio-group v-model="basicForm.value1">
              <el-radio-button label="标一"></el-radio-button>
              <el-radio-button label="标二"></el-radio-button>
              <el-radio-button label="标三"></el-radio-button>
              <el-radio-button label="标四"></el-radio-button>
              <el-radio-button label="标五"></el-radio-button>
              <el-radio-button label="标六"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址选择">
            <el-select v-model="basicForm.region" placeholder="请选择地址">
              <el-option label="广州" value="guangzhou"></el-option>
              <el-option label="深圳" value="shenzhen"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div class="leaf-basic-form--line"></div>

    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="12">
        <el-form :model="basicForm" label-width="80px">
          <el-form-item label="产品规模">
            <el-radio-group v-model="basicForm.value1">
              <el-radio-button label="标一"></el-radio-button>
              <el-radio-button label="标二"></el-radio-button>
              <el-radio-button label="标三"></el-radio-button>
              <el-radio-button label="标四"></el-radio-button>
              <el-radio-button label="标五"></el-radio-button>
              <el-radio-button label="标六"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-switch v-model="basicForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="对外开放">
            <el-radio-group v-model="basicForm.role">
              <el-radio label="超管家"></el-radio>
              <el-radio label="开发者"></el-radio>
              <el-radio label="运营者"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品选择">
            <el-checkbox-group v-model="basicForm.type">
              <el-checkbox label="选项一" name="type"></el-checkbox>
              <el-checkbox label="选项二" name="type"></el-checkbox>
              <el-checkbox label="选项三" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          
          <el-form-item label="产品描述">
            <el-input type="textarea" v-model="basicForm.desc" :rows="6"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>  

    <div class="leaf-basic-form--line"></div>

    <el-row type="flex" justify="center">
      <el-col :xs="20" :md="12">
        <el-form :model="basicForm" label-width="80px">
          <el-form-item label="时间段">
            <el-time-select
                v-model="basicForm.time"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="选择时间">
              </el-time-select>
          </el-form-item>
          <el-form-item label="实际数量" required>
             <el-input-number v-model="basicForm.num" controls-position="right" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="上传文件" required>
           <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div class="leaf-basic-form--line"></div>

     <el-row type="flex" justify="center">
      <el-col :xs="20" :md="12">
        <el-form  :model="basicForm" label-width="80px">
          <el-form-item label="可选方案">
            <el-transfer v-model="basicForm.value" :data="data"></el-transfer>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>  
  </view-container>
</template>
<script lang="ts">
import  *  as HTTP_GENERAL from '@/mocks/dashboard.ts';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BasicForm extends Vue {

  private basicForm = { 
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: ['选项一', '选项二'],
      role: '开发者',
      desc: '',
      value1: '标四',
      num: 1,
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
  @mixin line {
    display: block;
    content: "";
    width: 70%;
    border-bottom: 1px dashed grey;
    margin: 40px auto;
  }
  .leaf-basic-form {
    .view-container-body {
      padding-top: 20px;
    }
    &--line {
      @include line;
    }
  }
</style>