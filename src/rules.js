const langObj = {
  'zh-CN': {
    prefixArr: {
      input: '请输入',
      select: '请选择',
    },
    min: {
      stringLongerThan(name, num) {
        return `${name}输入的字符应长于${num}位`;
      },
      numberLongerThan(name, num) {
        return `${name}应大于${num}`;
      },
      arrayLongerThan(name, num) {
        return `${name}应大于${num}条数据`;
      },
      stringAtLeast(name, num) {
        return `${name}应至少输入${num}个字符`;
      },
      numberAtLeast(name, num) {
        return `${name}不应小于${num}`;
      },
      arrayAtLeast(name, num) {
        return `${name}不应小于${num}条数据`;
      },
    },
    canNotBeEmpty: '不能为空',
    formatIncorrect: '格式不正确',
  },
  'en-US': {
    prefixArr: {
      input: 'Please input',
      select: 'Please select',
    },
    min: {
      stringLongerThan(name, num) {
        return `The characters of ${name} should be longer than ${num}`;
      },
      numberLongerThan(name, num) {
        return `${name} should be larger than ${num}`;
      },
      arrayLongerThan(name, num) {
        return `The data of ${name} should be larger than ${num}`;
      },
      stringAtLeast(name, num) {
        return `The character of ${name} should at least ${num}`;
      },
      numberAtLeast(name, num) {
        return `${name} should at least ${num}`;
      },
      arrayAtLeast(name, num) {
        return `The data of ${name} should at least ${num}`;
      },
    },
    canNotBeEmpty: ' can not be empty',
    formatIncorrect: ' format incorrect',
  },
};

let lang = 'en-US';
let curLangData = langObj[lang];
export function init(conf) {
  if (conf.lang) {
    lang = conf.lang;
    curLangData = langObj[lang];
  }
}

const invalidMsg = {
  required(field) {
    return curLangData.prefixArr[field.nodeType] ? `${curLangData.prefixArr[field.nodeType]}${field.text}` : `${field.text}${curLangData.canNotBeEmpty}`;
  },
};

export default {
  required: (val, field, ruleKey) => {
    if (typeof ruleKey == 'object' && ('required' in ruleKey)) {
      if (val === ruleKey.required) {
        return invalidMsg.required(field);
      }
    } else if ((val == undefined)
      || (typeof val === 'string' && val === '')
      || (val instanceof Array && val.length === 0)) {
      return invalidMsg.required(field);
    }

    return '';
  },
  min: (val, field, conf) => {
    if (conf.minEqual === false) {
      if (typeof val === 'string' && val.length > 0 && conf.min >= val.length) {
        return curLangData.min.stringLongerThan(field.text, conf.min);
      }

      if (typeof val === 'number' && conf.min >= val) {
        return curLangData.min.numberLongerThan(field.text, conf.min);
      }

      if (val instanceof Array && val.length > 0 && conf.min >= val.length) {
        return curLangData.min.arrayLongerThan(field.text, conf.min);
      }
    } else {
      if (typeof val === 'string' && val.length > 0 && conf.min > val.length) {
        return curLangData.min.stringAtLeast(field.text, conf.min);
      }

      if (typeof val === 'number' && conf.min > val) {
        return curLangData.min.numberAtLeast(field.text, conf.min);
      }

      if (val instanceof Array && val.length > 0 && conf.min > val.length) {
        return curLangData.min.arrayAtLeast(field.text, conf.min);
      }
    }
    return '';
  },
  email: (val, field) => {
    if (typeof val !== 'string') {
      return `${field.text}${curLangData.formatIncorrect}`;
    }
    if (val === '') {
      return '';
    }
    if (!/\S+@\S+\.\S+/.test(val)) {
      return `${field.text}${curLangData.formatIncorrect}`;
    }
    return '';
  },
};
