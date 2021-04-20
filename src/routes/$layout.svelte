<script>
    import '../app.postcss';
    import Header from '$lib/Header/Header.svelte';
    import Intersection from '$lib/utils/tools/Intersection.svelte';
    import Spacing from '$lib/utils/tools/Spacing.svelte';

	let scrolled = false;
</script>

<Header id={scrolled ? 'scrolled' : ''} />
<Intersection
    on:intersecting={() => (scrolled = false)}
    on:not-intersecting={() => (scrolled = true)}
/>

<Spacing margin="2rem" />
<slot />
