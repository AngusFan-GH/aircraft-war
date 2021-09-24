import { defineComponent, h, onMounted, onUnmounted, reactive } from '@vue/runtime-core';
import Enemy from '../component/enemy';
import Map from '../component/map';
import Plane from '../component/plane';
import { game } from '../Game.js';
import { hitTestObject } from '../utils';

export default defineComponent({
    setup(props, ctx) {
        // plane
        const plane = createPlane();

        //enemy
        const enemies = createEnemies();

        function handleTicker() {
            // enemies move
            enemies.forEach(enemy => enemy.y++);

            // hit test
            enemies.forEach(enemy => {
                if (hitTestObject(enemy, plane)) {
                    ctx.emit('changePage', 'EndPage');
                }
            });
        }

        onMounted(() => {
            game.ticker.add(handleTicker);
        });
        onUnmounted(() => {
            game.ticker.remove(handleTicker);
        });

        return {
            plane,
            enemies
        };
    },
    render(ctx) {
        // create enemies
        const createEnemies = () => {
            return ctx.enemies.map(info => {
                return h(Enemy, { x: info.x, y: info.y });
            });
        };
        return h('Container', [
            h(Map),
            h(Plane, {
                x: ctx.plane.x,
                y: ctx.plane.y
            }),
            ...createEnemies()
        ]);
    },
});

function createPlane() {
    const info = reactive({
        x: 189,
        y: 500,
        width: 102,
        height: 126
    });
    // keyboard control
    window.addEventListener('keydown', e => {
        const speed = 15;
        switch (e.code) {
            case 'ArrowUp':
                info.y -= speed;
                break;
            case 'ArrowDown':
                info.y += speed;
                break;
            case 'ArrowLeft':
                info.x -= speed;
                break;
            case 'ArrowRight':
                info.x += speed;
                break;
        }
    });
    return info;
}

function createEnemies() {
    const enemies = reactive([
        {
            x: 50,
            y: 0,
            width: 69,
            height: 99
        }
    ]);
    return enemies;
}