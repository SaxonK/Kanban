<script setup>
  defineProps({
    headline: {
      type: String,
      required: true
    },
    headlineType: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  });
</script>

<template>
  <section>
    <div class="header">
      <span v-if="icon != ''" class="material-symbols-rounded card-icon">
        {{ icon }}
      </span>
      <h2 :class="headlineType">{{ headline }}</h2>
    </div>
    <article>
      <slot></slot>
    </article>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}
.header {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: var(--space-s);
}
h2 {
  font-weight: 600;
}
</style>