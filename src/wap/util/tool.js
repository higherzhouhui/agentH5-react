import i18n from '../language/config';
const translateTitle = (type) => {
    const {t} = i18n
    return t(type)
}
export function freeTime(value, g = 'y-m-d') {
  let time = new Date(Number(value))
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let i = time.getMinutes()
  let s = time.getSeconds()
  return g.replace('y', y).replace('m', m > 9 ? m : '0' + m).replace('d', d > 9 ? d : '0' + d).replace('h', h > 9 ? h :
    '0' + h).replace('i', i > 9 ? i : '0' + i).replace('s', s > 9 ? s : '0' + s)
}

// 在数组中,随机生成多少个 arr,count
export function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

//防抖的方法
export const debounceOther = (fn, delay = 3000) => {
  let canRun = true;
  return (...rest) => {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, rest);
      canRun = true;
    }, delay)
  }
};
export function shiftToReadNumber(number) {
  try {
    if (number) {
      if (!isNaN(number * 1)) {
        const wholeStr = Number(number).toFixed(2);
        const houZhui = wholeStr.slice(wholeStr.lastIndexOf('.'), wholeStr.length);
        const zhuti = wholeStr.slice(0, wholeStr.lastIndexOf('.'))
        const result =  String(zhuti).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + houZhui
        return result
      } else {
        return number
      }
    } else {
      return '0.00'
    }
  } catch {
    return '0.00'
  }
}
export const agentTypeDic = [
  translateTitle('CUST.translate175'),translateTitle('CUST.translate198'),
  translateTitle('CUST.translate199'),translateTitle('CUST.translate200'),translateTitle('CUST.translate201')
];

export const RoleTypeDictory = {
  SuperAdmin: 'SuperAdmin',
  Total: 'Total',
  Normal: 'Normal',
  Direct: 'Direct',
}