/**
 * 显示手机前三位后四位中间用****代替
 * @param phone
 */
export const formatPhone = (phone) => {
    if (typeof phone === 'number') {
        phone = phone.toString()
    }
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
}

export const formatEmail = (email) => {
  let arr = email.split('@')
  let start = ''
  let end = ''
  if (arr[0].length > 7) {
    start = arr[0].substring(0, 3)
    end = arr[0].substring(7, arr[0].length)
  }
  return arr[0].length > 7 ? `${start}****${end}@${arr[1]}` : email
}

