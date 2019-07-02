<template>
  <div class="skeleton-comps">
    <div class="skeleton bar" v-if="type === 'bar'" v-for="i in count">
      <div class="skeleton-head"></div>
      <div class="skeleton-body">
        <div class="skeleton-title"></div>
        <div class="skeleton-content"></div>
      </div>
    </div>
    <div class="skeleton circle" v-if="type=== 'circle'">
      <div class="skeleton-head">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6" class="item" v-for="i in count" :key="i"></el-col>
        </el-row>
      </div>
      <div class="skeleton-body">
        <div class="skeleton-title"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-content"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Skeleton extends Vue {
  @Prop({ default: 'bar' })
  private type!: string;
  @Prop({ default: 1 })
  private count!: number;
}
</script>
<style lang="scss" scoped>
.skeleton {
  padding: 10px;
  .skeleton-head,
  .skeleton-title,
  .skeleton-content {
    background: rgb(234, 241, 245);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%
    );
    background-size: 20rem 20rem;
    animation: skeleton-stripes 1s linear infinite;
  }
  &.bar {
    .skeleton-head {
      width: 100px;
      height: 60px;
      float: left;
    }
    .skeleton-body {
      margin-left: 110px;
    }

    .skeleton-title {
      width: 500px;
      height: 20px;
    }

    .skeleton-content {
      width: 260px;
      height: 30px;
      margin-top: 10px;
    }
  }
  &.circle {
    .skeleton-head {
      background: none;
      .item {
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgb(234, 241, 245);
      }
    }
    .skeleton-body {
      margin-top: 30px;
    }

    .skeleton-title {
      margin-top: 20px;
      margin-left: 50px;
      height: 20px;
    }

    .skeleton-content {
      margin-top: 10px;
      height: 20px;
      margin-top: 10px;
    }
  }
}

@keyframes skeleton-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 20rem 0;
  }
}
</style>
 

