webpackJsonp([35],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(487);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
    el: '#root',
    render: function render(h) {
        return h(_index2.default);
    }
});

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_245e041f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(490);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(488)
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

/***/ 488:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 489:
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

module.exports = exports['default'];

/***/ }),

/***/ 490:
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
  }, [_vm._v("\n# 表格 `<ui-table>`\n\n<doc-component-status page=\"table\"></doc-component-status>\n\n[[[开始]]]\n\n定义一个表格，这是一个块级元素。\n\n#### 使用\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', age : 20, gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female', job : 'engineer'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', age : 15, gender : 'female', job : 'doctors'},\n            {name : 'Shaun Moynihan', age : 27, gender : 'female', job : 'driver'},\n            {name : 'Emir Ayouni', age : 21, gender : 'male', job : 'gardener'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n[[[声明]]]\n\n#### 支持\n\n|类型|支持|默认|\n|-|-|-|\n|尺寸|不支持|-|\n|色彩|全部|`light-gray`|\n|状态|不支持|-|\n\n#### 色彩\n\n:::repeat/html\ncolor:theme\ncolor:feature\ncolor:black\ncolor:blue\ncolor:silver\ncolor:gray\n---\n<p>{$colorName}</p>\n<ui-table :list=\"window.list\" {$colorKey}></ui-table>\n<br>\n:::\n\n[[[配置]]]\n\n|KEY|描述|接受值|值类型|默认值|\n|-|-|-|-|-|\n|list|表格数据，这是一个数组，数组中每个对象是一行。对象的每个键是一列，键名是列的KEY，键值是列的数值。<br><br>表格的列是对象中所有键的合集，若某项缺少键，对应的单元格内会显示为`empty-cell`的内容。|数组|Array|`[]`|\n|empty-cell-value|如果某个单元格的内容是`undefined`，则设置的默认值|字符串|String|`'-'`|\n|title|表格的标题|标题字符串|String|`undefined`|\n|zebra-pattern|表格斑马线样式|`true`<br>`false`|Boolean|`true`|\n|vertical-border|显示表格内的竖直边框|`true`<br>`false`|Boolean|`true`|\n|horizontal-border|显示表格内的横向边框|`true`<br>`false`|Boolean|`true`|\n|col-align|列的对齐方式，这是单个表格的全局设置，可以使用`col-set`来单独设置某一列的对齐方式|`'left'`: 左对齐<br>`'center'`: 居中对齐<br>`'right'`: 右对齐|String|`'center'`|\n|show-col-name|在标题行显示列的名称，需要先在`col-set`中设置每列的名称|`true`<br>`false`|Boolean|`false`|\n|fixed-title-col|标题列的位置，可以设置左侧或右侧。对于列数较多的表格，可以使用固定标题列。|`'left'`: 位于左侧，不固定<br>`'right'`: 位于右侧，不固定<br>`'left-fixed'`: 位于左侧，固定<br>`'right-fixed'`: 位于右侧，固定|String|`'left'`|\n|col-set|列设置，这是一个对象，对象的键名对应列的KEY，对象的键值是一个配置对象，用来设置列。<br><br>配置对象包含：<br>`name`: 列的名称(String)，如果开启`show-col-name`会显示在标题行<br>`width`: 列的宽度(`px` / `%`)，宽度数组会改变列在宽度分配时的权重，但不一定完全符合设置的宽度值，如果需要控制宽度的绝对值使用`minwidth`或`maxwidth`<br>`minwidth`: 列的最小宽度(`px` / `%`)<br>`maxwidth`: 列的最大宽度(`px` / `%`)<br>`align`: 此列的对齐方式，支持三种：`left`、`center`、`right`，默认使用`col-align`的设置<br>`title`: 此列是否是标题列(Boolean)，根据`fixed-title-col`的设置所有的标题列会被放到最左或最右<br><br>注意：在设置`width`、`minwidth`、`maxwidth`为0时，需要加上单位，如：`0px`或`0%`。|数组|Array|`[]`|\n|export-csv|开启将表格导出csv文件的功能|`true`<br>`false`|Boolean|`false`|\n|export-csv-name|导出csv文件的名称|文件名称(不需要加尾缀)|String|`undefined`|\n\n#### list\n\n用于设置表格的数据，`list`数组内每一个对象是一行，对象的每个键是一列：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', age : 20, gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female', job : 'engineer'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', age : 15, gender : 'female', job : 'doctors'},\n            {name : 'Shaun Moynihan', age : 27, gender : 'female', job : 'driver'},\n            {name : 'Emir Ayouni', age : 21, gender : 'male', job : 'gardener'}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n表格的列是`list`中所有对象键的合集，若`list`中对象的键是不完全：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', job : 'doctors'},\n            {name : 'Shaun Moynihan'},\n            {}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\"></ui-table>\n:::\n\n#### empty-cell-value\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : [\n            {name : 'Tim Boelaars', gender : 'male', job : 'driver'},\n            {name : 'Andrew Colin Beck', age : 41, gender : 'female'},\n            {name : 'Gustavo Zambelli', age : 23, gender : 'male', job : 'teacher'},\n            {name : 'Victor Erixon', job : 'doctors'},\n            {name : 'Shaun Moynihan'},\n            {}\n        ]\n    }\n});\n---\n<ui-table :list=\"list\" empty-cell-value=\"空\"></ui-table>\n:::\n\n#### title\n\n:::democode/html\n<ui-table :list=\"list\" title=\"这里是表格标题\"></ui-table>\n:::\n\n#### zebra-pattern\n\n关闭斑马线样式：\n\n:::democode/html\n<ui-table :list=\"list\" :zebra-pattern=\"false\"></ui-table>\n:::\n\n#### vertical-border\n\n隐藏表格内竖直边框：\n\n:::democode/html\n<ui-table :list=\"list\" :vertical-border=\"false\"></ui-table>\n:::\n\n#### horizontal-border\n\n隐藏表格内横向边框：\n\n:::democode/html\n<ui-table :list=\"list\" :horizontal-border=\"false\"></ui-table>\n:::\n\n隐藏表格内所有边框：\n\n:::democode/html\n<ui-table :list=\"list\" :vertical-border=\"false\" :horizontal-border=\"false\"></ui-table>\n:::\n\n#### col-align\n\n列内容右对齐：\n\n:::democode/html\n<ui-table :list=\"list\" col-align=\"right\"></ui-table>\n:::\n\n列内容左对齐：\n\n:::democode/html\n<ui-table :list=\"list\" col-align=\"left\"></ui-table>\n:::\n\n#### fixed-title-col\n\n此配置需要先在`col-set`中设置标题列。\n\n将标题列放到右侧：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name', title : true},\n            age : {name : 'Age'},\n            gender : {name : 'Gender', title : true},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" fixed-title-col=\"right\"></ui-table>\n:::\n\n将标题列固定在左侧：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.biglist,\n        colset : {\n            name : {name : 'Name', title : true},\n            age : {name : 'Age'},\n            gender : {name : 'Gender', title : true},\n            job : {name : 'Job'},\n            country : {name : 'Country'},\n            height : {name : 'Height'},\n            weight : {name : 'Body weight'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" fixed-title-col=\"left-fixed\"></ui-table>\n:::\n\n#### col-set\n\n通过`name`及`show-col-name`设置标题行：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name'},\n            age : {name : 'Age'},\n            gender : {name : 'Gender'},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n设置列的`width` 、 `minwidth` 、 `maxwidth`：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name', maxwidth : '50px'},\n            age : {name : 'Age', width : '150px'},\n            gender : {name : 'Gender', minwidth : '150px'},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n标题行结合表头：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name'},\n            age : {name : 'Age'},\n            gender : {name : 'Gender'},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" title=\"表名\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n使用`align`来单独设置某一列的对齐方式：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name', align : 'right'},\n            age : {name : 'Age', align : 'left'},\n            gender : {name : 'Gender', align : 'center'},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n使用`title`来置标题列，标题列会被放置在最左或最右（通过`fixed-title-col`设置）：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name', title : true},\n            age : {name : 'Age'},\n            gender : {name : 'Gender', title : true},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\"></ui-table>\n:::\n\n使用`title`设置标题列之后，导出的`csv`的列顺序也会保持一致：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name', title : true},\n            age : {name : 'Age'},\n            gender : {name : 'Gender', title : true},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" :show-col-name=\"true\" export-csv></ui-table>\n:::\n\n使用`title`设置标题列之后，若未开启`show-col-name`，导出的`csv`不会包含标题行：\n\n:::vue/html\nnew Vue({\n    el : '{$el}',\n    template : '{$template}',\n    data : {\n        list : window.list,\n        colset : {\n            name : {name : 'Name', title : true},\n            age : {name : 'Age'},\n            gender : {name : 'Gender', title : true},\n            job : {name : 'Job'}\n        }\n    }\n});\n---\n<ui-table :list=\"list\" :col-set=\"colset\" export-csv></ui-table>\n:::\n\n\n#### export-csv\n\n:::democode/html\n<ui-table :list=\"list\" export-csv></ui-table>\n:::\n\n#### export-csv-name\n\n:::democode/html\n<ui-table :list=\"list\" export-csv export-csv-name=\"demo\"></ui-table>\n:::\n\n[[[源码]]]\n\n<iframe src=\"/report/coverage/lib/components/table/index.vue.html\" name=\"codeFrame\" frameborder=\"0\" onload=\"this.height=codeFrame.document.body.scrollHeight\"></iframe>\n\n")])])
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

},[486]);