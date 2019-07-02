<template>
  <error type="403" message="抱歉，您访问的页面不存在"></error>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import error from './error.vue';
@Component({
  components: {
    error
  }
})
export default class Error403 extends Vue {
}
</script>
