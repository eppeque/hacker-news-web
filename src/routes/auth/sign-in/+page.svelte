<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<svelte:head>
  <title>Sign In - Hacker News</title>
</svelte:head>

<div class="shadow-xl rounded-lg p-10">
  <h1 class="py-2 text-5xl text-orange-600">Sign in</h1>

  <form method="post" class="py-4 flex flex-col" use:enhance>
    {#if form?.missing}
      <p class="text-red-600">The email and password fields are required</p>
    {:else if form?.incorrect}
      <p class="text-red-600">Invalid credentials!</p>
    {/if}

    <label for="email" class="py-2">Email address</label>
    <input
      type="email"
      name="email"
      id="email"
      value={form?.email ?? ""}
      required
      class="border-2 border-gray-200 p-3 rounded-md outline-none focus:border-orange-500"
    />

    <label for="password" class="py-2">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      required
      class="border-2 border-gray-200 p-3 rounded-md outline-none focus:border-orange-500"
    />

    <input
      type="submit"
      value="Login"
      class="my-4 py-2 px-4 bg-orange-500 text-white rounded-md cursor-pointer w-fit"
    />
  </form>

  <a
    href="/auth/sign-up"
    class="py-2 px-4 rounded-md text-orange-600 hover:bg-orange-50"
    >Create an account</a
  >
</div>
