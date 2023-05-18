<template>
  <basic-layout>
    <yt-table-search :data="searchData">
      <template #slots="item, formModel">
        <el-input v-model="formModel[item.key]"></el-input>
      </template>
    </yt-table-search>
    <div>{{ title }}</div>
  </basic-layout>
</template>
<script lang="ts" setup>
import YtTableSearch from '@/components/common/yt-table-search'

import { ISearchData } from '@/components/common/types/search'

const title = '品类管理'
const searchData: ISearchData[] = [{
  label: '产品类型',
  key: 'type',
}, {
  label: '日期',
  key: 'date',
  type: 'dateRange'
}, {
  label: '插槽',
  key: 'slots',
  slot: true,
}]
</script>
