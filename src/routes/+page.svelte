<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { account } from '$lib/appwrite';
	import type { LayoutData } from './$types';

	const faq = [
		{
			q: 'Can I play for free?',
			a: 'Yes, RSGuessr is 100% free and does not include any ads or trackers.'
		},
		{
			q: 'Why should I create an account?',
			a: "At the moment, there isn't anything special. In the future we plan to add leaderboards, profiles, achievements, and more. Registering an account shows your interest in the future of RSGuessr."
		},
		{
			q: 'Can I suggest a new location?',
			a: 'We would love new locations! Please leave your suggestions at contact@almostapps.eu'
		},
		{
			q: 'Does RSGuessr use cookies?',
			a: 'RSGuessr only uses cookies necessary for proper functionality.'
		},
		{
			q: 'Do you store my personal data?',
			a: 'All data provided is stored on Appwrite Cloud. For any requests regarding your data, please contact me at contact@almostapps.eu'
		},
		{
			q: 'Can we get in touch?',
			a: 'For general questions, message me on Discord: Meldiron. For any security, privacy, or administrative requests, you can reach me at contact@almostapps.eu'
		}
	];

	export let data: LayoutData;

	let loading: boolean = false;

	async function createGuestUser() {
		if (loading) {
			return;
		}

		loading = true;
		try {
			await account.createAnonymousSession();
			await invalidateAll();
		} catch (error: any) {
			alert('Could not create guest user: ' + error.message);
		} finally {
			loading = false;
		}
	}
</script>

<!-- Hero -->
<div
	class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2"
>
	<div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
		<!-- Announcement Banner -->
		<div class="flex justify-center">
			<a
				href="https://www.osrsguessr.com/"
				target="_blank"
				class="hover:bg-brand-800 inline-flex items-center gap-x-2 text-sm  p-1 ps-3 rounded-full transition hover:border-brand-300 bg-brand-900 text-brand-200 dark:focus:outline-none dark:ring-1 dark:ring-brand-600"
			>
				Old School alternative
				<span
					class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-brand-200 font-semibold text-sm text-brand-600 dark:bg-brand-700 dark:text-brand-400"
				>
					<svg
						class="flex-shrink-0 w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
					>
				</span>
			</a>
		</div>
		<!-- End Announcement Banner -->

		<!-- Title -->
		<div class="mt-5 max-w-2xl text-center mx-auto">
			<h1
				class="block font-bold text-brand-800 text-4xl md:text-5xl lg:text-6xl dark:text-brand-200"
			>
				GeoGuessr but
				<span class="bg-clip-text bg-gradient-to-tl from-brand-600 to-white text-transparent"
					>RuneScape 3</span
				>
			</h1>
		</div>
		<!-- End Title -->

		<div class="mt-5 max-w-3xl text-center mx-auto">
			<p class="text-lg text-brand-400">
				Geography game situated in RuneScape 3 overworld.
			</p>
		</div>

		<!-- Buttons -->
		<div class="mt-8 gap-3 flex justify-center">
			{#if !data.user}
				<a
					href="/auth/login"
					class="inline-flex justify-center items-center gap-x-3 text-center bg border border-transparent bg-white text-brand-950 text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:bg-brand-100"
				>
					Create Account
				</a>
				<button
					type="button"
					class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:border-brand-400"
					on:click={createGuestUser}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Play as Guest'}
				</button>
			{/if}

			{#if data.user}
				<a
					class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:border-brand-400"
					href="/me/game"
				>
					Play Game
				</a>
			{/if}
		</div>
		<!-- End Buttons -->
	</div>
</div>
<!-- End Hero -->

<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<div class="aspect-[16/7]">
		<img class="w-full h-full object-center rounded-xl" src="/hero.png" alt="Hero" />
	</div>
</div>

<!-- Icon Blocks -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Grid -->
	<div class="grid md:grid-cols-2 gap-12">
		<div class="lg:w-3/4">
			<h2 class="text-3xl text-brand-800 font-bold lg:text-4xl dark:text-white">
				Guess screenshot locations on a RuneScape map
			</h2>
			<p class="mt-3 text-brand-400">
				Look at an amazing-looking game screenshot and guess where in the Gielinor the picture was taken.
			</p>
		</div>
		<!-- End Col -->

		<div class="space-y-6 lg:space-y-10">
			<!-- Icon Block -->
			<div class="flex">
				<!-- Icon -->
				<span
					class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-brand-200 bg-white text-brand-800 shadow-sm mx-auto dark:bg-brand-900 dark:border-brand-700 dark:text-brand-200"
				>
					<svg
						class="flex-shrink-0 w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
							d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
						/></svg
					>
				</span>
				<div class="ms-5 sm:ms-8">
					<h3 class="text-base sm:text-lg font-semibold text-brand-800 dark:text-brand-200">
						Test your knowledge
					</h3>
					<p class="mt-1 text-brand-600 dark:text-brand-400">
						Ea labore deserunt in duis et. Nostrud voluptate laboris sint cillum voluptate.
						Reprehenderit reprehenderit mollit cupidatat dolor
					</p>
				</div>
			</div>
			<!-- End Icon Block -->

			<!-- Icon Block -->
			<div class="flex">
				<!-- Icon -->
				<span
					class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-brand-200 bg-white text-brand-800 shadow-sm mx-auto dark:bg-brand-900 dark:border-brand-700 dark:text-brand-200"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="flex-shrink-0 w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
						/>
					</svg>
				</span>
				<div class="ms-5 sm:ms-8">
					<h3 class="text-base sm:text-lg font-semibold text-brand-800 dark:text-brand-200">
						Playful way to remember
					</h3>
					<p class="mt-1 text-brand-600 dark:text-brand-400">
						Minim nulla incididunt enim cupidatat Lorem id eu nostrud pariatur mollit eiusmod sint
						est aliquip proident.
					</p>
				</div>
			</div>
			<!-- End Icon Block -->

			<!-- Icon Block -->
			<div class="flex">
				<!-- Icon -->
				<span
					class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-brand-200 bg-white text-brand-800 shadow-sm mx-auto dark:bg-brand-900 dark:border-brand-700 dark:text-brand-200"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="flex-shrink-0 w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
						/>
					</svg>
				</span>
				<div class="ms-5 sm:ms-8">
					<h3 class="text-base sm:text-lg font-semibold text-brand-800 dark:text-brand-200">
						Bring back nostlagia
					</h3>
					<p class="mt-1 text-brand-600 dark:text-brand-400">
						Esse excepteur excepteur tempor esse sunt culpa commodo Lorem exercitation cillum. Irure
						velit ad do adipisicing magna minim dolore sunt laboris velit id tempor voluptate.
					</p>
				</div>
			</div>
			<!-- End Icon Block -->
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End Icon Blocks -->

<!-- Features -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Title -->
	<div class="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
		<h2 class="text-3xl lg:text-6xl text-brand-800 font-bold dark:text-white">Explore the world</h2>
		<p class="mt-6 text-brand-400">
			Travel through Gielinor in a different way.
		</p>
	</div>
	<!-- End Title -->

	<!-- Grid -->
	<div class="mt-20 grid grid-cols-12 items-center gap-x-2 sm:gap-x-6 lg:gap-x-8">
		<div class="hidden md:block col-span-4 md:col-span-3">
			<div class="rounded-xl w-full h-[380px]">
				<img
					class="rounded-xl w-full h-full object-center object-cover"
					src="/gallery4.jpeg"
					alt="Render"
				/>
			</div>
		</div>
		<!-- End Col -->

		<div class="col-span-4 md:col-span-3">
			<div class="rounded-xl w-full h-[450px]">
				<img
					class="rounded-xl w-full h-full object-center object-cover"
					src="/gallery1.jpeg"
					alt="Render"
				/>
			</div>
		</div>
		<!-- End Col -->

		<div class="col-span-4 md:col-span-3">
			<div class="rounded-xl w-full h-[600px]">
				<img
					class="rounded-xl w-full h-full object-center object-cover"
					src="/gallery2.jpeg"
					alt="Render"
				/>
			</div>
		</div>
		<!-- End Col -->

		<div class="col-span-4 md:col-span-3">
			<div class="rounded-xl w-full h-[350px]">
				<img
					class="rounded-xl w-full h-full object-center object-cover"
					src="/gallery3.jpeg"
					alt="Render"
				/>
			</div>
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End Features -->

<!-- FAQ -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Title -->
	<div class="max-w-2xl mx-auto mb-10 lg:mb-14">
		<h2 class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
			You might be wondering...
		</h2>
	</div>
	<!-- End Title -->

	<div class="max-w-2xl mx-auto divide-y divide-brand-200 dark:divide-brand-700">
		{#each faq as point}
			<div class="py-8 first:pt-0 last:pb-0">
				<div class="flex gap-x-5">
					<svg
						class="flex-shrink-0 mt-1 w-6 h-6 text-brand-500"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path
							d="M12 17h.01"
						/></svg
					>

					<div>
						<h3 class="md:text-lg font-semibold text-brand-800 dark:text-brand-200">
							{point.q}
						</h3>
						<p class="mt-1 text-brand-500">
							{point.a}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
<!-- End FAQ -->

<footer class="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
	<!-- Grid -->
	<div class="text-center">
		<div>
			<a
				class="flex-none text-xl font-semibold text-black dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
				href="/"
				aria-label="Brand">RSGuessr</a
			>
		</div>
		<!-- End Col -->

		<div class="mt-3">
			<p class="text-brand-500">© RSGuessr 2024. All rights reserved.</p>
		</div>

		<!-- Social Brands -->
		<div class="mt-3 space-x-2">
			<a
				class="inline-flex justify-center items-center w-10 h-10 text-center text-brand-500 hover:bg-brand-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-brand-500 dark:hover:text-brand-200 dark:hover:bg-brand-800"
				href="https://appwrite.io/"
				target="_blank"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="112"
					height="98"
					fill="currentColor"
					class="flex-shrink-0 w-3.5 h-3.5"
					viewBox="0 0 112 98"
					><path
						fill="currentColor"
						d="M111.1 73.473v24.49H48.87c-18.13 0-33.96-9.849-42.429-24.49A48.683 48.683 0 0 1 0 52.293V45.67a48.52 48.52 0 0 1 1.732-10.048C7.545 15.064 26.448 0 48.871 0c22.422 0 41.323 15.064 47.136 35.623H69.398C65.03 28.922 57.47 24.491 48.872 24.491c-8.599 0-16.16 4.43-20.528 11.132a24.262 24.262 0 0 0-3.042 6.68 24.488 24.488 0 0 0-.921 6.679c0 7.02 2.952 13.348 7.685 17.811a24.39 24.39 0 0 0 16.806 6.68H111.1"
					/><path
						fill="currentColor"
						d="M111.1 42.303v24.49H65.676a24.406 24.406 0 0 0 7.686-17.81c0-2.316-.321-4.556-.922-6.68h38.66"
					/></svg
				>
			</a>
			<a
				class="inline-flex justify-center items-center w-10 h-10 text-center text-brand-500 hover:bg-brand-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-brand-500 dark:hover:text-brand-200 dark:hover:bg-brand-800"
				href="https://github.com/meldiron/rsguessr"
				target="_blank"
			>
				<svg
					class="flex-shrink-0 w-3.5 h-3.5"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
					/>
				</svg>
			</a>
		</div>
		<!-- End Social Brands -->
	</div>
	<!-- End Grid -->
</footer>
