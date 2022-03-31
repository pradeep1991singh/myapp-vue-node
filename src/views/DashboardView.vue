<template>
  <el-table v-if="!isLoading" :data="filterTableData" style="width: 100%">
    <el-table-column type="index" />
    <el-table-column label="Amount" prop="amount" />
    <el-table-column label="Created Date" prop="created_at" />
    <el-table-column label="Updated Date" prop="updated_at" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination background layout="prev, pager, next" :total="5" /> -->
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";

const search = ref("");
const store = useStore();

onMounted(() => {
  store.dispatch("loadLatestTransactions");
});

const isLoading = computed(() => store.state.transactions.isLoading);

const filterTableData = computed(() =>
  store.state.transactions.filter(
    (data) =>
      !search.value ||
      data.amount.toLowerCase().includes(search.value.toLowerCase())
  )
);

console.log(isLoading.value);

// const totalPage = computed(() => {
//   const page = Math.ceil(filterTableData.value.length / 10);
//   console.log(page);
//   return page;
// });
</script>
