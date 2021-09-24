import { defineComponent, h } from '@vue/runtime-core';
import Map from '../component/map';

export default defineComponent({
    render() {
        return h('Container', [h(Map)]);
    }
});