<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import { account } from '$lib/appwrite';
	import { onMount } from 'svelte';

	// TODO: Do this as .ts

	onMount(async () => {
		try {
			if (browser) {
				const urlParams = new URLSearchParams(window.location.search);
				const secret = urlParams.get('secret') ?? '';
				const userId = urlParams.get('userId') ?? '';

				await account.updateMagicURLSession(userId, secret);
				await invalidateAll();
				goto('/');
			}
		} catch (error: any) {
			alert('Could not sign in:' + error.message);
		}
	});
</script>
