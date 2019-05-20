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
    <div class="todoNewsList">
      <!-- 已经添加的列表 -->
      <div class="item" v-for="item in list" :key="item.date">
        <div class="item-left">
          <span class="icon" @click="carryOut(item.date)"></span>
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
      <todoInput v-if="addShow" :addTodoActive="addTodoActive"></todoInput>
      <!-- 添加任务入口 -->
      <div class="add_todo">
        <span @click="addTodo" class="add">添加任务</span>
        <span @click="closeTodo" class="close">取消</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getTime, getTodoTime } from "../utils/dateTime";
import { titleDate, todoList } from "../interfaces";
import { Component, Vue } from "vue-property-decorator";
import todoInput from "../components/todoInput.vue";
@Component({
  components: {
    todoInput
  }
})
export default class Home extends Vue {
  private addShow: boolean = false;
  private list: todoList[] = [
    {
      grade: 0,
      title: "第一条",
      date: new Date().getTime()
    },
    {
      grade: 0,
      title: "第二条",
      date: new Date().getTime() + 1
    }
  ];
  private get newTime(): object {
    let time: titleDate = getTime(new Date());
    return time;
  }
  private showTodoTime(timer: number): object {
    return getTime(getTodoTime(timer));
  }
  private carryOut(todoDate: number) {
    this.list = this.list.filter(item => item.date !== todoDate);
  }
  private addTodo() {
    this.addShow = true;
  }
  private closeTodo() {
    this.addShow = false;
  }
  /**
   * data todo的内容
   */
  public addTodoActive(data: string) {
    console.log(data);
  }
}
</script>

<style lang="less" scoped>
.home {
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
          width: 15px;
          height: 15px;
          border: 0.5px solid black;
          border-radius: 50%;
          cursor: pointer;
        }
        .title {
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
