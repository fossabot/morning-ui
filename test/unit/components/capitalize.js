import test                         from 'ava';
import snapshot                     from '../../helpers/snapshot';
import Vue                          from 'vue/dist/vue.common.js';
import capitalize                   from '../../../src/lib/components/capitalize/index.vue';

const name = 'capitalize';
const component = window.morning._origin.UI.extend(capitalize);

test('base : component snapshot', async t => {

    const vm = new Vue(component).$mount();

    t.plan(1);
    
    snapshot(t, vm);

});

test('base : init component', async t => {

    const vm = new Vue(component).$mount();

    t.plan(2);

    t.is(vm.uiid, 2);
    t.is(component.options.name, name);

});

test('base : component tag name is t-*', async t => {

    const vm = new Vue(component).$mount();

    t.plan(1);

    t.is(vm.$el.tagName, `mor-${name}`.toUpperCase());

});
