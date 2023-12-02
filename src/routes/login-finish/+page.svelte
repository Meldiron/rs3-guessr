<script lang="ts">
	import { browser } from "$app/environment";
	import { goto, invalidateAll } from "$app/navigation";
    import { Client, Account } from "appwrite";
	import { onMount } from "svelte";

    const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject('rs3-guessr');

    const account = new Account(client);

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
        } catch (error) {
            console.error('Error updating session', error);
        }
    });
 </script>