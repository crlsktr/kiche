<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailAnchor, LightSwitch } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="{base}/" rel="noreferrer"><strong class="text-xl uppercase">K'iche'</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<button class="btn variant-filled-primary" id="install">Install</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailAnchor
				selected={$page.url.pathname === `${base}`}
				name="tile-home"
				value={0}
				href="{base}/"
			>
				<div class="flex justify-center pb-1">
					<span class="material-symbols-outlined"> home </span>
				</div>
				<span>Home </span>
			</AppRailAnchor>
			<AppRailAnchor
				selected={$page.url.pathname === `${base}/ajilabal`}
				name="tile-ajilabal"
				value={1}
				title="tile-ajilabal"
				href="{base}/ajilabal"
			>
				<div class="flex justify-center pb-1">
					<span class="material-symbols-outlined"> numbers </span>
				</div>
				<span>Ajilab'al</span>
			</AppRailAnchor>
			<AppRailAnchor
				selected={$page.url.pathname === `${base}/natajem`}
				name="tile-natajem"
				value={1}
				title="tile-natajem"
				href="{base}/natajem"
			>
				<div class="flex justify-center pb-1">
					<span class="material-symbols-outlined"> sync_alt </span>
				</div>
				<span>Na'tajem</span>
			</AppRailAnchor>
			<AppRailAnchor
				selected={$page.url.pathname === `${base}/numericsystem`}
				name="tile-numericsystem"
				value={1}
				title="tile-numericsystem"
				href="{base}/numericsystem"
			>
				<div class="flex justify-center pb-1">
					<span class="material-symbols-outlined"> pin </span>
				</div>
				<span>Ajilab'al 2</span>
			</AppRailAnchor>
			<!-- --- -->
			<svelte:fragment slot="trail">
				<AppRailAnchor href="https://github.com/crlsktr/kiche" target="_blank" title="Account">
					<div class="flex justify-center pb-1">
						<svg
							role="img"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><title>GitHub</title>
							<path
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
							/>
						</svg>
					</div>
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="text-right">
			Hecho con ❤️ y con Svelte-kit, <a
				class="text-secondary-500 inline"
				href="https://creativecommons.org/publicdomain/zero/1.0/">CC0-1.0 license</a
			>
		</div>
	</svelte:fragment>
</AppShell>

<style lang="postcss">
	svg {
		@apply scale-150 fill-surface-100;
		display: block;
	}
</style>
