import {ref} from "vue";

export const usePagination = () => {
    return {
        size: 10,
        current: 1,
        sizeList: [10, 20, 50, 100],
    }
}