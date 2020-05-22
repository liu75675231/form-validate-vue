# form-validate-vue

A validate module for vue. It aims to give a convenient way to validate vue data. It use mixins to inject to vue instance.

Github: https://github.com/liu75675231/form-validate-vue

Live example: https://codesandbox.io/s/sad-neumann-4bxrg?file=/src/App.vue

If you have trouble using that plugin. please send a feecback email to liu75675231@126.com. Thanks

Usage

Init configuration:
Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3


Example
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

```html
<input type="text"  v-on:change="svfOnTextFieldBlur('Source', data.form.Source)" />
<div>{{ svfGetValidateMsg('Source') }}</div>
```

How to validate all data
```javascript
this.svfValidate(form)
```
