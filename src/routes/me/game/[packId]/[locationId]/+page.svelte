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
	let showHint = false;
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

	function toggleHint() {
		showHint = !showHint;
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

			alert("Correct!");
			goto('/me/game/' + data.pack.$id);
		} catch (err: any) {
			alert(err.message);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Title -->
	<div class="mx-auto mb-8 lg:mb-14 text-center">
		<div class="w-full justify-center flex">
			<a
				href={`/me/game/${data.pack.$id}`}
				class="text-brand-500 font-bold text-lg flex space-x-2 hover:text-brand-300 w-[fit-content] items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
				</svg>

				<p>Go Back</p></a
			>
		</div>
		<h2 class="text-3xl lg:text-6xl my-6 text-brand-800 font-bold dark:text-white">
			Guess the location!
		</h2>
		<p class="mt-3 mb-6 text-xl text-brand-400">{data.pack.name} Pack</p>

		<!-- Buttons -->
		<div class="mt-8 gap-3 flex justify-center">
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
					on:click={() => (showMap = !showMap)}
					class="inline-flex justify-center items-center gap-x-3 text-center bg border border-transparent bg-white text-brand-950 text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:bg-brand-100"
				>
					Switch to Map
				</button>
			{/if}
		</div>

		<div class="mt-12">
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

		<div class="mt-12">
			<button
				type="button"
				class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4 hover:border-brand-400"
				on:click={toggleHint}
			>
				Show Hint
			</button>
		</div>
	</div>
	<!-- End Title -->
</div>

{#if showHint}
	<div
		class="w-full h-full fixed top-0 start-0 z-[500] overflow-x-hidden overflow-y-auto bg-black bg-opacity-50"
	>
		<div
			class="mt-12 opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
		>
			<div
				class="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-black dark:border-brand-700"
			>
				<div class="absolute top-2 end-2">
					<button
						on:click={toggleHint}
						type="button"
						class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-brand-800 hover:bg-brand-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-brand-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
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

				<div class="p-4 sm:p-10 overflow-y-auto">
					<div class="text-center">
						<h3 class="mb-2 text-xl font-bold text-brand-800 dark:text-brand-200">Hint</h3>
						<p class="text-brand-50">{data.location.hint}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
