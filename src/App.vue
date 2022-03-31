<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-page-header :content="$route.name" @back="goBack" />
        <el-divider />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
