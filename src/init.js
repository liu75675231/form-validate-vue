import Rules from './rules.js';

const confMap = {};
let vm;
export default {
  init(formKey, form, argsVm, argsConfFunc) {
    const conf = argsConfFunc();
    Object.keys(conf).forEach((key) => {
      if (conf[key].isArray) {
        conf[key].list = [];
      }
    });
    confMap[formKey] = {
      form,
      conf,
    };

    vm = argsVm;
  },
  getConfData(formKey, name, { subName, index } = {}) {
    const conf = confMap;
    if (index != undefined && subName != undefined) {
      return conf[formKey].conf[name].list[index][subName];
    }
    return conf[formKey].conf[name];
  },
  getValidateMsg(formKey, name, index, subName) {
    if (index == undefined) {
      const conf = this.getConfData(formKey, name, { index, subName });
      if (conf) {
        return conf.errMsg;
      }
    } else {
      const conf = this.getArrayErrMsgData(formKey, name, index, subName);
      return conf ? conf.errMsg : '';
    }

    return '';
  },
  getArrayErrMsgData(formKey, name, index, subName) {
    return confMap[formKey].conf[name].list[index][subName];
  },
  onTextFieldBlur(formKey, name, value, data = {}) {
    let errMsg = '';
    const field = this.getConfData(formKey, name, { index: data.index, subName: data.subName });

    if (!field) {
      return true;
    }

    if (field.rules instanceof Array && field.rules.length > 0) {
      for (let i = 0; i < field.rules.length; i++) {
        const ruleKey = field.rules[i];
        if (typeof ruleKey === 'string') {
          errMsg = Rules[ruleKey](value, field);
        } else if (typeof ruleKey === 'object') {
          Object.keys(ruleKey).some((ik) => {
            if (Rules[ik]) {
              errMsg = Rules[ik](value, field, ruleKey);
            }

            if (errMsg !== '') {
              return true;
            }
            return false;
          });
        } else if (typeof ruleKey === 'function') {
          errMsg = ruleKey.call(vm, value);
        }

        if (errMsg) {
          break;
        }
      }
    }

    field.errMsg = errMsg;

    field.changeCallback && field.changeCallback.call(this, value, field);
    vm.$forceUpdate();
    return errMsg === '';
  },
  setValidateMsg(formKey, name, errMsg) {
    const conf = this.getConfData(formKey, name);
    if (conf) {
      conf.errMsg = errMsg;
      vm.$forceUpdate();
      return true;
    }
    return false;
  },
  validate(formKey, form) {
    let isSuccess = true;
    const $this = this;

    Object.keys(form).forEach((elem) => {
      const data = form[elem];
      const confData = this.getConfData(formKey, elem);

      if (!confData) {
        return;
      }

      if (!$this.onTextFieldBlur(formKey, elem, data)) {
        isSuccess = false;
      }
      if (confData.isArray) {
        data.forEach((innerElem, index) => {
          Object.keys(innerElem).forEach((innerKey) => {
            if (!$this.onTextFieldBlur(formKey, elem, innerElem[innerKey], { index, subName: innerKey })) {
              isSuccess = false;
            }
          });
        });
      }
    });
    return isSuccess;
  },
  addValidateDataByArray(formKey, attr) {
    const confData = this.getConfData(formKey, attr);
    confData.list.push(this.deepClone(confData.conf));
  },
  removeValidateDataByArray(formKey, attr, index) {
    const confData = this.getConfData(formKey, attr);
    confData.list.splice(index, 1);
  },
  deepClone(item) {
    if (!item) {
      return item;
    } // null, undefined values check

    const types = [Number, String, Boolean];
    let result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach((type) => {
      if (item instanceof type) {
        result = type(item);
      }
    });

    if (typeof result == 'undefined') {
      if (Object.prototype.toString.call(item) === '[object Array]') {
        result = [];
        item.forEach((child, index) => {
          result[index] = this.deepClone(child);
        });
      } else if (typeof item == 'object') {
        // testing that this is DOM
        if (item.nodeType && typeof item.cloneNode == 'function') {
          result = item.cloneNode(true);
        } else if (!item.prototype) { // check that this is a literal
          if (item instanceof Date) {
            result = new Date(item);
          } else {
            // it is an object literal
            result = {};
            Object.keys(item).forEach((i) => {
              result[i] = this.deepClone(item[i]);
            });
          }
        } else {
          result = item;
        }
      } else {
        result = item;
      }
    }

    return result;
  },
};
