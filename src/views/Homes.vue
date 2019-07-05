<template>
  <div class="home" @click="clearTitle">
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
        <ListTodo
          :item="item"
          @deleteList="deleteOldList"
          @updateshow="updateoldshow"
          @clearTitle="clearTitle"
          @updateTitle="updatetitle"
        ></ListTodo>
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
        <ListTodo
          :item="item"
          @deleteList="deleteList"
          @updateshow="updateshow"
          @clearTitle="clearTitle"
          @updateTitle="updatetitle"
        ></ListTodo>
      </div>
    </draggable>
    <todoInput ref="todo_Input" v-if="addShow" @addTodoActive="addTodoActive"></todoInput>
    <!-- 添加任务入口 -->
    <div class="add_todo">
      <span @click="addTodo" class="add">添加任务</span>
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
import { getTodo, setTodo, carryOutTodo, updateTitle } from "../api/api";
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
    this.init();
  }
  private isShowList: boolean = false;
  private addShow: boolean = false;
  private expiredList: todoList[] = []; // 过期的任务
  private currentList: todoList[] = []; // 今天的任务
  /**
   * init 初始化函数
   */
  public async init(): Promise<any> {
    let list = await getTodo();
    console.log(list);
    const { data } = list;
    this.isShowList = true;
    let currentDate: titleDate = getTime(new Date());
    let startTime: number = new Date(
      `${currentDate.year}-${currentDate.month}-${currentDate.date} 00:00:00`
    ).getTime();
    let endTime: number = new Date(
      `${currentDate.year}-${currentDate.month}-${currentDate.date} 23:59:59`
    ).getTime();
    let expiredList: todoList[] = [];
    let currentList: todoList[] = [];
    data.forEach((res: any) => {
      res.isupdate = false;
      if (res.timer < startTime) {
        // 过期任务
        expiredList.push(res);
        // 今天的任务
      } else if (res.timer > startTime && res.timer < endTime) {
        currentList.push(res);
      }
    });
    this.expiredList = expiredList;
    this.currentList = currentList;
  }
  // 获取当前时间
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
   * test 后期再进行优化
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
  public async addTodoActive(title: string) {
    if (title) {
      const data = {
        grade: 0,
        title
      };
      let res = await setTodo(data);
      await this.init();
      let todo_Input: any = this.$refs["todo_Input"];
      todo_Input.clearTodoValue();
      this.closeTodo();
    }
  }
  onoldEnd() {}
  onEnd() {}
  async deleteList(id: string) {
    let data = await carryOutTodo(id);
    console.log(data);
    this.init();
  }
  async deleteOldList(id: string) {
    let data = await carryOutTodo(id);
    console.log(data);
    this.init();
  }
  // 针对过期任务
  async updateoldshow(id: string) {
    this.expiredList.map((res, index) => {
      if (id === res.id) {
        this.expiredList[index].isupdate = true;
      } else {
        this.expiredList[index].isupdate = false;
      }
      console.log(this.expiredList);
    });
  }
  // 针对今天任务
  async updateshow(id: string) {
    this.currentList.map((res, index) => {
      if (id === res.id) {
        this.currentList[index].isupdate = true;
      } else {
        this.currentList[index].isupdate = false;
      }
    });
    console.log(this.currentList);
  }
  // 关闭所有
  clearTitle() {
    this.currentList.map((res, index) => {
      this.currentList[index].isupdate = false;
    });
    this.expiredList.map((res, index) => {
      this.expiredList[index].isupdate = false;
    });
  }
  async updateoldTitle(id: string) {
    console.log(id);
  }
  async updatetitle(data: any) {
    const { id, title } = data;
    let res = await updateTitle(id,title)
    console.log(res);
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
