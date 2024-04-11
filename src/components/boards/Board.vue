<script setup>
  import FavouriteBoardButton from '@/components/boards/BoardFavouriteButton.vue';
  
  const { details } = defineProps({
    details: {
      type: Object,
      required: true
    }
  })

  const getBackgroundValue = () => {
    if (details.background.startsWith('#')) {
      return details.background;
    } else {
      return `url(${details.background})`;
    }
  };
</script>

<template>
  <router-link :to="'/board/' + details.id" class="board" :style="{ background: getBackgroundValue() }">
    <h2>{{ details.title }}</h2>
    <p>{{ details.description }}</p>
    <FavouriteBoardButton 
      :absolutePosition="['top', 'right']"
      :details="details"
      :hoverEffect="false"
      :isAbsolute="true"
      :size="20"
    />
  </router-link>
</template>

<style scoped>
.board {
  position: relative;
  grid-column: span 3;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-2xs-xs) var(--space-s-m);
  background-size: cover !important;
  background-position: center !important;
  cursor: pointer;
}
h2, p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.board button.secondary-button.absolute {
  position: absolute;
  top: var(--space-2xs-xs);
  padding: 0;
  right: 0;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
}
.board:hover button.secondary-button.absolute {
  right: var(--space-2xs-xs);
  opacity: 1;
  visibility: visible;
  z-index: 1;
}

@media screen and (max-width: 768px) {
  .board {
    grid-column: span 12;
  }
}
</style>