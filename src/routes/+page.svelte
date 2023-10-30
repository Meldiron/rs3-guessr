<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let showMap = false;
	let location = null;

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
				location = e.latlng;
			}
			runescape_map.on('click', addMarker);
		}
	});
</script>

<div class="absolute inset-0 z-[10]">
	<img src="/location.png" alt="" class="object-cover object-center w-full h-full" />
</div>

<div class="mx-auto max-w-5xl flex flex-col space-y-4 z-[20] relative">
	<div class="bg-stone-50 text-stone-800 p-4 shadow-md rounded-b-lg shadow-lg">
		<header>
			<h1 class="font-bold text-2xl">RS3 Guessr</h1>
		</header>
	</div>

	<div class="mx-auto">
		{#if !showMap}
			<button
				on:click={() => (showMap = true)}
				class="py-2 shadow-lg px-10 rounded-full shadow-md bg-stone-50 text-black font-bold"
				>Show Map</button
			>
		{:else}
			<button
				on:click={() => (showMap = false)}
				class="py-2 shadow-lg px-10 rounded-full shadow-md bg-stone-50 text-black font-bold"
				>Hide Map</button
			>
		{/if}
	</div>

	{#if location}
		<div class="mx-auto">
			<button class="py-2 shadow-lg px-10 rounded-full shadow-md bg-blue-500 text-white font-bold"
				>Confirm Guess</button
			>
		</div>
	{/if}
</div>

<div class={`absolute inset-0 z-[15] ${showMap ? '' : 'pointer-events-none'}`} style={`opacity: ${showMap ? '100%' : '0%'}`}>
	<div id="map" class="w-full h-full" />
</div>
