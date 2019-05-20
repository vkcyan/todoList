<template>
  <div class="todo_header">
    <div class="header_left">
      <div class="list_icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="header_right">
      <img src="../assets/setting.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class TodoHeader extends Vue {}
</script>

<style lang="less" scoped>
.todo_header {
  background-color: rgb(247, 247, 247);
  height: 40px;
  box-shadow: 0px 2px 4px rgb(201, 201, 201);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .header_left {
    .list_icon {
      cursor: pointer;
      span {
        display: block;
        background: rgb(72, 75, 76);
        width: 20px;
        height: 2px;
        margin: 5px 0;
        border-radius: 20px;
      }
    }
  }
  .header_right {
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
