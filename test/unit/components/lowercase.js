import test                         from 'ava';
import snapshot                     from '../../helpers/snapshot';
import Vue                          from 'vue/dist/vue.common.js';
import lowercase                    from '../../../src/lib/components/lowercase/index.vue';

const name = 'lowercase';

test('base : component snapshot', async t => {

    const vm = new Vue(lowercase).$mount();

    t.plan(1);
    
    snapshot(t, vm);

});

test('base : init component', async t => {

    const vm = new Vue(lowercase).$mount();

    t.plan(2);

    t.is(vm.uiid, 2);
    t.is(lowercase.options.name, name);

});

test('base : component tag name is t-*', async t => {

    const vm = new Vue(lowercase).$mount();

    t.plan(1);

    t.is(vm.$el.tagName, `i-${name}`.toUpperCase());

});