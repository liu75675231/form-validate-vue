import Vue from 'vue/dist/vue.js';
import './style/index.css';
import SingleValidateFormMixins from './singleValidateFormMixins.js';

new Vue({
  el: '#app',
  mixins: [
    SingleValidateFormMixins,
  ],
  data() {
    return {
      data: {
        form: {
          WebURL: '',
          Source: '',
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
        WebURL: {
          text: '公司网址',
          nodeName: 'input',
          isMust: true,
        },
        Source: {
          nodeName: 'select',
          isMust: true,
          text: '客户来源',
        },
        IsOnMarket: {
          text: '是否上市',
          nodeName: 'input',
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
          text: '股票代码',
          nodeName: 'input',
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
          conf: {
            Name: {
              isMust: true,
              text: '客户联系人姓名',
              nodeName: 'input',
            },
            Gender: {
              text: '性别',
              isMust: true,
              nodeName: 'select',
            },
          },
          list: [],
        },
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
