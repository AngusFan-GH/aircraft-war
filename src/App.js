// root component
import { computed, defineComponent, h, ref } from '@vue/runtime-core';
import GamePage from './page/game';
import StartPage from './page/start';


export default defineComponent({
    setup() {
        const currentPageName = ref('GamePage');
        const currentPage = computed(() => {
            if (currentPageName.value === 'StartPage') {
                return StartPage;
            } else if (currentPageName.value === 'GamePage') {
                return GamePage;
            }
        });
        return {
            currentPage,
            currentPageName
        };
    },
    render(ctx) {
        // create vnode
        const vnode = h('Container', [
            h(ctx.currentPage, {
                onChangePage(page) {
                    ctx.currentPageName = page;
                }
            })
        ]);
        return vnode;
    }
});