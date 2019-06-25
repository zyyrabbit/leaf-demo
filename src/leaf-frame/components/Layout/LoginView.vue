<template>
  <div class="leaf-login-view">
    <div class="leaf-login-view-main">
      <div class="leaf-login-view-main__brand">
        <div class="leaf-login-view-main__brand--logo"></div>
        <div class="leaf-login-view-main__brand--text">
          <span>Leaf</span>
          <span class="leaf-login-view-main__brand--divider">|</span>
          <span>Demo</span>
        </div>
      </div>
      <router-view></router-view>
      <div class="leaf-login-view-main__footer">
        Copyright © <span id="year">2019</span> 版权所有
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class LoginView extends Vue {
  }
</script>
