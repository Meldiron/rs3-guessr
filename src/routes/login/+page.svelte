<script lang="ts">
	import { Client, Account, ID } from 'appwrite';

	const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject('rs3-guessr');

	const account = new Account(client);

	let email: string = '';

	function createMagicURLSession() {
		const promise = account.createMagicURLSession(ID.unique(), email, 'http://localhost:5173/login-finish');

		promise.then(
			function (response) {
				console.log(response);
			},
			function (error) {
				console.log(error);
			}
		);
	}
</script>

<main class="w-full max-w-md mx-auto p-6">
	<div class="mt-7 border border-brand-200 rounded-xl shadow-sm dark:border-brand-700">
		<div class="p-4 sm:p-7">
			<div class="text-center">
				<h1 class="block text-2xl font-bold text-brand-800 dark:text-white">
					Log in to your Account
				</h1>
			</div>

			<div class="mt-5">
				<!-- Form -->
				<form on:submit={createMagicURLSession}>
					<div class="grid gap-y-4">
						<!-- Form Group -->
						<div>
							<div class="relative">
								<input
									bind:value={email}
									placeholder="Email address"
									type="email"
									id="email"
									name="email"
									class="py-3 px-4 border bg-brand-950 block w-full border-brand-700 placeholder-brand-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-brand-700 text-white dark:focus:ring-brand-600"
									required
									aria-describedby="email-error"
								/>
								<div
									class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3"
								>
									<svg
										class="h-5 w-5 text-red-500"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
										aria-hidden="true"
									>
										<path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
										/>
									</svg>
								</div>
							</div>
						</div>
						<!-- End Form Group -->

						<button
							type="submit"
							class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-brand-600"
							>Continue with Email</button
						>
					</div>
				</form>
				<!-- End Form -->
			</div>
		</div>
	</div>
</main>
