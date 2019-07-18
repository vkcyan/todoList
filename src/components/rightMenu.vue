<template>
  <div class="right_menu_con" @click="closeRightModal">
    <div :class="rightShow ? 'right_menu_back' : 'right_menu_back_close'"></div>
    <div :class="rightShow ? 'right_menu' : 'right_menu_close'"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({})
export default class rightMenu extends Vue {
  @Prop(Boolean) rightShow!: Boolean;

  @Emit("closeRightModal")
  closeRightModal() {}
}
</script>

<style lang="less" scoped>
.right_menu_con {
  .right_menu {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 260px;
    background-color: white;
    transition: all 0.5s;
  }
  .right_menu_close {
    position: absolute;
    right: -260px;
    top: 0;
    height: 100%;
    width: 260px;
    background-color: white;
    transition: all 0.5s;
  }
  .right_menu_back {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: width 0.1s, background 0.5s 0.1s;
  }
  .right_menu_back_close {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 0px;
    background-color: rgba(0, 0, 0, 0);
    transition: width 0.5s 0.5s, background 0.5s;
  }
}
</style>
