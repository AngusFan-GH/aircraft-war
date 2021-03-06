import { defineComponent, h, toRefs } from '@vue/runtime-core';
import enemyImage from '../../assets/enemy.png';

export default defineComponent({
    props: ['x', 'y'],
    setup(props, ctx) {
        const { x, y } = toRefs(props);
        return { x, y };
    },
    render(ctx) {
        return h('Container', { x: ctx.x, y: ctx.y },
            [
                h('Sprite', {
                    texture: enemyImage,
                    width: 69,
                    height: 99
                })
            ]
        );
    }
});