<template>
  <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizeList"
      :size="size"
      :disabled="disabled"
      :background="background"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @change="handleChange"
  />
</template>

<script setup lang="ts">
import {ref, toRefs} from 'vue'
  import type { ComponentSize } from 'element-plus'

  const props = defineProps({
    initialPageSize: {
      type: Number,
      default: () => 1
    },
    initialCurrentPage: {
      type: Number,
      default: () => 10
    },
    total: {
      type: Number,
      required: true
    },
    pageSizeList: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    size: {
      type: String as () => ComponentSize,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  })

  const emit = defineEmits(['update:currentPage', 'update:pageSize', 'pagination-change'])

  const currentPage = ref<number>(props.initialCurrentPage)
  const pageSize = ref<number>(props.initialPageSize)

  const handleSizeChange = (pageSize: number) => {
    console.log('handleSizeChange', pageSize)
    pageSize.value = pageSize
    emit('update:pageSize', pageSize)
    emit('pagination-change', { currentPage, pageSize })
  }
  const handleCurrentChange = (currentPage: number) => {
    currentPage.value = currentPage
    console.log('handleCurrentChange', currentPage)
    emit('update:currentPage', currentPage)
    emit('pagination-change', { currentPage, pageSize })
  }
  const handleChange = (currentPage: number, pageSize: number) => {
    console.log('handleChange', currentPage, pageSize)
    emit('update:currentPage', currentPage)
    emit('update:pageSize', pageSize)
    emit('pagination-change', { currentPage, pageSize })
  }

</script>

<style lang="scss" scoped>

</style>