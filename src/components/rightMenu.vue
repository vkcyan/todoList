<template>
  <div class="right_menu_con">
    <div
      :class="rightShow ? 'right_menu_back' : 'right_menu_back_close'"
      @click.stop="closeRightModal"
    ></div>
    <div :class="rightShow ? 'right_menu' : 'right_menu_close'">
      <div
        class="menu_item"
        v-for="item in rightMenu"
        :key="item.name"
        @click="menuActive(item.methods)"
      >
        <img class="menu_item_img" :src="item.icon" alt="" />
        <p class="menu_item_name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare var require: any; // 防止require报错
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { loginout } from "../api/api";
@Component({})
export default class rightMenu extends Vue {
  @Prop(Boolean) rightShow!: Boolean;
  private rightMenu: any[] = [
    {
      icon: require("../assets/loginout.png"),
      name: "退出登录",
      methods: "loginout"
    }
  ];
  @Emit("closeRightModal")
  closeRightModal() {}
  private menuActive(met: string) {
    if (met == "loginout") {
      this.loginout();
    }
  }
  // 登出
  private async loginout() {
    let res = await loginout();
    if (res.code == 1) {
      this.ParentLoginout();
    }
  }
  @Emit("ParentLoginout")
  ParentLoginout() {}
}
</script>

<style lang="less" scoped>
.right_menu_con {
  .right_menu {
    z-index: 10;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 260px;
    background-color: white;
    transition: all 0.5s;
    .menu_item {
      .menu_item();
    }
  }
  .right_menu_close {
    position: absolute;
    right: -260px;
    top: 0;
    height: 100%;
    width: 260px;
    background-color: white;
    transition: all 0.5s;
    .menu_item {
      .menu_item();
    }
  }
  .right_menu_back {
    z-index: 9;
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
// 菜单样式
.menu_item {
  cursor: pointer;
  user-select: none;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: white;
  transition: all 0.2s;
  border-bottom: 1px solid rgb(212, 212, 212);
  &:hover {
    background-color: rgb(212, 212, 212);
  }
  .menu_item_img {
    width: 16px;
    height: 16px;
  }
  .menu_item_name {
    line-height: 20px;
    margin-left: 10px;
  }
}
</style>
