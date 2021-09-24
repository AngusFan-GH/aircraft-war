import { defineComponent, h } from '@vue/runtime-core';
import mapImage from '../../assets/map.jpg';

export default defineComponent({
    render() {
        return h('Container', [
            h('Sprite', { texture: mapImage })
        ]);
    }
});