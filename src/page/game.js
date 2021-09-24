import { defineComponent, h, onMounted, onUnmounted, reactive } from '@vue/runtime-core';
import Bullet from '../component/bullet';
import Enemy from '../component/enemy';
import Map from '../component/map';
import Plane from '../component/plane';
import { game } from '../Game.js';
import { hitTestObject } from '../utils';

export default defineComponent({
    setup(props, { emit }) {
        // plane
        const plane = createPlane();

        //enemy
        const enemies = createEnemies();

        // bullets
        const { bullets, addBullet } = createBullets();

        function onAttack(bulletInfo) {
            addBullet(bulletInfo);
        }

        handleFighting({ plane, enemies, bullets, emit });

        return {
            plane,
            enemies,
            bullets,
            onAttack
        };
    },
    render(ctx) {
        // create enemies
        const createEnemies = () => {
            return ctx.enemies.map(info => {
                return h(Enemy, { x: info.x, y: info.y });
            });
        };
        // create bullets
        const createBullets = () => {
            return ctx.bullets.map(info => {
                return h(Bullet, {
                    x: info.x,
                    y: info.y
                });
            });
        };
        return h('Container', [
            h(Map),
            h(Plane, {
                x: ctx.plane.x,
                y: ctx.plane.y,
                onAttack: ctx.onAttack
            }),
            ...createEnemies(),
            ...createBullets()
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

function createBullets() {
    const bullets = reactive([]);
    function addBullet(info) {
        bullets.push({
            ...info,
            width: 5,
            height: 11
        });
    }
    return { bullets, addBullet };
}

function handleFighting({ plane, enemies, bullets, emit }) {
    function handleTicker() {
        // enemies move
        enemies.forEach(enemy => enemy.y++);

        // bullets move
        bullets.forEach(bullet => bullet.y--);

        // hit test
        enemies.forEach(enemy => {
            if (hitTestObject(enemy, plane)) {
                emit('changePage', 'EndPage');
            }
        });

        bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemy, enemyIndex) => {
                if (hitTestObject(bullet, enemy)) {
                    bullets.splice(bulletIndex, 1);
                    enemies.splice(enemyIndex, 1);
                }
            });
        });
    }

    onMounted(() => {
        game.ticker.add(handleTicker);
    });
    onUnmounted(() => {
        game.ticker.remove(handleTicker);
    });
}