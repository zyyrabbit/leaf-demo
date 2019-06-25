<template>
  <aside class="leaf-aside-wrapper">
    <ctg-menu 
      :menus="menuList"
      :background-color="theme"
      @click="onSelect" 
      @toggle="onToggle"></ctg-menu>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import ctgMenu from 'ctg-components/menu/src/main.vue';

interface MenuVO {
  hasChildren: boolean;
  items: MenuVO[] | null;
  menuId: number;
  menuName: string;
  menuLevel: number;
  menuIndex: number;
  menuIcon?: string;
  parMenuId: number;
  urlAddr?: string;
}

@Component({
  components: {
    ctgMenu
  }
})
export default class AsideWrapper extends Vue {
  @Getter('menu/menuTree')
  public menuList!: MenuVO[];

  @Action('menu/setActiveMenu')
  public setActiveMenu!: Function;

  @Getter('theme/theme')
  public theme!: string;

  public onToggle(isCollapse: boolean) {
    this.$emit('toggle', isCollapse);
  }

  public onSelect(item: MenuVO) {
    this.$emit('click');
    this.setActiveMenu(item);
  }
}
</script>
