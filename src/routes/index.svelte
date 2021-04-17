<script>
    // Page Components
    import Header from '$lib/Header/Header.svelte';
    import Introduction from '$lib/Introduction/Introduction.svelte';

    // Utility Components
    import Intersection from '$lib/utils/Intersection.svelte';
    import Spacing from '$lib/utils/Spacing.svelte';

    let scrolled;
</script>

<svelte:head>
    <meta charset="UTF-8" />

    <title>SHS Spanish Club</title>
</svelte:head>

<Header id={scrolled ? 'scrolled' : ''} />
<Intersection
    on:intersecting={() => (scrolled = false)}
    on:not-intersecting={() => (scrolled = true)}
/>

<Introduction />

<style style lang="postcss">
    :global(body) {
        height: 200vh;
        background-color: white;
    }
</style>
