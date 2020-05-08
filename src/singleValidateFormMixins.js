import ValidateForm from './init.js';

export default {
  methods: {
    svfInit(form, context, func) {
      ValidateForm.init('default', form, context, func);
    },
    svfGetConfData(name, index) {
      return ValidateForm.getConfData('default', name, index);
    },
    svfGetValidateMsg(name, index, itemName) {
      return ValidateForm.getValidateMsg('default', name, index, itemName);
    },
    svfSetValidateMsg(name, errMsg) {
      return ValidateForm.setValidateMsg('default', name, errMsg);
    },
    svfOnTextFieldBlur(name, value, data) {
      return ValidateForm.onTextFieldBlur('default', name, value, data);
    },
    svfValidate(form) {
      return ValidateForm.validate('default', form);
    },
    svfAddArrayData(name) {
      return ValidateForm.addValidateDataByArray('default', name);
    },
    svfRemoveValidateDataByArray(attr, index) {
      return ValidateForm.removeValidateDataByArray('default', attr, index);
    },
  },
};
