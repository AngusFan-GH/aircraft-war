import { defineComponent, h, reactive } from '@vue/runtime-core';
import Map from '../component/map';
import Plane from '../component/plane';

export default defineComponent({
    setup() {
        const { point } = getPlaneInfo();
        return {
            planeInfo: point
        };
    },
    render(ctx) {
        return h('Container', [
            h(Map),
            h(Plane, {
                x: ctx.planeInfo.x,
                y: ctx.planeInfo.y,
            })
        ]);
    }
});

function getPlaneInfo() {
    const point = reactive({ x: 189, y: 500 });
    // keyboard control
    window.addEventListener('keydown', e => {
        const speed = 15;
        switch (e.code) {
            case 'ArrowUp':
                point.y -= speed;
                break;
            case 'ArrowDown':
                point.y += speed;
                break;
            case 'ArrowLeft':
                point.x -= speed;
                break;
            case 'ArrowRight':
                point.x += speed;
                break;
        }
    });
    return { point };
}