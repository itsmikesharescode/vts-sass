<script lang="ts" module>
  import { page } from '$app/state';
  import Login from './components/forms/login/login.svelte';
  import Register from './components/forms/register/register.svelte';
  import ForgotPwd from './components/forms/forgot-pwd/forgot-pwd.svelte';
</script>

<script lang="ts">
  const param = $derived(page.url.searchParams.get('q'));

  const { data } = $props();
</script>

{#if param === 'register'}
  <Register signUpForm={data.signUpForm} />
{:else if param === 'forgot-pwd'}
  <ForgotPwd forgotPwdForm={data.forgotPwdForm} />
{:else}
  <Login signInForm={data.signInForm} />
{/if}
