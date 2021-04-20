<script>
    // Page Components
    import Header from '$lib/Header/Header.svelte';
    import Introduction from '$lib/Introduction/Introduction.svelte';

    // Utility Components
    import Intersection from '$lib/utils/tools/Intersection.svelte';
    import Spacing from '$lib/utils/tools/Spacing.svelte';

    let scrolled;
</script>

<svelte:head>
    <meta charset="UTF-8" />

    <title>Home | Sidney Spanish Club</title>
</svelte:head>

<Header id={scrolled ? 'scrolled' : ''} />
<Intersection
    on:intersecting={() => (scrolled = false)}
    on:not-intersecting={() => (scrolled = true)}
/>

<Spacing margin="2rem" />

<Introduction />

<style style lang="postcss">
    :global(body) {
        height: 200vh;
        background-color: white;
    }
</style>
