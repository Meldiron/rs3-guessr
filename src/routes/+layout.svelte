<script>
	import '../app.css';
</script>

<!-- ========== HEADER ========== -->
<header class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
	<nav
		class="mt-6 relative max-w-[85rem] w-full border rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:border-brand-600"
		aria-label="Global"
	>
		<div class="flex items-center justify-between">
			<a class="flex-none text-xl font-semibold dark:text-white" href="/" aria-label="Brand"
				>RS3 Guessr</a
			>
			<div class="md:hidden">
				<button
					type="button"
					class="hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-brand-200 text-brand-800 hover:bg-brand-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-brand-700 dark:hover:bg-brand-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
					data-hs-collapse="#navbar-collapse-with-animation"
					aria-controls="navbar-collapse-with-animation"
					aria-label="Toggle navigation"
				>
					<svg
						class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line
							x1="3"
							x2="21"
							y1="18"
							y2="18"
						/></svg
					>
					<svg
						class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
		</div>
		<div
			id="navbar-collapse-with-animation"
			class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
		>
			<div
				class="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7"
			>
				<a
					class="font-medium text-brand-500 hover:text-brand-400 md:py-6 dark:text-brand-400 dark:hover:text-brand-500"
					href="/packs">Play Game</a
				>

				<a
					href="/login"
					class="flex items-center gap-x-2 font-medium text-brand-500 hover:text-blue-600 md:border-s md:border-brand-300 md:my-6 md:ps-6 dark:border-brand-700 dark:text-brand-400 dark:hover:text-blue-500"
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
						stroke-linejoin="round"
						><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle
							cx="12"
							cy="7"
							r="4"
						/></svg
					>
					Log in
				</a>
			</div>
		</div>
	</nav>
</header>
<!-- ========== END HEADER ========== -->

<slot />
