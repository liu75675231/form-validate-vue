import Vue from 'vue/dist/vue.js';
import './style/index.css';
import ValidateFormMixins from './ValidateFormMixins.js';

new Vue({
  el: '#app',
  mixins: [
    ValidateFormMixins.single,
  ],
  data() {
    return {
      data: {
        form: {
          WebURL: '',
          Source: '',
          Gender: 0,
          IsOnMarket: false,
          StockCode: '',
          Contacts: [],
        },
      },
    };
  },
  created() {
    this.svfInit(this.data.form, this, () => {
      const $this = this;
      return {
        conf: {
          WebURL: {
            text: 'Website',
            nodeName: 'input',
            rules: [
              'required',
            ],
          },
          Email: {
            text: 'Email',
            nodeName: 'input',
            rules: [
              'required',
              'email',
            ],
          },
          Source: {
            nodeName: 'select',
            text: 'Customer Source',
            rules: [
              'required',
            ],
          },
          Gender: {
            nameName: 'select',
            text: 'Gender',
            rules: [
              {
                required: 0, // required but give a emptyVal, when the val is 0, it will not pass the validate
              },
            ],
          },
          IsOnMarket: {
            text: '是否上市',
            nodeName: 'input',
            rules: [
              'required',
            ],
            changeCallback(value) {
              if (!value) {
                $this.svfSetValidateMsg('StockCode', '');
              }
            },
          },
          StockCode: {
            isMust() {
              if ($this.data.form.IsOnMarket) {
                return true;
              }
              return false;
            },
            rules: [
              function (val) {
                if ($this.data.form.IsOnMarket && val == '') {
                  return '请输入股票代码';
                }
                return '';
              },
              function () {
                if (!$this.data.form.IsOnMarket) {
                  return '';
                }
                if (isNaN($this.data.form.StockCode)) {
                  return '股票代码必须为数字';
                }

                if ($this.data.form.StockCode % 1 != 0) {
                  return '股票代码必须为整数';
                }

                if ($this.data.form.StockCode <= 0) {
                  return '股票代码必须大于0';
                }

                return '';
              },
            ],
            text: '股票代码',
            nodeType: 'input',
            validate() {
              if (!$this.data.form.IsOnMarket) {
                return '';
              }
              if (isNaN($this.data.form.StockCode)) {
                return '股票代码必须为数字';
              }

              if ($this.data.form.StockCode % 1 != 0) {
                return '股票代码必须为整数';
              }

              if ($this.data.form.StockCode <= 0) {
                return '股票代码必须大于0';
              }

              return '';
            },
          },
          Contacts: {
            isArray: true,
            isMust: true,
            text: '客户联系人',
            rules: [
              'required',
            ],
            conf: {
              Name: {
                isMust: true,
                text: '客户联系人姓名',
                nodeName: 'input',
                rules: [
                  'required',
                ],
              },
              Gender: {
                text: '性别',
                isMust: true,
                nodeName: 'select',
                rules: [
                  'required',
                ],
              },
            },
          },
        },
        lang: 'en-US',
      };
    });
  },
  methods: {
    submit(formKey, form, callback) {
      if (this.svfValidate(form)) {
        callback && callback();
      }
    },
    addContact() {
      this.data.form.Contacts.push({
        Id: '',
        Name: '',
        JobTitle: '',
        Email: '',
        WeixinNum: '',
        QQ: '',
        FaxNumber: '',
        IsAdmin: '',
        IsExecuted: '',
        Gender: '',
        PhoneAreaId: '',
        PhoneAreaCode: '',
        MobileNumber: '',
        BirthDate: '',
        TelNumber: '',
      });
      this.svfAddArrayData('Contacts');
      this.svfOnTextFieldBlur('Contacts', this.data.form.Contacts);
    },
    removeContact() {
      this.data.form.Contacts.pop();
      this.svfRemoveValidateDataByArray('Contacts', this.data.form.Contacts.length);
      this.svfOnTextFieldBlur('Contacts', this.data.form.Contacts);
    },
  },
});
