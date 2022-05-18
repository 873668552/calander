
export const getRenderDataPerMonth: (year: number, month: number) => Array<any> = (year: number, month: number) => {

    //定义每个月的天数，如果是闰年第二月改为29天
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[1] = 29
    }

    let daysCount = daysInMonth[month],
    addDays = new Date(year, month, 1).getDay(),
    monthData = []

    //补足上一个月
    for (; addDays > 0; addDays--) {
        monthData.unshift(null)
    }
    //添入当前月
    for (let i = 0; i < daysCount;) {
        monthData.push(new Date(year, month, ++i))
    }
    //补足下一个月
    for (let i = 42 - monthData.length, j = 0; j < i; j++) {
        monthData.push(null)
    }
    monthData.forEach(element => {
        
    });
    return monthData
}

export const initDate: (inpYear?: number | undefined, inpMon?: number | undefined) => Array<Array<any>> = (inpYear?: number | undefined, inpMon?: number | undefined) => {
  let nowDate = new Date(),
  year = inpYear || nowDate.getFullYear(),
  mon = inpMon || nowDate.getMonth();
  if (mon >= 11) {
    return [getRenderDataPerMonth(year, mon), getRenderDataPerMonth(year + 1, 0)]
  } else {
    return [getRenderDataPerMonth(year, mon), getRenderDataPerMonth(year, mon + 1)]
  }
}

export const formatDays: (days: Array<any>) => Array<Array<any>> = days => {
  // 7 组
  let rows: any[] = [],
  tarArr: any[] = [];
  days && days.length && days.forEach((item, ind) => {
    rows.push(item)
    if ((ind + 1) % 7 == 0) {
      tarArr.push(rows)
      rows = []
    }
  })
  return tarArr
}

export const isInrenger: (date: number | undefined, start: number | undefined, end: number | undefined) => boolean = (date, start, end) => {
  if (!date || !start || !end) {
    return false
  }
  return start < date && end > date
}

export const formatDate: (date: number | undefined) => string = (date: number | undefined) => {
  if (!date) {
    return 'Invalid date'
  }
  let curDate = new Date(date);
  if (!curDate.valueOf()) {
    return 'Invalid date'
  }
  let year = curDate.getFullYear(),
  month = curDate.getMonth() + 1,
  day = curDate.getDate();
  return `${day}/${month}/${year}`
}

export const completeDateVauleof: (inpNum: number | undefined) => number | undefined = (inpNum: number | undefined) => {
  if (!inpNum) {
    return
  }
  let inpDate = new Date(inpNum),
  year = inpDate.getFullYear(),
  mon = inpDate.getMonth(),
  day = inpDate.getDate();
  return new Date(`${year}/${mon + 1}/${day}`).valueOf()
}
