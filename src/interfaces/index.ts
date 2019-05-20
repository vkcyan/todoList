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
  grade: number; // 任务优先级
  title: string; // -todo的主体文字
  date: number; // 时间戳
}
