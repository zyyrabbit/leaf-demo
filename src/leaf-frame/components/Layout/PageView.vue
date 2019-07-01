<template>
  <div class="leaf-page-view" :class= "{'md-content': isMobileCollapse}">
    <leaf-header-wrapper @toggle="onMobileToggle"></leaf-header-wrapper>
    <leaf-aside-wrapper v-if="setting.slider" @click="onMobileToggle" @toggle="onToggle"></leaf-aside-wrapper>
    <div 
      class="leaf-page-view__content main-scroll" 
      :class="{ 'is-wide': isCollapse , 'is-no-slider': !setting.slider}">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && !loading"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && !loading"/>
      <spin-loader v-if="loading" type="bar"></spin-loader>
    </div>
    <div v-if="setting.slider" @click="onMobileToggle" class="leaf-page-view--mask"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LeafHeaderWrapper from './Header.vue';
import LeafAsideWrapper from './Aside.vue';
import { Getter, Action } from 'vuex-class';

@Component({
  components: {
    LeafHeaderWrapper,
    LeafAsideWrapper,
  },
})
export default class PageView extends Vue {
  @Getter('container/loading')
  public loading!: boolean;
  @Getter('setting/setting')
  public setting!: object;

  private isCollapse: boolean = false;
  private isMobileCollapse: boolean = false;

  private onToggle(isCollapse: boolean) {
    this.isCollapse = isCollapse;
  }

  private onMobileToggle() {
    this.isMobileCollapse = !this.isMobileCollapse;
  }
}
</script>