import { defineComponent, h, reactive } from '@vue/runtime-core';
import Aircraft from '../component/aircraft';
import Map from '../component/map';

export default defineComponent({
    setup() {
        const aircraftInfo = getAircraftPoint();
        return {
            aircraftInfo
        };
    },
    render(ctx) {
        return h('Container', [
            h(Map),
            h(Aircraft, {
                x: ctx.aircraftInfo.x,
                y: ctx.aircraftInfo.y,
            })
        ]);
    }
});

function getAircraftPoint() {
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
    return point;
}