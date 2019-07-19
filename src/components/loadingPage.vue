<template>
  <!-- v-if="showLoading" -->
  <div id="showloading" v-if="showLoading">
    <canvas id="loading"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  mounted() {
    // this.$nextTick(() => {
    //   let con: HTMLElement | null = document.getElementById("showloading");
    //   let canvas: HTMLElement | null = document.getElementById("loading");
    //   if (con && canvas) {
    //     canvas.setAttribute("width", `${con.clientWidth}px`);
    //     canvas.setAttribute("height", `${con.clientHeight}px`);
    //     let ctx: CanvasRenderingContext2D = (canvas as HTMLCanvasElement).getContext(
    //       "2d"
    //     )!;
    //     ctx.fillStyle = "green";
    //     ctx.fillRect(10, 10, 150, 100);
    //   }
    // });
  }
})
export default class LoadingPage extends Vue {
  @Prop(Boolean) showLoading!: Boolean;
}
</script>

<style lang="less" scoped>
#showloading {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(253, 253, 253);
}
</style>
