<script setup lang="ts">
import Search from '@/views/search/index.vue'
</script>

<template>
  <div class="home">
    <Search />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: var(--background);
  block-size: 100%;
  inline-size: 100%;
}
</style>