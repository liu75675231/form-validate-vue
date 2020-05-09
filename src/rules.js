export default {
  required: (val, field) => {
    const prefixArr = {
      input: '请输入',
      select: '请选择',
    };

    if ((val == undefined)
      || (typeof val === 'string' && val === '')
      || (val instanceof Array && val.length === 0)) {
      return prefixArr[field.nodeType] ? `${prefixArr[field.nodeType]}${field.text}` : `${field.text}不能为空`;
    }
    return '';
  },
  min: (val, field, conf) => {
    if (conf.minEqual === false) {
      if (typeof val === 'string' && val.length > 0 && conf.min >= val.length) {
        return `${field.text}输入的字符应长于${conf.min}位`;
      }

      if (typeof val === 'number' && conf.min >= val) {
        return `${field.text}应大于${conf.min}`;
      }

      if (val instanceof Array && val.length > 0 && conf.min >= val.length) {
        return `${field.text}应大于${conf.min}条数据`;
      }
    } else {
      if (typeof val === 'string' && val.length > 0 && conf.min > val.length) {
        return `${field.text}应至少输入${conf.min}个字符`;
      }

      if (typeof val === 'number' && conf.min > val) {
        return `${field.text}不应小于${conf.min}`;
      }

      if (val instanceof Array && val.length > 0 && conf.min > val.length) {
        return `${field.text}不应小于${conf.min}条数据`;
      }
    }
    return '';
  },
  email: (val, field) => {
    if (typeof val !== 'string') {
      return `${field.text}格式不正确`;
    }
    if (val === '') {
      return '';
    }
    if (!/\S+@\S+\.\S+/.test(val)) {
      return `${field.text}格式不正确`;
    }
    return '';
  },
};
