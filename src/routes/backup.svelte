<script>
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

<div class="bg-white p-4 shadow-md">
	<div class="mx-auto max-w-5xl">
		<header>
			<h1 class="font-bold text-2xl">RS3 Guessr</h1>
		</header>
	</div>
</div>

<div class="mx-auto max-w-5xl">
	<div class="mt-6 shadow-xl rounded-2xl aspect-video">
		<img
			src="/location.png"
			alt=""
			class="shadow-xl object-cover object-center w-full h-full rounded-2xl"
		/>
	</div>
</div>

<div class="absolute bottom-0 w-full left-0">
	<div class="relative mx-auto max-w-5xl">
		<div class=" translate-y-[600px] hover:translate-y-[0px] transition-all duration-300">
			<div class="z-[20] absolute bottom-6 left-0 w-full flex justify-center">
				<button class="py-2 px-10 rounded-full shadow-md bg-white text-black font-bold"
					>Confirm Guess</button
				>
			</div>

			<div class="rounded-t-2xl z-[10]" id="map" style="height: 700px;" />
		</div>
	</div>
</div>
