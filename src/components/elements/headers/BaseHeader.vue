<script setup>
  defineProps({
    height: {
      type: Number,
      required: true
    }
  })
</script>

<template>
  <header :style="`height: ${height}px;`">
    <div class="layout-container">
      <slot></slot>
    </div>
  </header>
</template>

<style scoped>
header .layout-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>