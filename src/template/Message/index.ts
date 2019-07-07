// main.js
import Vue from "vue";
import Main from "./message.vue";

let ToastConstructor = Vue.extend(Main);
let instance;

const Toast: object = function(data: any = {}) {
  instance = new ToastConstructor({ data }) // 渲染组件
  document.body.appendChild(instance.$mount().$el); // 挂载到 body 下
};

export default Toast;
