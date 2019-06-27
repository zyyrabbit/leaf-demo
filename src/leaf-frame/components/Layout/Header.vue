<template>
  <div class="leaf-header-wrapper" :style="{ 'background-color': theme }">
    <div class="leaf-header-wrapper__left" :style="{ 'background-color': theme }">
      <div class="leaf-header-wrapper__left--brand-img"></div>
      <div class="leaf-header-wrapper__left--brand-text">
       {{ setting.title }}
      </div>
      <div v-if="setting.slider" @click.stop="onMobileToggle" class="leaf-header-wrapper__left--brand-btn">
        <svg-icon name="indent"></svg-icon>
      </div>
    </div>
    <div class="leaf-header-wrapper__right" :style="{ 'background-color': theme }">
      <slot></slot>
      <div class="item-group">
        <div class="item menu-hover" title="主题" v-if="setting.theme">
          <el-color-picker @change="changeTheme" v-model="color"></el-color-picker>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';

  @Component
  export default class HeaderWrapper extends Vue {
    @Getter('theme/theme')
    public theme!: string;
    @Getter('setting/setting')
    public setting!: object;

    private color: string = '#409EFF';

    private onMobileToggle() {
      this.$emit('toggle');
    }

    private created(this: any) {
      if (this.$leaf.headerSlot) {
        let vnode = this.$createElement(this.$leaf.headerSlot);
        this.$slots.default = [vnode];
      }
    }

    private changeTheme(val: string) {
      this.$leaf.stores.dispatch('theme/setTheme', val);
    }
  }
</script>