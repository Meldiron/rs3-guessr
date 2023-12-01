<script lang="ts">
    import { Client, Account } from "appwrite";
	import { onMount } from "svelte";

    const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject('rs3-guessr');

    const account = new Account(client);

    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret') ?? '';
    const userId = urlParams.get('userId') ?? '';

    onMount(async () => {
        try {
            await account.updateMagicURLSession(userId, secret);
            window.location.href = '/';
        } catch (error) {
            console.error('Error updating session', error);
        }
    });
 </script>