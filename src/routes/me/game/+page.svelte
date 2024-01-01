<script lang="ts">
	import { storage } from '$lib/appwrite';
	import type { PageData } from './$types';

	export let data: PageData;

	const packs = data.packs.documents.map((pack) => {
		let owned = false;

		if (pack.accessType === 'free') {
			owned = true;
		} else if (pack.accessType === 'label') {
			const labels = data.user?.labels ?? [];
			owned = labels.includes(pack.$id);
		}

		return {
			id: pack.$id,
			name: pack.name,
			completed: data.finishes.documents.filter((finish) => finish.packId === pack.$id).length,
			total: data.locations.documents.filter((location) => location.packId === pack.$id).length,
			owned,
			imageUrl: storage.getFilePreview('packImages', pack.imageId).toString()
		};
	});

	async function validateOwned() {}

	const sections = [
		{
			name: 'Ready to Play',
			cards: packs.filter((pack) => pack.owned)
		},
		{
			name: 'Locked',
			cards: packs.filter((pack) => !pack.owned)
		}
	];
</script>

<!-- Card Blog -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto flex flex-col space-y-12">
	{#each sections as section}
		<h1 class="mb-8 text-4xl sm:text-6xl font-bold text-brand-50">
			{section.name}
		</h1>
		<!-- Grid -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
			{#if section.cards.length === 0}
			<h1 class="col-span-12 text-2xl sm:text-4xl font-bold text-brand-600 w-full">
				Nothing to show here
			</h1>
			{/if}
			{#each section.cards as card}
				<!-- Card -->
				<a
					href={`/me/game/${card.id}`}
					class={`overflow-hidden relative cursor-pointer group scale-100 hover:scale-105 shadow-md transform transition-transform duration-250 flex flex-col h-full bg-white border shadow-sm rounded-xl rounded-b-md dark:bg-brand-950 dark:shadow-brand-700/[.7] ${
						card.completed === card.total && card.owned ? 'border-green-400' : 'border-brand-600'
					}`}
				>
					<div
						class="h-60 flex flex-col justify-center items-center bg-brand-900 rounded-t-xl relative"
					>
						<img class="object-cover object-center w-full h-full" src={card.imageUrl} alt="Cover" />

						{#if card.completed === card.total && card.owned}
							<div
								class="absolute inset-0 flex items-center justify-center text-green-400 bg-opacity-75 bg-black rounded-t-xl"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-16 h-16"
								>
									<path
										fill-rule="evenodd"
										d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						{/if}

						{#if !card.owned}
							<div
								class="absolute inset-0 flex items-center justify-center text-brand-200 bg-opacity-75 bg-black rounded-t-xl"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-16 h-16"
								>
									<path
										fill-rule="evenodd"
										d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						{/if}
					</div>
					<div class="p-4 md:p-6">
						<h3
							class={`text-xl text-center font-semibold ${
								card.completed === card.total && card.owned ? 'text-green-400' : 'text-white'
							}`}
						>
							{card.name}
						</h3>
					</div>
					{#if card.owned}
						<div
							class="mt-auto flex border-t border-brand-200 divide-x divide-brand-200 dark:border-brand-600 dark:divide-brand-700"
						>
							<div
								style={`width: ${
									card.total === 0 ? 100 : Math.ceil((card.completed / card.total) * 100)
								}%`}
								class="rounded-bl-md h-4 bg-green-600"
							/>
						</div>
					{/if}
				</a>
				<!-- End Card -->
			{/each}
		</div>
		<!-- End Grid -->
	{/each}
</div>
<!-- End Card Blog -->
