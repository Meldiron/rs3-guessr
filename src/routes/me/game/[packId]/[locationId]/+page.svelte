<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { functions, storage } from '$lib/appwrite';
	import { goto } from '$app/navigation';

	// @ts-ignore
	declare const L: any;

	export let data: PageData;

	const imageUrl = storage.getFilePreview('locationImages', data.location.imageId).toString();

	let showMap = false;
	let showInfo = false;
	let showHint = false;
	let showResults = false;
	let results: any = {};
	let pickedLocation: any = null;

	onMount(() => {
		if (browser) {
			var icon = L.icon({
				iconUrl: '/marker.png',
				iconSize: [41, 50],
				iconAnchor: [20, 50]
			});

			var markersGroup = L.layerGroup();

			L.TileLayer.Game = L.TileLayer.extend({
				getTileUrl: function (coords: any) {
					return L.Util.template(
						'https://mejrs.github.io/layers_rs3/mapsquares/-1/{z}/0_{x}_{y}.png',
						{
							z: coords.z,
							x: coords.x,
							y: -(1 + coords.y)
						}
					);
				}
			});
			L.tileLayer.game = function () {
				return new L.TileLayer.Game();
			};

			let runescape_map = L.map('map', {
				crs: L.CRS.Simple,
				x: 3200,
				y: 3200,
				minZoom: 0,
				maxZoom: 3
			}).setView([3200, 3200], 2);

			L.tileLayer
				.game('https://mejrs.github.io/layers_rs3/mapsquares/-1/{z}/0_{x}_{y}.png', {
					minZoom: 0,
					maxNativeZoom: 3,
					maxZoom: 3,
					noWrap: true
				})
				.addTo(runescape_map)
				.bringToBack();

			runescape_map.addLayer(markersGroup);

			function addMarker(e: any) {
				markersGroup.clearLayers();

				console.log(e.latlng.lat + '_' + e.latlng.lng);

				L.marker(e.latlng, { icon: icon }).addTo(markersGroup);
				pickedLocation = e.latlng;
			}
			runescape_map.on('click', addMarker);
		}
	});

	function toggleInfo() {
		showInfo = !showInfo;
	}

	function toggleHint() {
		showHint = !showHint;
	}

	function toggleResults() {
		showResults = !showResults;
	}

	let isSubmitting = false;
	async function submitLocation() {
		if (isSubmitting) {
			return;
		}

		isSubmitting = true;

		try {
			const response = await functions.createExecution(
				'guessLocation',
				JSON.stringify({
					locationId: data.location.$id,
					lat: pickedLocation.lat,
					lng: pickedLocation.lng
				}),
				undefined,
				undefined,
				undefined,
				{
					'content-type': 'application/json'
				}
			);

			if (response.status !== 'completed') {
				throw new Error(response.responseBody);
			}

			const body = JSON.parse(response.responseBody);
			if (!body.ok) {
				throw new Error(body.message);
			}

			if (body.correct) {
				results = {
					type: 'correct',
					hardMode: body.hardMode
				};
			} else {
				results = {
					type: 'wrong'
				};
			}
		} catch (err: any) {
			results = {
				type: 'error',
				message: err.message
			};
		} finally {
			isSubmitting = false;
			showResults = true;
		}
	}
</script>

<div class="max-w-[85rem] px-4 pt-10 sm:px-6 lg:px-8 lg:p5-14 mx-auto">
	<!-- Title -->
	<div class="mx-auto text-center">
		<!-- Buttons -->
		<div class="-mt-4 gap-3 flex justify-center">
			<a
				href={`/me/game/${data.pack.$id}`}
				class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:border-brand-400"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-3 h-3"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
				</svg>
			</a>

			{#if showMap}
				<button
					type="button"
					class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:border-brand-400"
					on:click={() => (showMap = !showMap)}
				>
					Back to Picture
				</button>

				{#if pickedLocation}
					<button
						on:click={submitLocation}
						disabled={isSubmitting}
						type="button"
						class="disabled:opacity-50 inline-flex justify-center items-center gap-x-3 text-center bg border border-transparent bg-white text-brand-950 text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:bg-brand-100"
					>
						{isSubmitting ? 'Submitting...' : 'Submit Guess'}
					</button>
				{/if}
			{:else}
				<button
					type="button"
					class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:border-brand-400"
					on:click={toggleHint}
				>
					Show Hint
				</button>

				<button
					type="button"
					on:click={() => (showMap = !showMap)}
					class="inline-flex justify-center items-center gap-x-3 text-center bg border border-transparent bg-white text-brand-950 text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:bg-brand-100"
				>
					Switch to Map
				</button>
			{/if}

			<button
				type="button"
				on:click={toggleInfo}
				class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:border-brand-400"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 text-brand-500"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
					/>
				</svg>
			</button>
		</div>

		<div class="mt-6 border border-brand-700 rounded-2xl">
			<img
				src={imageUrl}
				alt="Location"
				class={`w-full rounded-2xl ${showMap ? 'hidden' : 'block'}`}
			/>

			<div
				class={`w-full rounded-2xl overflow-hidden ${showMap ? 'opacity-100' : 'opacity-0'}`}
				style={`height: ${showMap ? 'auto' : '0px'}`}
			>
				<div class="rounded-2xl" id="map" style="height: 700px;" />
			</div>
		</div>
	</div>
	<!-- End Title -->
</div>

{#if showHint}
	<div
		class="bg-black bg-opacity-80 w-full h-full fixed top-0 start-0 z-[500] overflow-x-hidden overflow-y-auto"
	>
		<div
			class="mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center"
		>
			<div
				class="w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-brand-950 dark:border-brand-700 dark:shadow-brand-700/[.7]"
			>
				<div class="flex justify-between items-center py-3 px-4 border-b dark:border-brand-700">
					<h3 class="font-bold text-brand-800 dark:text-white">Hint</h3>
					<button
						on:click={toggleHint}
						type="button"
						class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-brand-800 hover:bg-brand-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-brand-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
					>
						<span class="sr-only">Close</span>
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
							stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
						>
					</button>
				</div>
				<div class="p-4 overflow-y-auto">
					<div
						class="bg-blue-100 border border-blue-200 text-brand-800 rounded-lg p-4 dark:bg-blue-800/25 dark:border-blue-900 dark:text-white"
						role="alert"
					>
						<div class="flex">
							<div class="flex-shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 mt-1 text-blue-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
									/>
								</svg>
							</div>
							<div class="ms-3">
								<h3 class="font-semibold">{data.location.hint}</h3>
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-brand-700">
					<button
						type="button"
						on:click={toggleHint}
						class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-brand-200 bg-white text-brand-800 shadow-sm hover:bg-brand-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-brand-900 dark:border-brand-700 dark:text-white dark:hover:bg-brand-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if showResults}
	<div
		class="bg-black bg-opacity-80 w-full h-full fixed top-0 start-0 z-[500] overflow-x-hidden overflow-y-auto"
	>
		<div
			class="mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center"
		>
			<div
				class="w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-brand-950 dark:border-brand-700 dark:shadow-brand-700/[.7]"
			>
				<div class="flex justify-between items-center py-3 px-4 border-b dark:border-brand-700">
					<h3 class="font-bold text-brand-800 dark:text-white">Game Results</h3>
					<button
						on:click={toggleResults}
						type="button"
						class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-brand-800 hover:bg-brand-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-brand-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
					>
						<span class="sr-only">Close</span>
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
							stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
						>
					</button>
				</div>
				{#if results.type === 'wrong'}
					<div class="p-4 overflow-y-auto">
						<div
							class="bg-red-100 border border-red-200 text-brand-800 rounded-lg p-4 dark:bg-red-800/25 dark:border-red-900 dark:text-white"
							role="alert"
						>
							<div class="flex">
								<div class="flex-shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-4 h-4 mt-1 text-red-500"
									>
										<path
											fill-rule="evenodd"
											d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<div class="ms-3">
									<h3 class="font-semibold">Your guess was incorrect.</h3>
									<div class="mt-2 text-sm text-white opacity-90 leading-relaxed">
										Give it another try! If you feel stuck, you can check a hint.
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-brand-700"
					>
						<a
							href={`/me/game/${data.pack.$id}`}
							class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-brand-200 bg-white text-brand-800 shadow-sm hover:bg-brand-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-brand-900 dark:border-brand-700 dark:text-white dark:hover:bg-brand-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
						>
							Another Location
						</a>
						<button
							on:click={toggleResults}
							type="button"
							class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
						>
							Try Again
						</button>
					</div>
				{:else if results.type === 'correct'}
					<div class="p-4 overflow-y-auto">
						<div
							class={`border text-brand-800 rounded-lg p-4 dark:text-white ${
								results.hardMode
									? 'bg-purple-800/25 border-purple-900'
									: 'bg-green-800/25 border-green-900'
							}`}
							role="alert"
						>
							<div class="flex">
								<div class="flex-shrink-0">
									{#if results.hardMode}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="w-4 h-4 mt-1 text-purple-500"
										>
											<path
												fill-rule="evenodd"
												d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
												clip-rule="evenodd"
											/>
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class={`mt-1 w-4 h-4 text-green-500`}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m4.5 12.75 6 6 9-13.5"
											/>
										</svg>
									{/if}
								</div>
								<div class="ms-3">
									<h3 class="font-semibold">Your guess was correct.</h3>
									<div class="mt-2 text-sm text-white opacity-90 leading-relaxed">
										{#if results.hardMode}
											Amazing! Your guess was perfect and you also completed hardmode.
										{:else}
											Great job! Your guess was good, but to complete hardmode, you must be spot on.
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-brand-700"
					>
						{#if !results.hardMode}
							<button
								type="button"
								on:click={toggleResults}
								class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-brand-200 bg-white text-brand-800 shadow-sm hover:bg-brand-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-brand-900 dark:border-brand-700 dark:text-white dark:hover:bg-brand-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
							>
								Try Again
							</button>
						{/if}
						<a
							href={`/me/game/${data.pack.$id}`}
							class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border text-black border-transparent bg-white hover:bg-brand-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
						>
							Next Location
						</a>
					</div>
				{:else if results.type === 'error'}
					<div class="p-4 overflow-y-auto">
						<div
							class="bg-red-100 border border-red-200 text-brand-800 rounded-lg p-4 dark:bg-red-800/25 dark:border-red-900 dark:text-white"
							role="alert"
						>
							<div class="flex">
								<div class="flex-shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-4 h-4 mt-1 text-red-500"
									>
										<path
											fill-rule="evenodd"
											d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<div class="ms-3">
									<h3 class="font-semibold">Something went wrong.</h3>
									<div class="mt-2 text-sm text-white opacity-90 leading-relaxed">
										{results.message}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-brand-700"
					>
						<button
							on:click={toggleResults}
							type="button"
							class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
						>
							Try Again
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

{#if showInfo}
	<div
		class="bg-black bg-opacity-80 w-full h-full fixed top-0 start-0 z-[500] overflow-x-hidden overflow-y-auto"
	>
		<div
			class="mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center"
		>
			<div
				class="w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-brand-950 dark:border-brand-700 dark:shadow-brand-700/[.7]"
			>
				<div class="flex justify-between items-center py-3 px-4 border-b dark:border-brand-700">
					<h3 class="font-bold text-brand-800 dark:text-white">Info</h3>
					<button
						on:click={toggleInfo}
						type="button"
						class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-brand-800 hover:bg-brand-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-brand-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
					>
						<span class="sr-only">Close</span>
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
							stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
						>
					</button>
				</div>
				<div class="p-4 overflow-y-auto">
					<div
						class="bg-brand-100 border border-brand-200 text-brand-800 rounded-lg p-4 dark:bg-brand-800/25 dark:border-brand-900 dark:text-white"
						role="alert"
					>
						<div class="flex">
							<div class="flex-shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 mt-1 text-brand-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
									/>
								</svg>
							</div>
							<div class="ms-3">
								<h3 class="font-semibold">
									When guessing the location, always guess the location of camera which took the
									screenshot. Your guess can be up to 15 meters off to make correct guess, but to
									make hardmode guess, you can only be up to 5 meters off.
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-brand-700">
					<button
						type="button"
						on:click={toggleInfo}
						class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-brand-200 bg-white text-brand-800 shadow-sm hover:bg-brand-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-brand-900 dark:border-brand-700 dark:text-white dark:hover:bg-brand-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
