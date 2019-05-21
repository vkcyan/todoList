<template>
  <div class="home">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <!-- todoList头部 -->
    <div class="Nowadays">
      <span class="newsText">今天</span>
      <span class="newsWeek">周{{ newTime.week }}</span>
      <span class="newsMonth">{{ newTime.month }}月{{ newTime.date }}日</span>
    </div>
    <draggable
      :animation="200"
      v-model="list"
      @end="onEnd"
      class="todoNewsList"
    >
      <!-- 已经添加的列表 -->
      <div class="item" v-for="item in list" :key="item.date">
        <div class="item-left">
          <span class="icon" @click="deleteList(item.date)"></span>
          <span class="title">{{ item.title }}</span>
        </div>
        <div class="item-right">
          <span class="date">{{
            `${showTodoTime(item.date).month}月${
              showTodoTime(item.date).date
            }日`
          }}</span>
        </div>
      </div>
    </draggable>
    <todoInput
      ref="todo_Input"
      v-if="addShow"
      @addTodoActive="addTodoActive"
    ></todoInput>
    <!-- 添加任务入口 -->
    <div class="add_todo">
      <span @click="addTodo" class="add">添加任务</span>
      <span @click="closeTodo" class="close" v-if="addShow">取消</span>
    </div>
  </div>
</template>

<script lang="ts">
import { getTime, getTodoTime } from "../utils/dateTime";
import { titleDate, todoList } from "../interfaces";
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import todoInput from "../components/todoInput.vue";
@Component({
  components: {
    todoInput,
    draggable
  }
})
export default class Home extends Vue {
  mounted() {
    this.list = this.getlist();
  }
  private addShow: boolean = false;
  private list: todoList[] = [];
  private get newTime(): object {
    let time: titleDate = getTime(new Date());
    return time;
  }
  private showTodoTime(timer: number): object {
    return getTime(getTodoTime(timer));
  }
  private addTodo() {
    this.addShow = true;
  }
  private closeTodo() {
    this.addShow = false;
  }

  /**
   * 增加函数
   * data todo的内容
   */
  public addTodoActive(title: string) {
    if (title) {
      let todoList: object[] = JSON.parse(
        localStorage.getItem("todoList") || "[]"
      );
      todoList.push({
        grade: 0,
        title: title,
        date: new Date().getTime()
      });
      this.setlist(todoList);
      this.list = this.getlist();
      let todo_Input: any = this.$refs["todo_Input"];
      todo_Input.clearTodoValue();
    }
  }
  /**
   * setlist 获取函数
   */
  public getlist(): todoList[] {
    return JSON.parse(localStorage.getItem("todoList") || "[]");
  }
  /**
   * setlist 更新函数
   */
  public setlist(todoList: object[]): any {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  /**
   * updateList 删除函数
   * date 时间戳
   */
  public deleteList(todoDate: number) {
    this.setlist(this.list.filter(item => item.date !== todoDate));
    this.list = this.getlist();
  }
  private onEnd() {
    this.setlist(this.list);
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 550px;
  overflow: auto;
  padding: 30px;
  .Nowadays {
    text-align: left;
    .newsText {
      font-size: 20px;
    }
    .newsWeek {
      font-size: 12px;
      margin-left: 8px;
      color: rgb(128, 128, 128);
    }
    .newsMonth {
      font-size: 12px;
      margin-left: 8px;
      color: rgb(128, 128, 128);
    }
  }
  .todoNewsList {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgb(224, 224, 224);
      .item-left {
        display: flex;
        align-items: center;
        .icon {
          display: block;
          width: 17px;
          height: 17px;
          border: 1px solid rgb(177, 177, 177);
          border-radius: 50%;
          background-position-x: center;
          background-position-y: center;
          cursor: pointer;
          transition: all 0.2s;
          background-image: url(../assets/true.png);
          background-size: 0px 0px;
          &:hover {
            width: 19px;
            height: 19px;
            transition: all 0.2s;
            border: 0px;
            background-image: url("../assets/true.png");
            background-position-x: center;
            background-position-y: center;
            background-size: 19px 19px;
          }
        }
        .title {
          font-size: 15px;
          margin-left: 10px;
          line-height: 45px;
        }
      }
    }
  }
  .add_todo {
    cursor: pointer;
    font-size: 14px;
    margin: 10px 0px 0px 0px;
    text-align: left;
    .add {
      background: rgb(221, 75, 57);
      font-weight: bold;
      color: white;
      padding: 8px 10px;
      border-radius: 2px;
    }
    .close {
      margin-left: 10px;
      color: rgb(128, 128, 128);
    }
  }
}
</style>
