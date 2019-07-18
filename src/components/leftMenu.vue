<template>
  <div class="left_menu" v-if="leftShow">
    左侧
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class leftMenu extends Vue {
  @Prop(Boolean) leftShow!: Boolean;
}
</script>

<style lang="less" scoped>
.left_menu {
  position: absolute;
  left: 0;
  top: 0;
  height: 100px;
  width: 200px;
  background-color: black;
  transition: all 1s;
}
.left_menu_close {
  position: absolute;
  left: 0;
  top: 0;
  height: 100px;
  width: 0;
  background-color: black;
  transition: all 1s;
}
</style>
