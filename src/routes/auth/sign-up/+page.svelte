<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<svelte:head>
  <title>Sign Up - Hacker News</title>
</svelte:head>

<h1 class="py-2 text-5xl text-orange-600">Create an account</h1>
<form method="post" class="py-4 flex flex-col" use:enhance>
  {#if form?.missing}
    <p class="text-red-600">All fields are required</p>
  {:else if form?.mismatch}
    <p class="text-red-600">
      The password and its confirmation must be the same
    </p>
  {:else if form?.incorrect}
    <p class="text-red-600">Invalid credentials</p>
  {/if}

  <label for="email" class="py-2">Email address</label>
  <input
    type="email"
    name="email"
    id="email"
    required
    placeholder="john.doe@example.com"
    value={form?.email ?? ""}
    class="border-2 border-gray-200 p-3 rounded-md outline-none focus:border-orange-500"
  />

  <label for="username" class="py-2">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    required
    placeholder="SuperJohn"
    value={form?.username ?? ""}
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

  <label for="confirm-password" class="py-2">Confirm password</label>
  <input
    type="password"
    name="confirm-password"
    id="confirm-password"
    required
    class="border-2 border-gray-200 p-3 rounded-md outline-none focus:border-orange-500"
  />

  <input
    type="submit"
    value="Sign up"
    class="my-4 py-2 px-4 w-fit bg-orange-500 text-white rounded-md cursor-pointer"
  />
</form>
