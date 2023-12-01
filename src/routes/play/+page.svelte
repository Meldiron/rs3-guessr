<script>
	let showMap = false;

	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			var markersGroup = L.layerGroup();

			L.TileLayer.Game = L.TileLayer.extend({
				getTileUrl: function (coords) {
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

			function addMarker(e) {
				markersGroup.clearLayers();

				L.marker(e.latlng).addTo(markersGroup);
			}
			runescape_map.on('click', addMarker);
		}
	});
</script>

<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<!-- Title -->
	<div class="mx-auto mb-8 lg:mb-14 text-center">
		<h2 class="text-3xl lg:text-6xl text-brand-800 font-bold dark:text-white">Secret Tea</h2>
		<p class="mt-3 mb-6 text-brand-800 dark:text-brand-500">Added 1.12.2023 by Meldiron</p>

		<!-- Buttons -->
		<div class="mt-8 gap-3 flex justify-center">
			<button
				type="button"
				class="inline-flex justify-center items-center gap-x-3 text-center bg border border-brand-700 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4"
			>
				Show Hint
			</button>

			<button
				type="button"
				on:click={() => (showMap = !showMap)}
				class="inline-flex justify-center items-center gap-x-3 text-center bg border border-transparent bg-white text-brand-950 text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200 py-3 px-4"
			>
				{#if showMap}
					Switch to Picture
				{:else}
					Switch to Map
				{/if}
			</button>
		</div>

		<div class="mt-12">
			<img
				src="/location.png"
				alt="Location"
				class={`w-full rounded-2xl ${showMap ? 'hidden' : 'block'}`}
			/>

            <div class={`w-full rounded-2xl overflow-hidden ${showMap ? 'opacity-100' : 'opacity-0'}`} style={`height: ${showMap ? 'auto' : '0px'}`}>
                <div class="rounded-2xl" id="map" style="height: 700px;" />
            </div>
			
		</div>
	</div>
	<!-- End Title -->
</div>
