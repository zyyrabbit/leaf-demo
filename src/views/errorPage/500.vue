<template>
  <error type="500" message="抱歉，服务器出错了"></error>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import error from './error.vue';
@Component({
  components: {
    error
  }
})
export default class Error500 extends Vue {
}
</script>
