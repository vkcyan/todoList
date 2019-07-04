import { AxiosResponse } from "axios";

/**
 * 时间工具类函数的
 */
export interface titleDate {
  week: string; // 星期
  year: number; // 年
  month: number; // 月份
  date: number; // 日期
}

/**
 * -TodoList主体的数据结构
 */
export interface todoList {
  code: string // 用户id
  id: string // todoid
  priority: number //优先级
  sort: number // 排序
  timer: number // 时间戳
  title: string // 主体内容,
  isupdate: boolean // 是否是修改状态
}

/**
 * 后端数据格式
 */
export interface koaData extends AxiosResponse {
  code: number;
}
