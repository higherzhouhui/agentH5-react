/* eslint-disable */
import moment from 'moment'

/**
 * 去除重複項
 */
Array.prototype.unique = function () {
    return Array.from(new Set(this))
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
    )
}
function Local(name, value, time) {
    try {
      let date = Date.parse(new Date()) / 1000;
      if (value === null) {
        localStorage.removeItem(name);
      } else if (value !== undefined) {
        if (time) {
          localStorage.setItem(name, JSON.stringify({ value, time: date + time }));
        } else {
          localStorage.setItem(name, JSON.stringify({ value }));
        }
      } else {
        const v = localStorage.getItem(name);
        if (v) {
          if (JSON.parse(v) && JSON.parse(v).time) {
            if (JSON.parse(v).time - date > 0) {
              return JSON.parse(v).value;
            } else {
              localStorage.removeItem(name);
              return undefined;
            }
          } else return JSON.parse(v).value;
        } else return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  };
export function stampToTimeStr(timestamp, accuracy = 'day') {
    const fmt = {
        day: 'YYYY-MM-DD',
        hour: 'YYYY-MM-DD HH',
        min: 'YYYY-MM-DD HH:mm',
        sec: 'YYYY-MM-DD HH:mm:ss',
    }
    return moment(timestamp).format(fmt[accuracy] || fmt.day)
}

export function numToStrWith2Point(num) {
    return (Math.floor(num * 100) / 100).toFixed(2)
}
export const getLang = language => {
    switch (language) {
        case 'zh':
            return 'CN'
        case 'zhtw':
            return 'TW'
        case 'en':
            return 'EN'
        case 'jp':
            return 'JP'
        default:
            return 'JP'
    }
}
function appStorage(key, val) {
    const k = '__app__'
    if (!Local(k)) {
        Local(k, '{}')
    }
    const data = JSON.parse(Local(k) || '{}')

    if (val === undefined) {
        return data[key]
    }

    data[key] = val
    Local(k, JSON.stringify(data))
    return val
}


const getOrSetVal = (k, val) => {
    return val === undefined ? appStorage(k) : appStorage(k, val)
}

export function getDeviceUUID() {
    let dUUID = appStorage('device-uuid')
    if (!dUUID) {
        dUUID = uuidv4()
        appStorage('device-uuid', uuidv4())
    }

    return dUUID
}

export function authorization(token) {
    if (token) {
        Local('token', token)
    }
    return getOrSetVal('authorization', token)
}

export function userInfo(info) {
    return getOrSetVal('user-info', info) || {}
}

export function isLogin() {
    return !!authorization()
}

export function cleanUserInfo() {
    Local('token', '')
    Local('userInfo', '')
    authorization('')
    userInfo({})
}

export async function updateUserInfo() {
    // const user = await makeRequest({ url: '/center-client/sys/user/get/info' })
    // Local('userInfo', user)
    // userInfo(user)
    // return user;
}

export function userAgent() {
    const ua = window.navigator.userAgent
    if (ua.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/)) {
        if (/iPhone|iPad|iPod/.test(ua)) {
            return 'ios'
        } else if (/Android/.test(ua)) {
            return 'android'
        }
    } else {
        return 'PC';
    }
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

export function getUrlDomain() {
    return window.location.protocol + '//' + window.location.host
}

export function formatLast4(str) {
    if (!str) return
    let temp = String(str)
    let res = temp.substring(0, temp.length - 4);
    res += "****";
    return res
}