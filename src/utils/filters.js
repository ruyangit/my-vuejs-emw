/**
 * 显示手机前三位后四位中间用****代替
 * @param phone
 */
export const formatPhone = (phone) => {
    if (typeof phone === 'number') {
        phone = phone.toString();
    }
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}