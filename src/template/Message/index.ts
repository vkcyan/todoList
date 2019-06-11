// main.js
import Vue from "vue";
import Main from "./message.vue";

let ToastConstructor = Vue.extend(Main); // 这个在前面的前置知识内容里面有讲到
let instance;

const Toast: object = function(data: any = {}) {
  instance = new ToastConstructor({
    data
  }); // 渲染组件
  document.body.appendChild(instance.$mount().$el); // 挂载到 body 下
};
// ["success", "error"].forEach((type: any) => {
//   Toast[type] = (options: any) => {
//     options.type = type;
//     return Toast(options || {});
//   };
// });

export default Toast;
