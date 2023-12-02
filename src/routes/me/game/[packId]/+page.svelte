<script>
	const packName = 'Varrock';
	const packId = 'a';
	const locations = [
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: true
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: true
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: true
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: false
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: true
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: true
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: false
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: false
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: true
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: false
		},
		{
			id: 'a',
			imageUrl: '/location.png',
			completed: false
		}
	];
</script>

<!-- Card Blog -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto flex flex-col space-y-12">
	<h1 class="mb-8 text-4xl sm:text-6xl font-bold text-brand-800 dark:text-brand-50">{packName}</h1>
	<!-- Grid -->
	<div class="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
		{#each locations as location}
			<!-- Card -->
			<a
				href={`/me/game/${packId}/${location.id}`}
				class={`overflow-hidden relative cursor-pointer group scale-100 hover:scale-105 hover:shadow-lg shadow-md transform transition-transform duration-250 flex flex-col h-full bg-white border shadow-sm rounded-lg dark:bg-brand-950 dark:shadow-brand-700/[.7] ${
					location.completed ? 'border-green-400' : 'border-brand-600'
				}`}
			>
				<div
					class="h-52 flex flex-col justify-center items-center bg-brand-900 rounded-lg relative"
				>
					<img
						class="object-cover object-center w-full h-full blur-md"
						src={location.imageUrl}
						alt="Cover"
					/>

					{#if location.completed}
						<div
							class="absolute inset-0 flex items-center justify-center text-green-400 bg-opacity-75 bg-black rounded-lg"
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
				</div>
			</a>
			<!-- End Card -->
		{/each}
	</div>
	<!-- End Grid -->
</div>
<!-- End Card Blog -->
