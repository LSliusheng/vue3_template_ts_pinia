<template>
  <div class="filter-search">
    <el-form ref="formRef" :inline="true" :model="form" class="forms">
      <el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in filterContainer" :key="index">
        <el-input v-if="item.type === 'input'" v-model="form[item.prop]" :placeholder="item.placeholder"
                  :clearable="item.clearable"
                  :maxlength="item.maxlength" :style="item.style">
        </el-input>
        <el-select v-if="item.type === 'select'" v-model="form[item.prop]" :placeholder="item.placeholder">
          <el-option v-for="(opts, i) in item.options" :key="i" :label="opts.label" :value="opts.value"/>
        </el-select>
        <el-date-picker v-if="item.type === 'date-picker'" v-model="form[item.prop]" type="date"
                        :placeholder="item.placeholder" :value-format="item.format" style="width: 100%"/>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">

  import {FormInstance} from "element-plus";
  import {onMounted, reactive, ref} from "vue";

  interface FormOptionList {
    label: string;
    prop: string;
    type: string;
    placeholder?: string;
    clearable?: boolean;
    maxlength?: number;
    style?: string;
    defaultValue?: string;
    options?: Array<{
      label: string;
      value: string;
    }>
  }

  const prop = defineProps({
    filterContainer: {
      type: Array,
      default: () => []
    },
  })

  const emit = defineEmits([
    'filterSubmit'
  ])

  const formRef = ref<FormInstance>()
  const form = ref<Object>({})

  const init = () => {
    if (prop.filterContainer?.length > 0) {
      prop.filterContainer.forEach(item => {
        form.value[item.prop] = item.defaultValue
      })
    }
    // console.log('form', form, form.value)
    emit('filterSubmit', form.value)
  }

  init()

  const onSubmit = () => {
    console.log('submit', form)
    formRef.value?.validate((valid: Boolean) => {
      if (valid) {
        emit('filterSubmit', form.value)
      }
    })
  }

</script>

<style lang="scss" scoped>
.btn {
  float: right;
}
</style>