<script>
    export let href;
</script>

<li class="router-link">
    <a class="router-link-item" {href}><slot>Route</slot></a>
</li>

<style style lang="postcss">
    .router-link {
        @apply hover:text-blue-500 hover:bg-opacity-60;
        @apply transition-all duration-300 ease-out;
        @apply flex justify-center items-center;
        @apply rounded-md cursor-pointer;

        margin: 0 0.5rem;
    }

    .router-link-item {
        @apply font-bold text-lg;
        @apply relative;

        padding: 0 0.3rem !important;
        margin: 0.665em !important;
    }

    .router-link-item::after {
        @apply absolute;
        @apply transition-all duration-300 ease-in-out;
        @apply border-blue-400 border-2 border-solid;

        content: '';
        color: black;
        bottom: -4px;
        border-radius: 15px;
        width: 0px;
        opacity: 0;
        right: 50%;
        transform: translateX(51%);
    }

    .router-link:hover .router-link-item::after {
        width: 100%;
        opacity: 1;
    }
</style>
