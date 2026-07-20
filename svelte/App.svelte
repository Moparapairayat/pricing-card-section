<script lang="ts">
  import PricingSection from './PricingSection.svelte';
</script>

<main class="app-main">
  <PricingSection />
</main>

<style>
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #030303;
    color: #f8fafc;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
  }

  .app-main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
