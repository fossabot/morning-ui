webpackJsonp([47],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(552);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
    el: '#root',
    render: function render(h) {
        return h(_index2.default);
    }
});

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_13d25d3f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(555);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(553)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_13d25d3f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/docs/pages/component/pagination/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13d25d3f", Component.options)
  } else {
    hotAPI.reload("data-v-13d25d3f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 553:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DocComponent = __webpack_require__(2);

var _DocComponent2 = _interopRequireDefault(_DocComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {

        return {
            page: 'pagination'
        };
    },
    components: {
        'doc-component': _DocComponent2.default
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('doc-component', {
    attrs: {
      "page": _vm.page,
      "hasPadding": true
    }
  }, [_c('script', {
    attrs: {
      "type": "text/markdown"
    }
  }, [_vm._v("\n# 分页 `<ui-pagination>`\n\n<doc-component-status page=\"pagination\"></doc-component-status>\n\n[[[开始]]]\n\n定义分页，这是一个内联块标签。\n\n分页组件有两种用法，后面示例中会演示：\n\n- 关联列表：必须配置`list`，会自动计算总页码。页码切换时，会根据页面从`list`中获取项目渲染内容。\n- 单独使用：必须配置`total`。页码切换时，会触发事件，页面内容由外部逻辑控制。\n\n#### 使用\n\n:::democode/html\n<ui-pagination :total=\"10\"></ui-pagination>\n:::\n\n#### 自动计算总页码\n\n当配置`list`时组件会根据`page-size`自动计算总页码。\n\n:::democode/html\n<ui-pagination :list=\"[1,2,3,4,5,6,7,8]\" :page-size=\"3\"></ui-pagination>\n:::\n\n#### 关联列表使用\n\n关联列表时，把内容模板放到`ui-pagination`标签内，当页码切换时，会根据页面选取`list`中指定的项目作为上下文渲染内容。\n\n这里用到了Vue.js的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽)。\n\n通过`slot-scope`解构可以在内容模板中获取到的变量：\n\n- `page` : 当前页码(从1开始)\n- `items` : 当前页的数据(数组，`list`中的区间)\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim', age : 15},\n            {name : 'Andrew', age : 20},\n            {name : 'Gustavo', age : 17},\n            {name : 'Victor', age : 11},\n            {name : 'Shaun', age : 30},\n            {name : 'Emir', age : 24},\n            {name : 'Katherine', age : 18},\n            {name : 'Jax', age : 10}\n        ]\n    }\n});\n---\n<ui-pagination :list=\"list\" :page-size=\"3\">\n    <template slot-scope=\"{page, items}\">\n        <h5>这是第{*page*}页，内容是：</h5>\n        <ul>\n            <li v-for=\"item in items\">Name : {*item.name*}, Age : {*item.age*}</li>\n        </ul>\n    </template>\n</ui-pagination>\n:::\n\n#### 单独使用\n\n单独使用时，通过监听分页的`emit`事件来获取页码变化，并在页码变化后通过修改`slot`来改变内容。\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim', age : 15},\n            {name : 'Andrew', age : 20},\n            {name : 'Gustavo', age : 17},\n            {name : 'Victor', age : 11},\n            {name : 'Shaun', age : 30},\n            {name : 'Emir', age : 24},\n            {name : 'Katherine', age : 18},\n            {name : 'Jax', age : 10}\n        ],\n        content : ''\n    },\n    methods : {\n        rerender : function () {\n\n            // 通过组件实例获取当前页码信息\n            let vm = window.morning.findVM('demo1');\n            let page = vm.getPage();\n            let list = this.list.slice((page-1)*3, page*3);\n            let content = '';\n            \n            // 生成内容\n            content = `<h5>这是第${page}页，内容是：</h5><ul>`;\n            \n            for (let item of list) {\n\n                content += `<li>Name : ${item.name}, Age : ${item.age}</li>`;\n\n            }\n            \n            content += `</ul>`;\n\n            this.content = content;\n\n        }\n    }\n});\n---\n<ui-pagination ref=\"demo1\" :total=\"3\" @emit=\"rerender\">\n    <div v-html=\"content\"></div>\n</ui-pagination>\n:::\n\n#### 页面跳转\n\n当总页数大于设置的显示页数，则默认启用页面跳转框。在右侧框中输入数字（非数字会被忽略，小数则向下取整），可快速跳转到该页面。\n\n当输入值大于总页数则显示最后一页，输入负值则倒序跳转。\n\n:::democode/html\n<ui-pagination :total='16'></ui-pagination>\n:::\n\n[[[形态]]]\n\n#### 支持\n\n|类型|支持|默认|\n|-|-|-|\n|尺寸|全部|`m`|\n|色彩|全部|`theme`|\n|状态|不支持|-|\n\n<a href=\"/guide/status.html\">查看形态文档</a>\n\n#### 尺寸\n\n:::repeat/html\nsize\n---\n<ui-pagination :total='10' size=\"{$sizeKey}\"></ui-pagination> &nbsp;&nbsp; <span>{$&sizeName}</span>\n<br>\n:::\n\n#### 色彩\n\n:::repeat/html\ncolor:theme\ncolor:feature\ncolor:black\ncolor:blue\ncolor:silver\ncolor:gray\n---\n<ui-pagination :total='10' color=\"{$colorKey}\"></ui-pagination> &nbsp;&nbsp; <span>{$&colorName}</span>\n<br>\n:::\n\n[[[配置]]]\n\n|KEY|描述|接受值|值类型|默认值|\n|-|-|-|-|-|\n|total|设置分页总页数，当设置list时，会根据`page-size`和`list`的长度自动计算total|总页数|Number|`1`|\n|list|需要分页的数据组，一个数组或对象|数据对象<br>数据数组|Object<br>Array|`undefined`|\n|page-size|每页多少条记录，只有设置`list`时才有效|每页记录数量|Number|`10`|\n|page|默认在第几页|页码|Number|`1`|\n|max-show|分页栏最多显示几页，超过的页码会隐藏|页码数，一般为奇数|Number|`9`|\n|jump-page|是否允许输入页码跳转|`true`<br>`false`|Boolean|`true`|\n\n#### total\n\n:::democode/html\n<ui-pagination :total=\"10\"></ui-pagination>\n:::\n\n#### list\n\n当配置`list`时组件会根据`page-size`自动计算总页码。\n\n:::democode/html\n<ui-pagination :list=\"[1,2,3,4,5,6,7,8]\" :page-size='3'></ui-pagination>\n:::\n\n#### page-size\n\n:::democode/html\n<ui-pagination :list=\"[1,2,3,4,5,6,7,8]\" :page-size='5'></ui-pagination>\n:::\n\n#### page\n\n:::democode/html\n<ui-pagination :total=\"10\" :page=\"4\"></ui-pagination>\n:::\n\n#### max-show\n\n:::democode/html\n<ui-pagination :total=\"10\" :page=\"4\" :max-show=\"3\"></ui-pagination>\n:::\n\n#### jump-page\n\n可以关闭通过页码跳转页面。\n\n:::democode/html\n<ui-pagination :total=\"10\" :max-show=\"5\" :jump-page=\"false\"></ui-pagination>\n:::\n\n[[[方法]]]\n\n#### getPage()\n\n获取当前页码。\n\n:::democode/html\n<ui-pagination ref=\"demo2\" :total=\"10\"></ui-pagination>\n<br><br> \n<ui-link js=\"alert(morning.findVM('demo2').getPage());\">获取当前页码</ui-link>\n:::\n\n#### to(num)\n\n跳转到指定页码。\n\n|KEY|可选|描述|接受值|值类型|默认值|\n|-|-|-|-|-|-|\n|num|NO|需要跳转的页码|大于最大页数：跳转到最后一页<br>小于0：跳转到从最后开始往前`num`页<br>等于0：跳转到第一页|`Number`|`undefined`|\n\n:::democode/html\n<ui-pagination ref=\"demo3\" :total=\"10\"></ui-pagination>\n<br><br> \n<ui-link js=\"morning.findVM('demo3').to(5);\">跳转到第5页</ui-link><br>\n<ui-link js=\"morning.findVM('demo3').to(20);\">跳转到大于最大页数</ui-link><br>\n<ui-link js=\"morning.findVM('demo3').to(-5);\">跳转到从后往前第5页</ui-link><br>\n<ui-link js=\"morning.findVM('demo3').to(1);\">跳转到第1页(输入1)</ui-link><br>\n<ui-link js=\"morning.findVM('demo3').to(0);\">跳转到第1页(输入0)</ui-link>\n:::\n\n#### next([offset])\n\n跳转到后几页。\n\n|KEY|可选|描述|接受值|值类型|默认值|\n|-|-|-|-|-|-|\n|offset|YES|需要往后跳转的页码数|页码数|`Number`|`1`|\n\n:::democode/html\n<ui-pagination ref=\"demo4\" :total=\"10\"></ui-pagination>\n<br><br> \n<ui-link js=\"morning.findVM('demo4').next();\">往后跳转1页</ui-link><br>\n<ui-link js=\"morning.findVM('demo4').next(3);\">往后跳转3页</ui-link>\n:::\n\n#### prev([offset])\n\n跳转到前几页。\n\n|KEY|可选|描述|接受值|值类型|默认值|\n|-|-|-|-|-|-|\n|offset|YES|需要往前跳转的页码数|页码数|`Number`|`1`|\n\n:::democode/html\n<ui-pagination ref=\"demo5\" :total=\"10\" :page=\"8\"></ui-pagination>\n<br><br> \n<ui-link js=\"morning.findVM('demo5').prev();\">往前跳转1页</ui-link><br>\n<ui-link js=\"morning.findVM('demo5').prev(3);\">往前跳转3页</ui-link>\n:::\n\n#### setTotal(num)\n\n重新设置总页数。如果设置了`list`此方法无效。\n\n如果新的页数小于当前所在的页码，则会跳到新页数的最后一页。\n\n|KEY|可选|描述|接受值|值类型|默认值|\n|-|-|-|-|-|-|\n|num|NO|总页码数|页码数|`Number`|`undefined`|\n\n:::democode/html\n<ui-pagination ref=\"demo6\" :total=\"2\"></ui-pagination>\n<br><br> \n<ui-link js=\"morning.findVM('demo6').setTotal(10);\">总页数设为10</ui-link><br>\n<ui-link js=\"morning.findVM('demo6').setTotal(3);\">总页数设为3</ui-link><br>\n:::\n\n[[[事件]]]\n\n#### emit\n\n当页码改变时时触发。\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    methods : {\n        echo : function () {\n            console.log('demo7.console1', 'emit event!');\n        }\n    }\n});\n---\n<div>\n    <p>切换页码触发emit事件</p>\n    <ui-pagination @emit=\"echo\" :total=\"10\"></ui-pagination>\n</div>\n:::\n\n#### 生命周期事件\n\n:::vue/html\nwindow.demoEventLifecycle = new Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : function () {\n        return {\n           text : '分页',\n           show : true\n        };\n    },\n    methods : {\n        echo : function (name) {\n            console.log('demoEventLifecycle.console1', name + ' event!');\n        }\n    }\n});\n---\n<div>\n    <ui-pagination\n        ref=\"demoEventLifecycle\"\n        v-show=\"show\"\n        :total=\"10\"\n        @created=\"echo('created')\"\n        @mounted=\"echo('mounted')\"\n        @before-update=\"echo('before-update')\"\n        @updated=\"echo('updated')\"\n        @before-destroy=\"echo('before-destroy')\"\n        @destroyed=\"echo('destroyed')\"\n    >{*text*}</ui-pagination>\n\n    <br><br>\n\n    <ui-link js=\"window.demoEventLifecycle.text='生命周期事件';\">触发update</ui-link>\n    <ui-link js=\"morning.findVM('demoEventLifecycle').$destroy();\">触发destroy</ui-link>\n</div>\n:::\n\n\n[[[源码]]]\n\n<iframe src=\"/report/coverage/lib/components/pagination/index.vue.html\" name=\"codeFrame\" frameborder=\"0\" onload=\"this.height=codeFrame.document.body.scrollHeight\"></iframe>\n\n")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-13d25d3f", esExports)
  }
}

/***/ })

},[551]);