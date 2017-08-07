import { Validator } from 'vee-validate'
const dictionary = {
    en: {
        messages: {
            required: () => '请输入你要填写的内容'
        }
    }
};

Validator.updateDictionary(dictionary);

Validator.extend('phone', {
    messages: {
        en: field => '请填写正确的11位手机号码',
    },
    validate: value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});
Validator.extend('shlth', {
    getMessage(field, args) { // 添加到默认的英文错误消息里面
        return `关键字至少包含${args[0]}个中文字，请完善企业名称`
    },
    validate(value, args) {
        if (String(value).length >= Number(args[0])) {
            return true
        } else {
            return false
        }
    }
});