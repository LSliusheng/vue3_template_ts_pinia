<template>
  <div class="content">
    <Filters :filterContainer="filterContainer" @filterSubmit="filterSubmit"></Filters>
    <el-table :data="tableData.records || []" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="unloadPointName" label="卸货点名称" width="180"></el-table-column>
      <el-table-column prop="startTime" label="卸货时间"></el-table-column>
      <el-table-column prop="liveCode" label="直播编号"></el-table-column>
      <el-table-column prop="code" label="收料编号"></el-table-column>
      <el-table-column prop="supplierName" label="供货单位"></el-table-column>
    </el-table>
    <Pagination
        :initial-page-size="pagination.size"
        :initial-current-page="pagination.current"
        :current-page="current"
        :page-size="size"
        :total="tableData.total || []"
        @pagination-change="handlePaginationChange"
    >
    </Pagination>
  </div>
</template>

<script setup lang="ts">
  import Filters from '@/components/filters/index.vue'
  import Pagination from '@/components/pagination/index.vue'
  import moment from 'moment'
  import {ref, toRefs} from "vue";
  import {getAccepttanceProcessListApi} from "@/api";
  import {usePagination} from "@/hooks/pagination";

  const filterContainer = [
    {
      label: '卸货点名称',
      prop: 'name',
      // defaultValue: '张三',
      type: 'input',
      placeholder: '请输入卸货点名称'
    },
    {
      label: '卸货开始时间',
      prop: 'startTime',
      type: 'date-picker',
      placeholder: '请选择卸货开始时间',
      format: 'YYYY-MM-DD',
      // defaultValue: moment().subtract(1, 'days').format('YYYY-MM-DD')
    },
    {
      label: '卸货结束时间',
      prop: 'endTime',
      type: 'date-picker',
      placeholder: '请选择卸货结束时间',
      format: 'YYYY-MM-DD',
      // defaultValue: moment().format('YYYY-MM-DD')
    },
    {
      label: '直播编号',
      prop: 'liveCode',
      type: 'input',
      placeholder: '请输入直播编号'
    },
  ]

  const pagination = usePagination()
  const current = ref<Number>(pagination.current)
  const size = ref<Number>(pagination.size)
  const filterForm = ref<Object>({})
  const tableData = ref<Object>({})

  const filterSubmit = (data: Object) => {
    filterForm.value = data
    console.log('filterSubmit', filterForm.value, current.value, size.value)
    current.value = pagination.current
    size.value = pagination.size
    getList()
  }
  const handlePaginationChange = (data: Object) => {
    current.value = data.currentPage
    size.value = data.pageSize
    getList()
  }
  const getList = () => {
    let params = {
      current: current.value,
      size: size.value,
      ...filterForm.value
    }
    getAccepttanceProcessListApi(params).then(res => {
      console.log(res)
      tableData.value = res.data
    })
  }

</script>

<style scoped>

</style>