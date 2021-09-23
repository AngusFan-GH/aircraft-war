// root component
import { defineComponent, h } from '@vue/runtime-core';
import Circle from './component/Circle';

export default defineComponent({
    render() {
        // create vnode
        const vnode = h('rect', { x: 100, y: 100 }, '矩形', [
            h(Circle)
        ]);
        console.log(vnode);
        return vnode;
    }
});