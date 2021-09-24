import { Application } from 'pixi.js';

export const game = new Application({
    width: 480,
    height: 700
});
document.body.append(game.view);

export function getRootContainer() {
    return game.stage;
}