# form-validate-vue

A validate module for vue. It aims to give a convenient way to validate vue data. It use mixins to inject to vue instance.

Github: https://github.com/liu75675231/form-validate-vue

Live example: https://codesandbox.io/s/quirky-mccarthy-n15oe?file=/src/App.vue

If you have trouble using that plugin. please send a feecback email to liu75675231@126.com. Thanks

Install
```javascript
npm i form-validate-vue
```



Usage

Basic usage involves initiation, validate when blur or input form changed, validate all data.

Javascript
```javascript
import FormValidate from "form-validate-vue"
new Vue({
    mixins: [ FormValidate.single ],
    created: function () {
      this.svfInit(this.form, this, () => {
            return {
              lang: "en-US",
              conf: {
                name: {
                  text: "Name",
                  nodeName: "input",
                  rules: ["required"]
                },
                email: {
                  text: "Email",
                  nodeName: "input",
                  rules: ["email"]
                },
                source: {
                  nameName: "select",
                  text: "Source",
                  rules: ["required"]
                },
                gender: {
                  nameName: "select",
                  text: "Gender",
                  rules: [
                    {
                      required: 0
                    }
                  ]
                }
              }
            };
          });
    }
})
```

HTML
```html
<input type="text"  v-on:change="svfOnTextFieldBlur('Source', data.form.Source)" />
<div>{{ svfGetValidateMsg('Source') }}</div>
```

Validate all data
```javascript
this.svfValidate(form)
```

Initiation configuration:

lang: the language it shown when it has error. it only support "zh-CN" and "en-US"

conf: each form validate configuration you config is here. 

text: the name that is shown in which error message

nodeName: the value is "select" or "input" represent the input or select form item.

rules: it is array, all of the validate rule in it.


Rules

Required: it represent that something is required and not be empty. You can config that using
```javascript
rules: ['required']
``` 
or 
```javascript
rules: [
  {
    required: 0,
  }
]
```

The latter number 0 means that the number 0 is judged that is empty and validate failture.

Email: check whether the value you input is a valid email format
```javascript
rules: ['email']
```


