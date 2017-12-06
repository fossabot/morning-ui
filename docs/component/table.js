webpackJsonp([38],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(507);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
    el: '#root',
    render: function render(h) {
        return h(_index2.default);
    }
});

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_245e041f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(510);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(508)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_245e041f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/docs/pages/component/table/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-245e041f", Component.options)
  } else {
    hotAPI.reload("data-v-245e041f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 508:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 509:
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
            page: 'table'
        };
    },
    created: function created() {

        /* eslint-disable no-magic-number */
        window.list = [{
            name: 'Tim Boelaars',
            age: 20,
            gender: 'male',
            job: 'driver'
        }, {
            name: 'Andrew Colin Beck',
            age: 41,
            gender: 'female',
            job: 'engineer'
        }, {
            name: 'Gustavo Zambelli',
            age: 23,
            gender: 'male',
            job: 'teacher'
        }, {
            name: 'Victor Erixon',
            age: 15,
            gender: 'female',
            job: 'doctors'
        }, {
            name: 'Shaun Moynihan',
            age: 27,
            gender: 'female',
            job: 'driver'
        }, {
            name: 'Emir Ayouni',
            age: 21,
            gender: 'male',
            job: 'gardener'
        }];

        window.biglist = [{
            name: 'Tim Boelaars',
            age: 20,
            gender: 'male',
            job: 'driver',
            country: 'England',
            height: 187,
            weight: 160
        }, {
            name: 'Andrew Colin Beck',
            age: 41,
            gender: 'female',
            job: 'engineer',
            country: 'United States',
            height: 165,
            weight: 116
        }, {
            name: 'Gustavo Zambelli',
            age: 23,
            gender: 'male',
            job: 'teacher',
            country: 'Thailand',
            height: 178,
            weight: 132
        }, {
            name: 'Victor Erixon',
            age: 15,
            gender: 'female',
            job: 'doctors',
            country: 'United States',
            height: 159,
            weight: 100
        }, {
            name: 'Shaun Moynihan',
            age: 27,
            gender: 'female',
            job: 'driver',
            country: 'England',
            height: 163,
            weight: 116
        }, {
            name: 'Emir Ayouni',
            age: 21,
            gender: 'male',
            job: 'gardener',
            country: 'United States',
            height: 173,
            weight: 122
        }];
        /* eslint-enable no-magic-number */
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ 510:
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
  }, [_vm._v("\n# 表格 `<ui-table>`\n\n<doc-component-status page=\"table\"></doc-component-status>\n\n[[[开始]]]\n\n定义一个表格，这是一个块级元素。\n\n#### 使用\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', age : 20, gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female', job : 'engineer'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', age : 15, gender : 'female', job : 'doctors'},\n            {name : 'Shaun Moynihan', age : 27, gender : 'female', job : 'driver'},\n            {name : 'Emir Ayouni', age : 21, gender : 'male', job : 'gardener'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n#### 单列控制\n\n`ui-table`通过`col-set`配置，可以设置单列的：\n\n- 宽度\n- 最小宽度\n- 最大宽度\n- 样式\n- 禁用状态\n- 对齐方式\n- 是否是标题列(标题列将被聚合在一起)\n\n更多单列控制见`col-set`配置。\n\n下面是一个简单的示例：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', title : true},\n            {col : 'age', name : 'Age', minwidth : '150px'},\n            {col : 'gender', name : 'Gender', disabled : true},\n            {col : 'job', name : 'Job', align : 'right', style : 'success'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n#### 单行控制\n\n`ui-table`通过`row-set`配置，可以设置行的：\n\n- 样式\n- 禁用状态\n- 对齐方式\n\n更多单元格控制见`row-set`配置。\n\n下面是一个简单的示例：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ],\n        rowset : [\n            {row : 1, align : 'left'},\n            {row : 2, style : 'warning'},\n            {row : 4, disabled : true}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :row-set=\"rowset\" :show-col-name=\"true\"></ui-table>\n:::\n\n#### 单元格控制\n\n`ui-table`通过`cell-set`配置，可以设置单元格的：\n\n- 样式\n- 禁用状态\n- 对齐方式\n\n更多单元格控制见`cell-set`配置。\n\n下面是一个简单的示例：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ],\n        cellset : [\n            {row : 0, col : 'age', style : 'success'},\n            {row : 2, col : 'gender', disabled : true},\n            {row : 3, col : 'job', style : 'danger'},\n            {row : 4, col : 'job', align : 'left'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :cell-set=\"cellset\" :show-col-name=\"true\"></ui-table>\n:::\n\n#### 内嵌HTML\n\n表格数据列表支持传入HTML内容，在渲染这些HTML也会被渲染：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', age : 20, gender : 'male', action : '<a href=\"#\">发送</a>'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female', action : '<a href=\"#\">发送</a>'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', action : '<a href=\"#\">发送</a>'},\n            {name : 'Victor Erixon', age : 15, gender : 'female', action : '<a href=\"#\">发送</a>'},\n            {name : 'Shaun Moynihan', age : 27, gender : 'female', action : '<a href=\"#\">发送</a>'},\n            {name : 'Emir Ayouni', age : 21, gender : 'male', action : '<a href=\"#\">发送</a>'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n#### 内嵌Vue组件\n\n表格数据列表的内容会通过Vue渲染，所以你可以使用Vue组件。\n\n:::vue/html\nwindow.demoVue = new Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', age : 20, gender : 'male', action : '<ui-btn color=\"success\" size=\"xs\">发送</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female', action : '<ui-btn color=\"success\" size=\"xs\">发送</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', action : '<ui-btn color=\"success\" size=\"xs\">发送</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n但需要注意的是由于在`list`中使用的组件是动态生成的，所以在组件中无法使用父辈Vue实例上的`props`、`data`、`methods`等属性或方法。\n\n`props`、`data`的处理可以将`list`设为计算属性来实现数据绑定：\n\n:::vue/html\nwindow.demoVue2 = new Vue({\n    el : '{$el}',\n    template : '{$template}',\n    computed : {\n        list : function () {\n            return [\n                {name : 'Tim Boelaars', age : 20, gender : 'male', action : `<ui-btn color=\"success\" size=\"xs\">${this.btntext}</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>`},\n                {name : 'Andrew Colin Beck', age : 41, gender : 'female', action : `<ui-btn color=\"success\" size=\"xs\">${this.btntext}</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>`},\n                {name : 'Gustavo Zambelli', age : 23, gender : 'male', action : `<ui-btn color=\"success\" size=\"xs\">${this.btntext}</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>`}\n            ];\n        }\n    },\n    data : {\n        btntext : '发送'\n    }\n});\n---\n<div>\n    <ui-table ref=\"demoPropsData\" :list=\"list\"></ui-table>\n    <ui-link js=\"window.demoVue2.btntext = '发送至邮箱'\">修改btntext</ui-link>\n</div>\n:::\n\n`methods`可以通过全局方法来代理，比如在下面的例子中第一个发送是无法直接调用`this.send`，会报错。而第二个发送通过全局的`window.sendProxy`来进行转发，从而调用父辈Vue实例的方法：\n\n:::vue/html\nwindow.demoVue = new Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', age : 20, gender : 'male', action : '<ui-btn color=\"success\" size=\"xs\" @emit=\"send(0);\">第一个发送</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female', action : '<ui-btn color=\"success\" size=\"xs\" @emit=\"window.sendProxy(1);\">第二个发送</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', action : '<ui-btn color=\"success\" size=\"xs\">发送</ui-btn> <ui-link color=\"minor\" size=\"xs\">详情</ui-link>'}\n        ]\n    },\n    methods : {\n        send : function (id) {\n            alert(`${this.list[id].name}发送成功!`);\n        }\n    }\n});\n\nwindow.sendProxy = id => window.demoVue.send(id);\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n#### 无数据\n\n当表格无数据时：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : []\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n如果设置了表头，表头仍然会显示：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [],\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" export-csv title=\"无数据演示\"></ui-table>\n:::\n\n[[[形态]]]\n\n#### 支持\n\n|类型|支持|默认|\n|-|-|-|\n|尺寸|不支持|-|\n|色彩|全部|`light-gray`|\n|状态|不支持|-|\n\n<a href=\"/guide/status.html\">查看形态文档</a>\n\n#### 色彩\n\n:::repeat/html\ncolor:theme\ncolor:feature\ncolor:black\ncolor:blue\ncolor:silver\ncolor:gray\n---\n<p>{$colorName}</p>\n<ui-table :list=\"window.list\" color=\"{$colorKey}\"></ui-table>\n<br>\n:::\n\n[[[配置]]]\n\n|KEY|描述|接受值|值类型|默认值|\n|-|-|-|-|-|\n|list|表格数据，这是一个数组，数组中每个对象是一行。对象的每个键是一列，键名是列的KEY，键值是列的数值。<br><br>表格的列是对象中所有键的合集，若某项缺少键，对应的单元格内会显示为`empty-cell`的内容。|数组|Array|`[]`|\n|empty-cell-value|如果某个单元格的内容是`undefined`，则设置的默认值|字符串|String|`'-'`|\n|title|表格的标题|标题字符串|String|`undefined`|\n|zebra-pattern|表格斑马线样式|`true`<br>`false`|Boolean|`true`|\n|vertical-border|显示表格内的竖直边框|`true`<br>`false`|Boolean|`true`|\n|horizontal-border|显示表格内的横向边框|`true`<br>`false`|Boolean|`true`|\n|align|列的对齐方式，这是单个表格的全局设置，可以使用`col-set`来单独设置某一列的对齐方式|`'left'`: 左对齐<br>`'center'`: 居中对齐<br>`'right'`: 右对齐|String|`'center'`|\n|show-col-name|在标题行显示列的名称，需要先在`col-set`中设置每列的名称|`true`<br>`false`|Boolean|`false`|\n|fixed-title-col|标题列的位置，可以设置左侧或右侧。对于列数较多的表格，可以使用固定标题列。|`'left'`: 位于左侧，不固定<br>`'right'`: 位于右侧，不固定<br>`'left-fixed'`: 位于左侧，固定<br>`'right-fixed'`: 位于右侧，固定|String|`'left'`|\n|col-set|列设置可以用来控制单独的一列，具体配置方法见下面的[col-set](#col-set)章节|数组|Array|`[]`|\n|row-set|单行设置可以用来控制一行，具体配置方法见下面的[row-set](#row-set)章节|数组|Array|`[]`|\n|cell-set|单元格设置可以用来控制单个单元格，具体配置方法见下面的[cell-set](#cell-set)章节|数组|Array|`[]`|\n|export-csv|开启将表格导出csv文件的功能|`true`<br>`false`|Boolean|`false`|\n|csv-name|导出csv文件的名称|文件名称(不需要加尾缀)|String|`undefined`|\n|multi-sort|支持多列排序，默认只支持单列排序。多列排序时会根据所选排序列的顺序进行多次排序。使用此配置前需要先通过`col-set`的指定排序列|`true`<br>`false`|Boolean|`false`|\n\n#### list\n\n用于设置表格的数据，`list`数组内每一个对象是一行，对象的每个键是一列：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', age : 20, gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female', job : 'engineer'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', age : 15, gender : 'female', job : 'doctors'},\n            {name : 'Shaun Moynihan', age : 27, gender : 'female', job : 'driver'},\n            {name : 'Emir Ayouni', age : 21, gender : 'male', job : 'gardener'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n表格的列是`list`中所有对象键的合集，若`list`中对象的键是不完全：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', job : 'doctors'},\n            {name : 'Shaun Moynihan'},\n            {}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n#### empty-cell-value\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', job : 'doctors'},\n            {name : 'Shaun Moynihan'},\n            {}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" empty-cell-value=\"空\"></ui-table>\n:::\n\n#### title\n\n:::democode/html\n<ui-table :list=\"list\" title=\"这里是表格标题\"></ui-table>\n:::\n\n#### zebra-pattern\n\n关闭斑马线样式：\n\n:::democode/html\n<ui-table :list=\"list\" :zebra-pattern=\"false\"></ui-table>\n:::\n\n#### vertical-border\n\n隐藏表格内竖直边框：\n\n:::democode/html\n<ui-table :list=\"list\" :vertical-border=\"false\"></ui-table>\n:::\n\n#### horizontal-border\n\n隐藏表格内横向边框：\n\n:::democode/html\n<ui-table :list=\"list\" :horizontal-border=\"false\"></ui-table>\n:::\n\n隐藏表格内所有边框：\n\n:::democode/html\n<ui-table :list=\"list\" :vertical-border=\"false\" :horizontal-border=\"false\"></ui-table>\n:::\n\n#### align\n\n列内容右对齐：\n\n:::democode/html\n<ui-table :list=\"list\" align=\"right\"></ui-table>\n:::\n\n列内容左对齐：\n\n:::democode/html\n<ui-table :list=\"list\" align=\"left\"></ui-table>\n:::\n\n#### fixed-title-col\n\n此配置需要先在`col-set`中设置标题列。\n\n将标题列放到右侧：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', title : true},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender', title : true},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" fixed-title-col=\"right\"></ui-table>\n:::\n\n将标题列固定在左侧：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.biglist,\n        colset : [\n            {col : 'name', name : 'Name', title : true, minwidth : '120px'},\n            {col : 'age', name : 'Age', minwidth : '300px'},\n            {col : 'gender', name : 'Gender', title : true, minwidth : '80px'},\n            {col : 'job', name : 'Job', minwidth : '300px'},\n            {col : 'country', name : 'Country', minwidth : '300px'},\n            {col : 'height', name : 'Height', minwidth : '300px'},\n            {col : 'weight', name : 'Body weight', minwidth : '300px'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" fixed-title-col=\"left-fixed\"></ui-table>\n:::\n\n将标题列固定在右侧，且导出的表格的列顺序也一样：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.biglist,\n        colset : [\n            {col : 'name', name : 'Name', title : true, minwidth : '120px'},\n            {col : 'age', name : 'Age', minwidth : '300px'},\n            {col : 'gender', name : 'Gender', title : true, minwidth : '80px'},\n            {col : 'job', name : 'Job', minwidth : '300px'},\n            {col : 'country', name : 'Country', minwidth : '300px'},\n            {col : 'height', name : 'Height', minwidth : '300px'},\n            {col : 'weight', name : 'Body weight', minwidth : '300px'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" fixed-title-col=\"right-fixed\" export-csv></ui-table>\n:::\n\n#### col-set\n\n`col-set`用于列控制，是一个数组，数组的每项都是一个配置对象。\n\n配置对象包含下面这些属性，其中`col`用来定位需要设置列的位置。\n\n|KEY|描述|接受值|值类型|默认值|\n|-|-|-|-|-|\n|col|需要设置列的KEY|列的KEY(`list`配置中设置)|String|`undefined`|\n|name|列的名称，如果开启`show-col-name`配置，名称会显示在标题行|名称|String|`undefined`|\n|width|列的宽度，此配置会改变列在宽度分配时的权重，但不一定完全符合设置的宽度值，如果需要控制宽度的绝对值使用`minwidth`或`maxwidth`|宽度数值(必需包含单位`px`或`%`)|String|`undefined`|\n|minwidth|列的最小宽度|宽度数值(必需包含单位`px`或`%`)|String|`undefined`|\n|maxwidth|列的最小宽度|宽度数值(必需包含单位`px`或`%`)|String|`undefined`|\n|style|设置列的色彩样式|[形态/颜色](/guide/status.html#颜色)中所有的功能颜色值|String|`undefined`|\n|disabled|是否展示列的禁用样式|`true`<br>`false`|Boolean|`false`|\n|align|列的对齐方式|`'left'`<br>`'right'`<br>`'align'`|String|`'align'`|\n|title|此列是否是标题列，根据`fixed-title-col`的设置所有的标题列会被放到最左或最右|`true`<br>`false`|Boolean|`false`|\n|hide|在表格中隐藏列，用于某些在`list`存在但不需要在展示的数据。列隐藏后在导出`.csv`文件时仍然会存在，如在导出`.csv`文件时也要排除，使用`col-set`配置的`export`属性来控制|`true`<br>`false`|Boolean|`false`|\n|export|导出`.csv`文件时，是否包含此列，若设为`false`此列不会被导出。一般包含行动区域的列会将此配置设为`false`|`true`<br>`false`|Boolean|`true`|\n|sort|开启单列排序，必需启用`show-col-name`才有效。多列排序需要启用`multi-sort`配置|`true`<br>`false`|Boolean|`false`|\n\n注意：在设置`width`、`minwidth`、`maxwidth`为0时，需要加上单位，如：`0px`或`0%`。\n\n---\n\n##### name\n\n通过`name`及`show-col-name`设置标题行：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n标题行结合表头：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" title=\"表名\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n##### width、minwidth、maxwidth\n\n设置列的`width` 、 `minwidth` 、 `maxwidth`：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', maxwidth : '50px'},\n            {col : 'age', name : 'Age', width : '150px'},\n            {col : 'gender', name : 'Gender', minwidth : '150px'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n##### style\n\n设置指定列的样式（仅支持形态中的功能色彩）：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age', style : 'primary'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n##### disabled\n\n将单元格设置为禁用样式：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age', disabled : true},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n##### align\n\n使用`align`来单独设置某一列的对齐方式：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', align : 'right'},\n            {col : 'age', name : 'Age', align : 'left'},\n            {col : 'gender', name : 'Gender', align : 'center'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n##### title\n\n使用`title`来置标题列，标题列会被放置在最左或最右（通过`fixed-title-col`设置）：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', title : true},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender', title : true},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n使用`title`设置标题列之后，导出的`csv`的列顺序也会保持一致：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', title : true},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender', title : true},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" export-csv></ui-table>\n:::\n\n使用`title`设置标题列之后，若未开启`show-col-name`，导出的`csv`不会包含标题行：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', title : true},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender', title : true},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" export-csv></ui-table>\n:::\n\n##### hide\n\n在表格中隐藏`Job`和`Gender`列，同时不导出`Gender`列：    \n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender', hide : true, export : false},\n            {col : 'job', name : 'Job', hide : true}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" export-csv></ui-table>\n:::\n\n##### export\n\n不导出`Gender`列：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender', export : false},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" export-csv></ui-table>\n:::\n\n##### sort\n\n通过`sort`字段可以开启单列排序(多列排序需要开启`multi-sort`配置)，并且导出的`csv`也是排序之后的顺序：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', sort : true},\n            {col : 'age', name : 'Age', sort : true},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" export-csv></ui-table>\n:::\n\n标题列也可以使用`sort`：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', sort : true, title : true},\n            {col : 'age', name : 'Age', sort : true},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" export-csv></ui-table>\n:::\n\n#### row-set\n\n`row-set`用于行控制，是一个数组，数组的每项都是一个配置对象，用来设置单行。\n\n配置对象包含下面这些属性，其中`row`用来定位需要设置行的位置。\n\n|KEY|描述|接受值|值类型|默认值|\n|-|-|-|-|-|\n|row|需要设置的行数(从0开始，0表示标题行)|行数|Number|`undefined`|\n|style|设置行的色彩样式|[形态/颜色](/guide/status.html#颜色)中所有的功能颜色值|String|`undefined`|\n|disabled|是否展示行的禁用样式|`true`<br>`false`|Boolean|`false`|\n|align|行的对齐方式|`'left'`<br>`'right'`<br>`'align'`|String|`'align'`|\n\n注意：在设置`width`、`minwidth`、`maxwidth`为0时，需要加上单位，如：`0px`或`0%`。\n\n---\n\n##### style\n\n设置指定行的样式（仅支持形态中的功能色彩）：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ],\n        rowset : [\n            {row : 0, style : 'success'},\n            {row : 2, style : 'warning'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :row-set=\"rowset\" :show-col-name=\"true\"></ui-table>\n:::\n\n##### disabled\n\n将单行设置为禁用样式：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        rowset : [\n            {row : 1, disabled : true}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :row-set=\"rowset\" export-csv></ui-table>\n:::\n\n##### align\n\n使用`align`来设置单行的对齐方式：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ],\n        rowset : [\n            {row : 0, align : 'left'},\n            {row : 1, align : 'right'},\n            {row : 2, align : 'center'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :row-set=\"rowset\" :show-col-name=\"true\"></ui-table>\n:::\n\n#### cell-set\n\n`cell-set`用于单元格控制，是一个数组，数组的每项都是一个配置对象，用来设置单个单元格。\n\n配置对象包含下面这些属性，其中`row`和`col`用来定位需要设置单元格的位置。\n\n|KEY|描述|接受值|值类型|默认值|\n|-|-|-|-|-|\n|row|需要设置单元格的行数(从0开始，0表示标题行)|行数|Number|`undefined`|\n|col|需要设置单元格所在列的KEY|列的KEY(`list`配置中设置)|String|`undefined`|\n|style|设置单元格的色彩样式|[形态/颜色](/guide/status.html#颜色)中所有的功能颜色值|String|`undefined`|\n|disabled|是否展示单元格的禁用样式|`true`<br>`false`|Boolean|`false`|\n|align|单元格的对齐方式|`'left'`<br>`'right'`<br>`'align'`|String|`'align'`|\n\n注意：在设置`width`、`minwidth`、`maxwidth`为0时，需要加上单位，如：`0px`或`0%`。\n\n---\n\n##### style\n\n设置指定单元格的样式（仅支持形态中的功能色彩）：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ],\n        cellset : [\n            {row : 0, col : 'age', style : 'success'},\n            {row : 2, col : 'age', style : 'warning'},\n            {row : 3, col : 'job', style : 'danger'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :cell-set=\"cellset\" :show-col-name=\"true\"></ui-table>\n:::\n\n##### disabled\n\n将单元格设置为禁用样式：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        cellset : [\n            {row : 1, col : 'age', disabled : true}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :cell-set=\"cellset\" export-csv></ui-table>\n:::\n\n##### align\n\n使用`align`来单独设置单元格的对齐方式：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name'},\n            {col : 'age', name : 'Age'},\n            {col : 'gender', name : 'Gender'},\n            {col : 'job', name : 'Job'}\n        ],\n        cellset : [\n            {row : 0, col : 'age', align : 'left'},\n            {row : 1, col : 'age', align : 'right'},\n            {row : 2, col : 'age', align : 'center'},\n            {row : 3, col : 'age', align : 'left'},\n            {row : 4, col : 'age', align : 'right'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :cell-set=\"cellset\" :show-col-name=\"true\"></ui-table>\n:::\n\n#### export-csv\n\n:::democode/html\n<ui-table :list=\"list\" export-csv></ui-table>\n:::\n\n#### csv-name\n\n:::democode/html\n<ui-table :list=\"list\" export-csv csv-name=\"demo\"></ui-table>\n:::\n\n#### multi-sort\n\n使用`multi-sort`后设置多个排序列，当多个列进行排序时会按照先后顺序对表格进行多次排序：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : [\n            {col : 'name', name : 'Name', sort : true},\n            {col : 'age', name : 'Age', sort : true},\n            {col : 'gender', name : 'Gender', sort : true},\n            {col : 'job', name : 'Job'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" show-col-name multi-sort export-csv></ui-table>\n:::\n\n[[[方法]]]\n\n无\n\n[[[事件]]]\n\n#### list-change\n\n当表格数据变化后触发。\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list\n    },\n    methods : {\n        echo : function () {\n            console.log('demo2.console1', `list-change event!`);\n        }\n    }\n});\n---\n<div>\n    <ui-table ref=\"demo2\" :list=\"list\" @list-change=\"echo\"></ui-table>\n    <br><br>\n    <ui-link js=\"morning.findVM('demo2').conf.list = window.biglist;\">重新设置表格数据</ui-link>\n</div>\n:::\n\n#### 生命周期事件\n\n:::vue/html\nwindow.demoEventLifecycle = new Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : function () {\n        return {\n           list : window.list,\n           text : '表格',\n           show : true\n        };\n    },\n    methods : {\n        echo : function (name) {\n            console.log('demoEventLifecycle.console1', `${name} event!`);\n        }\n    }\n});\n---\n<div>\n    <ui-table\n        ref=\"demoEventLifecycle\"\n        v-show=\"show\"\n        :list=\"list\"\n        @created=\"echo('created')\"\n        @mounted=\"echo('mounted')\"\n        @before-update=\"echo('before-update')\"\n        @updated=\"echo('updated')\"\n        @before-destroy=\"echo('before-destroy')\"\n        @destroyed=\"echo('destroyed')\"\n    >\n    {*text*}\n    </ui-table>\n\n    <br><br>\n\n    <ui-link js=\"window.demoEventLifecycle.text='生命周期事件';\">触发update</ui-link>\n    <ui-link js=\"morning.findVM('demoEventLifecycle').$destroy();\">触发destroy</ui-link>\n</div>\n:::\n\n[[[源码]]]\n\n<iframe src=\"/report/coverage/lib/components/table/index.vue.html\" name=\"codeFrame\" frameborder=\"0\" onload=\"this.height=codeFrame.document.body.scrollHeight\"></iframe>\n\n")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-245e041f", esExports)
  }
}

/***/ })

},[506]);