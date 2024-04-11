<template>
  <div class="basic-menu">
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <div v-if="$slots.main" class="content">
      <slot name="main"></slot>
    </div>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.basic-menu {
  display: flex;
  width: 100%;
  height: fit-content;
  text-align: left;
  color: var(--color-text);
  font-size: var(--step-0);
  border: none;
  border-radius: 12px;
  background: rgba(var(--color-background-header-rgb), 0.75);
  backdrop-filter: blur(4px);
  padding: var(--space-2xs-xs) var(--space-s-m);
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  transition: all 300ms ease-in-out;
}
header {
  justify-content: space-between;
}
header, footer {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: var(--space-xs);
}
.content {
  position: relative;
  display: flex;
  width: 100%;
  flex: 1 1 0px;
  gap: var(--space-m);
  flex-direction: column;
}
</style>