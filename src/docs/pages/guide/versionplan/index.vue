<template>
    <doc-guide
        :page="page"
        :hasPadding="true" 
    >
    <script type="text/markdown">
    # 版本计划

    ### 版本规范

    Morning UI采用[语义化版本控制规范](http://semver.org/lang/zh-CN/)。

    同时采用以下三种标记标示不同的版本：
    
    |标记|名称|说明|更新<br>频率|生产环境|
    |-|-|-|-|-|
    |<ui-badge class="circle ver-stable" size="s" color="theme">Stable</ui-badge>|稳定版本|此版本中的各个功能都经过一段时间的测试及使用，非常稳定|month|推荐使用|
    |<ui-badge class="circle ver-beta" size="s" color="extra-light-black">Beta</ui-badge>|公开测试版本|包含了一些新的特性，并且修复了大部分问题的版本，相对较为稳定|week|可用<br>不推荐|
    |<ui-badge class="circle ver-canary" size="s">Canary</ui-badge>|金丝雀版本|包含大量新特性的版本，这个版本是实验性的，可能存在较多的问题<br><ui-small><ui-textcolor color="extra-light-blue">为开发者及早期用户设计的版本</ui-textcolor></ui-small>|~daily|请勿使用|

    版本发布情况请查看：[更新日志](/guide/logs.html)。
    
    ### ROAD MAP

    - `0.10.0` : <ui-badge size="xxs" color="success">DONE</ui-badge>Morning UI的首个版本
    - `0.11.0` : <ui-badge size="xxs" color="gray">PLAN</ui-badge>支持构建自定义的组件库
    - `0.12.0` : <ui-badge size="xxs" color="gray">PLAN</ui-badge>组件补全，当Morning UI同步完HMP UI的所有版本之后发布
    - `0.13.0` : <ui-badge size="xxs" color="gray">PLAN</ui-badge>完成所有组件的测试覆盖
    - `1.0.0` : <ui-badge size="xxs" color="gray">PLAN</ui-badge>完成所有HMP UI的组件，并稳定两个月后发布，计划2018年春季发布
    - `1.1.0` : <ui-badge size="xxs" color="gray">PLAN</ui-badge>完成所有组件的性能优化后发布此版本，计划2018年秋季发布

    </script>
    </doc-guide>
</template>
 
<script>
import DocGuide                    from 'Docs/common/DocGuide.vue';

export default {
    data : function () {

        return {
            page : 'versionplan'
        };

    },
    components : {
        'doc-guide' : DocGuide
    }
};
</script>

<style lang="less">
.ver-canary{
    background: #f5ab27 !important;
}
</style>
