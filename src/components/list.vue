<template>
  <div class="list">
    <img class="drop" src="../assets/item.png" alt />
    <div class="item">
      <div class="item-left">
        <span class="icon_con" @click="deleteList(item.id)">
          <span class="icon"></span>
        </span>
        <div class="title_con">
          <div
            v-if="!item.isupdate"
            class="title"
            @click.stop="updateshow(item.id)"
          >
            {{ item.title }}
          </div>
          <input
            @keydown.enter="changeTitle(item.id, item.title)"
            @click.stop="defaultClick"
            v-if="item.isupdate"
            class="carryOutTitle"
            type="text"
            v-model="item.title"
          />
          <img
            @click.stop="updateshow(item.id)"
            src="../assets/revise.png"
            alt
          />
        </div>
      </div>
      <div class="item-right">
        <img src="../assets/calendar.png" alt />
        <span class="date">
          {{
            `${showTodoTime(item.timer).month}月${
              showTodoTime(item.timer).date
            }日`
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { getTime, getTodoTime } from "../utils/dateTime";
@Component({
  components: {
    draggable
  }
})
export default class todoInput extends Vue {
  @Prop(Object) item!: Object;

  @Emit("deleteList")
  deleteList(id: string) {
    return id;
  }
  @Emit("updateshow")
  updateshow(id: string) {
    return id;
  }

  private defaultClick(e: Element) {}

  private changeTitle(id: string, title: string) {
    this.clearTitle();
    this.defaultupdate(id, title);
  }

  @Emit("clearTitle")
  clearTitle() {}
  @Emit("updateTitle")
  defaultupdate(id: string, title: string) {
    return {
      id,
      title
    };
  }
  private showTodoTime(timer: number): object {
    return getTime(getTodoTime(timer));
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  align-items: center;
  &:hover .item .item-left .title_con img {
    opacity: 1;
  }
  &:hover .item .item-left .drop {
    opacity: 1;
  }
  &:hover .item .item-right img {
    opacity: 1;
  }
  &:hover .drop {
    opacity: 1;
  }
  .drop {
    cursor: move;
    padding-left: 20px;
    padding-right: 5px;
    width: 15px;
    height: 15px;
    opacity: 0;
  }
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(224, 224, 224);
    min-height: 40px;
    .item-left {
      display: flex;
      align-items: center;
      .icon_con {
        display: block;
        width: 17px;
        height: 17px;
        border: 1px solid rgb(177, 177, 177);
        border-radius: 50%;
        cursor: pointer;
        .icon {
          width: 17px;
          height: 17px;
          display: block;
          background-position-x: center;
          background-position-y: center;
          background-image: url(../assets/true.png);
          background-size: 0px 0px;
          opacity: 0;
          transition: all 0.2s;
          &:hover {
            display: block;
            background-image: url("../assets/true.png");
            background-position-x: center;
            background-position-y: center;
            background-size: 19px 19px;
            opacity: 1;
            transition: all 0.2s;
          }
        }
      }
      .title_con {
        text-align: left;
        display: flex;
        align-items: center;
        .title {
          cursor: pointer;
          display: inline-block;
          font-size: 15px;
          margin-left: 10px;
          line-height: 30px;
        }
        .carryOutTitle {
          outline: none;
          z-index: 2000;
          width: 240px;
          display: inline-block;
          font-size: 15px;
          line-height: 25px;
          margin: 10px 0px;
          margin-left: 10px;
        }
        img {
          cursor: pointer;
          margin-left: 20px;
          width: 20px;
          height: 20px;
          opacity: 0;
        }
      }
    }
    .item-right {
      display: flex;
      align-items: center;
      img {
        opacity: 0;
        cursor: pointer;
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
