<template>
  <div class="todo_input">
    <div class="input_containers">
      <div class="input_left">
        <input
          ref="todoInput"
          v-model="todoValue"
          @keyup.enter="setTodo"
          @keyup.esc="closeTodo"
        />
      </div>
      <div class="input_right">
        今天
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
@Component({
  mounted() {
    let tinput: any = this.$refs["todoInput"];
    tinput.focus();
  }
})
export default class todoInput extends Vue {
  public todoValue: string = ""; // 输入框文字
  @Emit("addTodoActive")
  setTodo(): string {
    return this.todoValue;
  }
  /**
   * clearTodoValue 清除输入框文字
   */
  public clearTodoValue() {
    this.todoValue = "";
  }
  @Emit("closeTodo")
  closeTodo() {}
}
</script>

<style lang="less" scoped>
.todo_input {
  padding: 0 30px;
  margin-top: 10px;
  .input_containers {
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    height: 35px;
    display: flex;
    align-items: center;
    .input_left {
      width: 75%;
      text-align: left;
      input {
        font-size: 14px;
        width: 100%;
        height: 26px;
        padding-left: 8px;
        margin: 1px 0;
        border: 0px;
        outline: 0px solid black;
      }
    }
    .input_right {
      line-height: 35px;
      border-left: 1px solid rgb(212, 212, 212);
      cursor: pointer;
      width: 25%;
    }
  }
}
</style>
