<template>
  <div>
    <div class="login_header">
      <img src="../assets/todo_list.png" alt="" />
    </div>

    <div class="login_form">
      <div class="email">
        <img src="../assets/email.png" alt="" />
        <input v-model="emailText" placeholder="请输入邮箱" type="text" />
      </div>
      <div v-show="!isLogin" class="name">
        <img src="../assets/user.png" alt="" />
        <input v-model="userText" placeholder="请输入用户名" type="text" />
      </div>
      <div class="paddword">
        <img src="../assets/password.png" alt="" />
        <input
          @keyup.enter="login"
          v-model="password"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <div v-show="!isLogin" class="paddword">
        <img src="../assets/password.png" alt="" />
        <input
          v-model="rulePass"
          placeholder="请再次输入密码"
          type="password"
        />
      </div>
    </div>
    <div v-if="isLogin" class="login_toggle">
      <div class="registry_btn" @click="toggleReg">去注册</div>
      <div class="login_btn" @click="login">登录</div>
    </div>
    <div v-if="!isLogin" class="login_toggle">
      <div class="registry_btn" @click="toggleReg">去登录</div>
      <div class="login_btn" @click="registry">注册</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { koaData } from "../interfaces/index";
import { registry, login } from "../api/api";
@Component({})
export default class Login extends Vue {
  public isLogin = true;
  public emailText = "";
  public userText = "";
  public password = "";
  public rulePass = "";
  // 切换到注册
  private toggleReg() {
    this.isLogin = !this.isLogin;
  }
  // 注册
  private async registry() {
    if (this.password === this.rulePass) {
      let data = await registry(this.emailText, this.userText, this.password);
      console.log(data);
      if (data.code == 200) {
        this.$message({
          message: data.data,
          type: "error"
        });
      } else if (data.code == 1) {
        this.toggleReg();
      }
    }
  }
  private async login() {
    let data = await login(this.emailText, this.password);
    if (data.code == 1) {
      this.$router.push({ path: "/" });
    } else {
      alert(data.data);
    }
  }
}
</script>

<style lang="less" scoped>
.login_header {
  margin: 20px 0;
  img {
    width: 30px;
    height: 30px;
  }
}
.login_toggle {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  div {
    cursor: pointer;
    margin: 0 30px;
    padding: 5px 20px;
    user-select: none;
  }
  .login_btn {
    border: 1px solid rgb(219, 79, 63);
    border-radius: 4px;
    background-color: rgb(219, 79, 63);
    color: white;
  }
  .registry_btn {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
.login_form {
  margin-top: 20px;

  .email {
    position: relative;
    input {
      .base_input();
    }
    img {
      margin-left: 5px;
      position: absolute;
      top: 50%;
      transform: translate(0%, -50%);
      width: 20px;
      height: 20px;
    }
  }
  .name {
    position: relative;
    input {
      margin-top: 10px;
      .base_input();
    }
    img {
      margin-left: 5px;
      position: absolute;
      top: 50%;
      transform: translate(0%, -30%);
      width: 20px;
      height: 20px;
    }
  }
  .paddword {
    position: relative;
    input {
      margin-top: 10px;
      .base_input();
    }
    img {
      margin-left: 5px;
      position: absolute;
      top: 50%;
      transform: translate(0%, -30%);
      width: 20px;
      height: 20px;
    }
  }
}
.base_input {
  padding-left: 40px;
  outline: none;
  width: 50%;
  height: 24px;
  padding: 6px 0px 6px 30px;
  font-size: 14px;
  line-height: 1.428571429;
  color: #555;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: all 1s;
  &:focus {
    box-shadow: 1px 1px 5px rgba(182, 182, 182, 0.3);
    border: 1px solid rgba(107, 106, 106, 0.6);
    transition: all 1s;
  }
}
</style>
