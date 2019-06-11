<template>
  <div class="home">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <!-- todoList过期 -->
    <todo-header></todo-header>
    <div class="oldadays" v-if="expiredList.length != 0">
      <span class="newsText">过期</span>
    </div>
    <draggable
      handle=".drop"
      :animation="200"
      v-model="expiredList"
      @end="onoldEnd"
      class="todoNewsList listpadd"
    >
      <div v-for="item in expiredList" :key="item.date">
        <ListTodo :item="item" @deleteList="deleteOldList"></ListTodo>
      </div>
    </draggable>
    <!-- todoList今天 -->
    <div class="Nowadays">
      <span class="newsText">今天</span>
      <span class="newsWeek">周{{ newTime.week }}</span>
      <span class="newsMonth">{{ newTime.month }}月{{ newTime.date }}日</span>
    </div>

    <draggable
      handle=".drop"
      :animation="200"
      v-model="currentList"
      @end="onEnd"
      class="todoNewsList"
    >
      <!-- 已经添加的列表 -->
      <div v-for="item in currentList" :key="item.date">
        <ListTodo :item="item" @deleteList="deleteList"></ListTodo>
      </div>
    </draggable>
    <todoInput
      ref="todo_Input"
      v-if="addShow"
      @addTodoActive="addTodoActive"
    ></todoInput>
    <!-- 添加任务入口 -->
    <div class="add_todo">
      <span @click="test" class="add">添加任务</span>
      <span @click="closeTodo" class="close" v-if="addShow">取消</span>
    </div>
    <!-- 蒙版 -->
    <div v-if="!isShowList" class="nushow"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import { titleDate, todoList } from "../interfaces";
import { getTime, getTodoTime } from "../utils/dateTime";
import { getTodo } from "../api/api";
import ListTodo from "../components/list.vue";
import todoInput from "../components/todoInput.vue";
import todoHeader from "../components/header.vue";
@Component({
  components: {
    todoInput,
    ListTodo,
    draggable,
    todoHeader
  }
})
export default class Home extends Vue {
  async mounted() {
    // 静态版本的初始化
    this.isShowList = false;
    let list = await getTodo();
    this.isShowList = true;
    this.init();
  }
  private isShowList: boolean = false;
  private addShow: boolean = false;
  private expiredList: todoList[] = []; // 过期的任务
  private currentList: todoList[] = []; // 今天的任务
  /**
   * init 初始化函数
   */
  public init(): void {
    // 获取数据源
    let list: todoList[] = this.getlist();
    // 获取当天的时间戳区间
    let currentDate: titleDate = getTime(new Date());
    let startTime: number = new Date(
      `${currentDate.year}-${currentDate.month}-${currentDate.date} 00:00:00`
    ).getTime();
    let endTime: number = new Date(
      `${currentDate.year}-${currentDate.month}-${currentDate.date} 23:59:59`
    ).getTime();
    let expiredList: todoList[] = [];
    let currentList: todoList[] = [];
    list.forEach(res => {
      if (res.date < startTime) {
        // 过期任务
        expiredList.push(res);
        // 今天的任务
      } else if (res.date > startTime && res.date < endTime) {
        currentList.push(res);
      }
    });

    this.setlist(currentList);
    this.setoldList([...this.getoldList(), ...expiredList]);
    this.expiredList = this.getoldList();
    this.currentList = this.getlist();
  }
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
   * test
   */
  public test() {
    this.$message({
      message: "文字"
    });
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
      this.currentList = this.getlist();
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
   * getoldList 获取过期的todo
   */
  public getoldList(): todoList[] {
    return JSON.parse(localStorage.getItem("oldtodoList") || "[]");
  }
  /**
   * setoldList 更新过期的todo
   */
  public setoldList(oldtodoList: object[]) {
    localStorage.setItem("oldtodoList", JSON.stringify(oldtodoList));
  }
  /**
   * updateList 删除函数
   * date 时间戳
   */
  public deleteList(todoDate: number) {
    this.setlist(this.currentList.filter(item => item.date !== todoDate));
    this.currentList = this.getlist();
  }
  /**
   * deleteOldList 删除过期任务
   */
  public deleteOldList(todoDate: number) {
    this.setoldList(this.expiredList.filter(item => item.date !== todoDate));
    this.expiredList = this.getoldList();
  }
  private onEnd() {
    this.setlist(this.currentList);
  }
  private onoldEnd() {
    this.setoldList(this.expiredList);
  }
}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 550px;
  overflow: auto;
  .oldadays {
    text-align: left;
    padding-left: 30px;
    padding-top: 30px;
    .newsText {
      font-size: 20px;
      color: rgb(221, 75, 57);
    }
  }
  .Nowadays {
    text-align: left;
    padding: 30px;
    padding-bottom: 0px;
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
    padding-right: 30px;
  }
  .add_todo {
    padding: 0 30px;
    padding-bottom: 20px;
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
.listpadd {
  margin-bottom: 10px;
}
.nushow {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(68, 68, 68);
}
</style>
