<template>
    <doc-component
        :page="page"
        :hasPadding="true"
    >
    <script type="text/markdown">
    # 文本颜色 `<ui-textcolor>`
    
    <doc-component-status page="textcolor"></doc-component-status>

    [[[开始]]]

    定义文本的颜色，这是一个内联元素。

    #### 使用

    :::democode/html
    <ui-textcolor>This is ui-textcolor</ui-textcolor>
    :::

    [[[形态]]]

    #### 支持

    |类型|支持|默认|
    |-|-|-|
    |尺寸|不支持|-|
    |色彩|全部|`theme`|
    |状态|不支持|-|

    <a href="/guide/status.html">查看形态文档</a>

    #### 色彩

    :::preset/html
    statusColor
    ---
    uikey:textcolor
    :::

    [[[源码]]]

    <iframe src="/report/coverage/lib/components/textcolor/index.vue.html" name="codeFrame" frameborder="0" onload="this.height=codeFrame.document.body.scrollHeight"></iframe>
    </script>
    </doc-component>
</template>
 
<script>
import DocComponent                from 'Docs/common/DocComponent.vue';

export default {
    data : function () {

        return {
            page : 'textcolor'
        };

    },
    components : {
        'doc-component' : DocComponent
    }
};
</script>

<style lang="less">
</style>
