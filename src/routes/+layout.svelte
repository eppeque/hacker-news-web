<script>
  import Navbar from "./Navbar.svelte";
  import "../app.css";

  export let data;
</script>

<div class="container mx-auto px-10 font-lexend bg-white min-h-screen">
  <Navbar isConnected={data.isConnected} />
  <slot />
</div>
