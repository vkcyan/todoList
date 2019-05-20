import { titleDate } from "@/interfaces";

/**
 * 获取信息 月份 日期
 */
export function getTime(date: Date): titleDate {
  let data: titleDate = {
    week: _weekChange(date.getDay()),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate()
  };
  return data;
}

/**
 * 将数字形式的星期转换成为文字格式
 * @param week 数字星期
 */
function _weekChange(week: number): string {
  return ["日", "一", "二", "三", "四", "五", "六"][week];
}

/**
 * 将时间戳转化为时间
 * @param timer 时间戳
 */
export function getTodoTime(timer: number): Date {
  return new Date(timer);
}
