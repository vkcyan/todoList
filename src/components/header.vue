<template>
  <div class="header"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
export default class TodoHeader extends Vue {}
</script>



<style lang="less" scoped>
.header {
  background-color: rgb(247, 247, 247);
  height: 40px;
  box-shadow: 0px 2px 4px rgb(201, 201, 201);
}
</style>
