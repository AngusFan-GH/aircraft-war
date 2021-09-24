import { defineComponent, h } from '@vue/runtime-core';
import mapImage from '../../assets/map.png';
import startBtnImage from '../../assets/startBtn.png';

export default defineComponent({
    setup(props, ctx) {
        const onClick = () => {
            ctx.emit('changePage', 'GamePage');
        };
        return {
            onClick
        };
    },
    render(ctx) {
        // background image
        return h('Container', [
            h('Sprite', { texture: mapImage }),
            h('Sprite', {
                texture: startBtnImage,
                width: 300,
                height: 60,
                x: 90,
                y: 510,
                interactive: true,
                onClick: ctx.onClick
            })
        ]);
    }
});