<script setup>
  /* import { ref, onMounted, onUnmounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router'; */
  import NewBoardForm from '@/components/boards/NewBoardForm.vue';
  import PreferedColorScheme from '@/components/PreferedColorScheme.vue';
</script>

<template>
  <header>
    <div class="layout-container">
      <div class="header-title">
        <h1><router-link to="/">Kanban</router-link></h1>
      </div>
      <div class="header-options">
        <NewBoardForm />
        <PreferedColorScheme />
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  height: 50px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-header);
}
header .layout-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.header-title,
.header-options {
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: row;
  gap: var(--space-m-l);
}
header {
  display: flex;
  place-items: center;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>