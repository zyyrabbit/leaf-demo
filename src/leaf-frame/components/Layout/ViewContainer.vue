<template>
  <div class="leaf-view-container">
    <div class="leaf-view-container-head">
      <div class="leaf-view-container-head-info">
        <h2 class="leaf-view-container-head-info--title" v-if="$slots.title">
          <slot name="title"></slot>
        </h2>
        <h2 class="leaf-view-container-head-info--title" v-else>{{title || $route.meta.title }}</h2>
        <div class="leaf-view-container-head-info--cont" v-if="$slots.info">
          <slot name="info"></slot>
        </div>
      </div>
      <div class="leaf-view-container-head--meta" v-if="$slots.meta">
        <slot name="meta"></slot>
      </div>
    </div>
    <div class="leaf-view-container-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class ViewContainer extends Vue {
  @Prop()
  private title!: string;
}
</script>
