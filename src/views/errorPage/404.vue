<template>
  <error type="404" message="抱歉，您访问的页面不存在"></error>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import error from './error.vue';
@Component({
  components: {
    error
  }
})
export default class Error404 extends Vue {
}
</script>
