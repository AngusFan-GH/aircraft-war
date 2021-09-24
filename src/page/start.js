import { defineComponent, h } from '@vue/runtime-core';
import startBtnImage from '../../assets/startBtn.png';
import startPageImage from '../../assets/start_page.jpg';

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
            h('Sprite', { texture: startPageImage }),
            h('Sprite', {
                texture: startBtnImage,
                x: 225,
                y: 510,
                interactive: true,
                onClick: ctx.onClick
            })
        ]);
    }
});