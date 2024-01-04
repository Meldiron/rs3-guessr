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
			owned
		};
	});

	const sections = [
		{
			name: 'Ready to Play',
			cards: packs.filter((pack) => pack.owned).sort((a, b) => {
				const aPerc = a.completed / a.total;
				const bPerc = a.completed / a.total;

				return aPerc < bPerc ? -1 : 1;
			})
		},
		{
			locked: true,
			name: 'Locked',
			cards: packs.filter((pack) => !pack.owned).sort((a, b) => {
				const aPerc = a.completed / a.total;
				const bPerc = a.completed / a.total;

				return aPerc < bPerc ? -1 : 1;
			})
		}
	];
</script>

<!-- Card Blog -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto flex flex-col space-y-12">
	{#each sections as section}
		<h1 class="mb-0 text-4xl sm:text-6xl font-bold text-brand-50">
			{section.name}
		</h1>
		<!-- Grid -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
			{#if section.cards.length === 0}
			<h1 class="col-span-12 text-2xl sm:text-4xl font-bold text-brand-600 w-full">
				Nothing to show here.
			</h1>
			{/if}
			{#each section.cards as card}
			{@const isCompleted = card.completed === card.total}
			{@const hasStarted = card.completed > 0}
			<a href={section.locked ? '#' : `/me/game/${card.id}`} class={`flex flex-col border shadow-sm rounded-xl bg-brand-900 shadow-brand-700/[.7] ${isCompleted ? 'border-green-500' : 'border-brand-800'}`}>
				<div class="p-4 md:p-5">

					<!-- Circular Progress -->
<div class="relative w-[fit-content]">
	<svg width="48" height="48" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
	  <!-- Background Circle -->
	  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-brand-700" stroke-width="1"></circle>
	  <!-- Progress Circle inside a group with rotation -->
	  {#if hasStarted}
	  <g class="origin-center -rotate-90 transform">
		<circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-green-500" stroke-width={isCompleted ? 1 : 3} stroke-dasharray={isCompleted ? 110 : 100} stroke-dashoffset={100 - Math.round(card.completed / card.total * 100)}></circle>
	  </g>
	  {/if}
	</svg>
	{#if hasStarted && isCompleted}
	<div class="absolute inset-0 flex justify-center items-center">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-500">
			<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
		  </svg>
	
		  
	</div>
	{/if}
  </div>
  <!-- End Circular Progress -->


				  <h3 class=" mt-4 text-2xl font-bold text-brand-800 dark:text-white">
					{card.name}
				  </h3>
				  <p class="mt-0 text-brand-500 dark:text-brand-400">
					by Meldiron
				  </p>

				  {#if section.locked}
				  <p class="mt-3 inline-flex items-center gap-x-1 text-md rounded-lg border border-transparent text-brand-600 hover:text-brand-800 disabled:opacity-50 disabled:pointer-events-none dark:text-pink-600">Coming soon!</p>
				  {:else}
				  <a class="mt-3 inline-flex items-center gap-x-1 text-md font-semibold rounded-lg border border-transparent text-brand-600 hover:text-brand-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-600 dark:hover:text-blue-700 " href={`/me/game/${card.id}`}>
					Play
					<svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
				  </a>
				  {/if}
				</div>
			</a>
			  {/each}
		</div>
		<!-- End Grid -->
	{/each}
</div>
<!-- End Card Blog -->
