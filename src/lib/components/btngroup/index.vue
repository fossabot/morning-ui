<template>
    <mor-btngroup
        :_uiid="uiid"
        :class="[]"
    >
        <slot></slot>
    </mor-btngroup>
</template>
 
<script>
export default {
    origin : 'UI',
    name : 'btngroup'
};
</script>

<style lang="less" src="./index.less"></style>
