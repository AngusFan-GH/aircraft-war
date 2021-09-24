import { defineComponent, h, toRefs } from '@vue/runtime-core';
import planeImage from '../../assets/plane.png';

export default defineComponent({
    props: ['x', 'y'],
    setup(props, ctx) {
        const { x, y } = toRefs(props);

        window.addEventListener('keydown', e => {
            if (e.code === 'Space') {
                console.log('attack');
                ctx.emit('attack', {
                    x: x.value + 51 - 2.5,
                    y: y.value - 11
                });
            }
        });
        return { x, y };
    },
    render(ctx) {
        return h(
            'Container', { x: ctx.x, y: ctx.y },
            [
                h('Sprite', {
                    texture: planeImage,
                    width: 102,
                    height: 126
                })
            ]
        );
    }
});