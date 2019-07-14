<template>
  <div class="home">
    <div class="back_home" v-if="isupdate" @click="Rollbackdata"></div>
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
    <todoInput
      ref="todo_Input"
      v-if="addShow"
      @addTodoActive="addTodoActive"
      @closeTodo="closeTodo"
    ></todoInput>
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
  private isShowList: boolean = false; // 控制todolist的显示
  private addShow: boolean = false; // 是否显示添加组件
  private isupdate: boolean = false; // 当前是否为更新title状态
  private updateData = {
    index: 0, // 数据
    title: "", // 数据
    type: 1 // 1 过期todo 2 今天todo
  };
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
  private addTodo(): void {
    this.addShow = true;
  }
  private closeTodo(): void {
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
      this.$message({
        message: "添加成功",
        type: "success"
      });
    }
  }
  onoldEnd() {}
  onEnd() {}
  async deleteList(id: string) {
    let data = await carryOutTodo(id);
    this.init();
    this.$message({
      message: "完成任务",
      type: "success"
    });
  }
  async deleteOldList(id: string) {
    let data = await carryOutTodo(id);
    console.log(data);
    this.init();
    this.$message({
      message: "完成任务",
      type: "success"
    });
  }
  // 针对过期任务
  async updateoldshow(id: string) {
    this.isupdate = true;
    this.expiredList.map((res, index) => {
      if (id === res.id) {
        this.expiredList[index].isupdate = true;
        // 保存副本
        this.updateData = {
          index, //
          title: this.expiredList[index].title,
          type: 1
        };
      } else {
        this.expiredList[index].isupdate = false;
      }
    });
  }
  // 针对今天任务
  async updateshow(id: string) {
    // 点击的时候还要保存副本,因为可能存在
    this.isupdate = true;
    this.currentList.map((res, index) => {
      if (id === res.id) {
        this.currentList[index].isupdate = true;
        // 保存副本
        this.updateData = {
          index, //
          title: this.currentList[index].title,
          type: 2
        };
      } else {
        this.currentList[index].isupdate = false;
      }
    });
  }
  // 回滚未修改的数据
  Rollbackdata() {
    if (this.updateData.type == 1) {
      this.expiredList[this.updateData.index].title = this.updateData.title;
    } else if (this.updateData.type == 2) {
      this.currentList[this.updateData.index].title = this.updateData.title;
    }
    this.clearTitle();
  }
  // 关闭所有
  clearTitle() {
    this.currentList.map(
      (res, index) => (this.currentList[index].isupdate = false)
    );
    this.expiredList.map(
      (res, index) => (this.expiredList[index].isupdate = false)
    );
    this.isupdate = false;
    // 关闭所有的时候需要对修改的数据进行回滚
  }
  async updatetitle(data: any) {
    const { id, title } = data;
    try {
      let res = await updateTitle(id, title);
      this.$message({
        // 排序
        message: res.data,
        type: "success"
      });
    } catch (error) {
      this.$message({
        message: error,
        type: "error"
      });
    }

    this.isupdate = false;
  }
}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 550px;
  overflow: auto;
  .back_home {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
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
