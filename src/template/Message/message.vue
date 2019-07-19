<template>
  <div class="toast" :class="showClass">
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  name: "Toast",
  mounted() {
    setTimeout(() => {
      this.close = true;
    }, this.duration - 1000);
    setTimeout(() => {
      // 3s 后通过父级移除子元素的方式来移除该组件实例和 DOM 节点
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, this.duration);
  },
  computed: {
    showClass() {
      let showclass = '';
      if (this.type) {
        showclass += `toast--${this.type}`;
      }
      if (this.close) {
        showclass += " " + "toast_close";
      }
      return showclass;
    }
  },
  data() {
    return {
      close: false, // 用于设置结束动画
      type: "", //
      message: "",
      duration: 3000
    };
  }
};
</script>
<style lang="less" scoped>
.toast {
  animation: shows 0.5s ease 0s 1 normal forwards;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > p {
    padding: 12px 60px;
    font-size: 18px;
    border-radius: 4px;
    background: rgba(17, 17, 17, 0.7);
    color: white;
  }
  &--error p {
    background: rgba(255, 0, 0, 0.5);
  }
  &--success p {
    background: rgba(0, 133, 0, 0.5);
  }
  &--info p {
  }
}
.toast_close {
  animation: closeToast 0.5s ease 0s 1 normal forwards;
}
@keyframes shows {
  0% {
    top: -200px;
  }
  100% {
    top: 0px;
  }
}
@keyframes closeToast {
  0% {
    top: 0px;
  }
  100% {
    top: -200px;
  }
}
</style>
