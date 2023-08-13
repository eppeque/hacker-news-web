<script lang="ts">
  import { page } from "$app/stores";
  import { stars } from "$lib/stars";

  export let isConnected: boolean;
  let showLinks = false;

  function openLinks() {
    showLinks = true;
  }

  function closeLinks() {
    showLinks = false;
  }

  async function signOut() {
    closeLinks();
    const response = await fetch("/auth/sign-out", { method: "POST" });

    if (response.ok) {
      isConnected = false;
      stars.set(undefined);
    }
  }
</script>

<nav class="py-10 md:flex md:justify-between md:items-center">
  <div class="flex justify-between items-center">
    <h2 class="text-lg lg:text-xl">Hacker News</h2>

    <button class="md:hidden material-icons" on:click={openLinks}>menu</button>
  </div>

  <div
    class:hidden={!showLinks}
    class="md:hidden fixed inset-0 backdrop-blur-sm backdrop-brightness-75"
  />

  <ul
    class:hidden={!showLinks}
    class="fixed md:static top-4 right-4 bg-white md:bg-transparent p-10 md:p-0 shadow-xl md:shadow-none rounded-lg md:rounded-none flex md:flex flex-col md:flex-row gap-8 md:gap-10 md:justify-between md:items-center"
  >
    <button
      class="md:hidden fixed top-6 right-6 material-icons"
      on:click={closeLinks}>close</button
    >
    <li>
      <a
        href="/"
        class="hover:text-orange-600 hover:underline"
        class:text-orange-600={$page.url.pathname === "/" &&
          $page.url.searchParams.get("type") !== "new"}
        on:click={closeLinks}>Top Stories</a
      >
    </li>
    <li>
      <a
        href="/?type=new"
        class="hover:text-orange-600 hover:underline"
        class:text-orange-600={$page.url.pathname === "/" &&
          $page.url.searchParams.get("type") === "new"}
        on:click={closeLinks}>New Stories</a
      >
    </li>
    {#if !isConnected}
      <li>
        <a
          href="/auth/sign-in"
          class="py-2 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md"
          on:click={closeLinks}>Sign in</a
        >
      </li>
    {:else}
      <li>
        <a
          href="/stars"
          class="hover:text-orange-600 hover:underline"
          class:text-orange-600={$page.url.pathname === "/stars"}
          on:click={closeLinks}>Your stars</a
        >
      </li>
      <li>
        <button
          class="py-2 px-4 bg-orange-500 text-white rounded-md"
          on:click={signOut}>Sign out</button
        >
      </li>
    {/if}
  </ul>
</nav>
