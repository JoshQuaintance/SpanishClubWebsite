<script>
    import RouterLink from './RouterLink.svelte';
</script>

<!-- ---- -->

<header>
    <div id="header-left-col">
        <a href="/">
            <img
                id="header-logo"
                class="w-auto h-16"
                src="src/assets/logos/main.svg"
                alt="Main Logo"
            />
        </a>

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
        @apply fixed;
        @apply top-0;
        @apply flex flex-row justify-around items-center;
        @apply h-20 w-full;
        @apply bg-gray-100 shadow-2xl;

        border-bottom: 1px solid #e6e6e6;
    }

    /* Left Column */
    header #header-left-col {
        @apply flex flex-row justify-start items-center;
    }

    header #header-left-col a h1#header-title {
        font-family: 'Jost', sans-serif;
    }

    /* Right Column */
    header #header-right-col {
        @apply flex flex-row justify-center items-center;
    }

    /* Custom Reuseable CSS */
</style>
