# form-validate-vue

A validate module for vue. It aims to give a convenient way to validate vue data. It use mixins to inject to vue instance.

Installation
npm install form-validate-vue

How to use

如何使用：
1. 引入_svfMixins.single

new Vue({
    mixins: [_svfMixins.single],
})

2. 在created中使用this.svfInit()函数初始化配置
```javascript
this.svfInit(this.data.form, this, () => {
      return {
        input1: {
          text: '需要校验的字段名称', //   需要校验的字段名称，主要是用于当校验失败时候的显示使用 
          nodeName: 'input', // 节点类型，目前支持input，select，如果是input，校验失败时是"请输入"前缀，如果是select，校验失败时是"请选择"前缀
          rules: [    // 校验规则列表，校验规则是从前到后的顺序，如果前面的规则校验不通过，后面的规则将不会被校验
            'required', // 判断是否必填   
            'email',    // 判断是否是邮箱格式
            function () {
                return ""; // 返回""则代表校验成功，反之会判定为校验失败 
            } // 自定义校验规则
          ],
          changeCallback (value) {  // 校验完成之后的回调
            if (!value) {  
                $this.svfSetValidateMsg('StockCode', ''); // 设置其他字段的校验失败信息
            }
          } 
        },
        Contacts: {   // 数组格式的字段
          isArray: true,
          text: '联系人',
          rules: [
            'required',  // 代表此至少包含一个数组
          ],
          conf: { // 数组中每个字段的配置
            Name: {      // 字段名称
              text: '客户联系人姓名',
              nodeName: 'input',
              rules: [
                'required',
              ],
            },
          },
        },
      };
    });
```

3. 通过svfOnTextFieldBlur('字段配置名称', '当前字段的值')监听html中的触发事件
```html
<input type="text"  v-on:change="svfOnTextFieldBlur('Source', data.form.Source)" />
```
4. 通过svfGetValidateMsg('字段配置名称')来显示某个字段的错误信息
```html
<div>{{ svfGetValidateMsg('Source') }}</div>
```

5. 通过svfValidate('表单对象')进行全局校验,返回true则代表通过校验，返回false则代表校验失败
```javascript
this.svfValidate(form)
```

