import request from "@/utils/request";

/**
 * 注册
 * @param email 邮箱地址
 * @param password 密码
 */
export function registry(email: string, password: string) {
  return request({
    url: "/registry",
    data: {
      email,
      password
    }
  });
}

function login(email: string, password: string) {
  return;
}
