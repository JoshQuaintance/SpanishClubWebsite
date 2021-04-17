<script>
    import RouterLink from './RouterLink.svelte';
    import Spacing from '$lib/utils/Spacing.svelte';

    export let id;
</script>

<!-- ---- -->

<header {id}>
    <div id="header-left-col">
        <a href="/">
            <img
                id="header-logo"
                style="height: 4em;"
                src="src/assets/logos/main.svg"
                alt="Main Logo"
            />
        </a>

            <Spacing margin=".55em" />

        <a href="/">
            <h1 id="header-title" class="font-bold text-2xl">SHS Spanish Club</h1>
        </a>
    </div>

    <div id="header-right-col">
        <ul class="flex flex-row justify-space-around">
            <RouterLink href="/">Home</RouterLink>

            <RouterLink href="/">Event List</RouterLink>

            <RouterLink href="/">Contacts</RouterLink>

            <RouterLink href="/join">Log In</RouterLink>
        </ul>
    </div>
</header>

<!-- ---- -->
<style style lang="postcss">
    a {
        text-decoration: none;
        color: inherit;
    }

    header {
        @apply fixed top-0;
        @apply flex flex-row justify-between items-center;
        @apply p-6 h-20 w-full text-sm;
        @apply bg-gray-50 shadow-lg transition-all duration-300;
        @apply rounded-b-lg;
        @apply z-50;

        border-bottom: 1px solid #e6e6e6;
    }

    header#scrolled {
        @apply shadow-2xl;
        @apply bg-opacity-80;
        @apply h-16 text-xs;
    }

    /* Left Column */
    header #header-left-col {
        @apply flex flex-row justify-start items-center;
    }

    header #header-left-col a h1#header-title {
        @apply text-lg;

        font-family: 'Jost', sans-serif;
    }

    /* Right Column */
    header #header-right-col {
        @apply flex flex-row justify-center items-center;
    }

    /* Custom Reuseable CSS */
</style>
