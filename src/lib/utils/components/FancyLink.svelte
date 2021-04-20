<script>
    export let href;
    export let target;
</script>

<a class="fancy-link" {href} {target}>
    <slot />
</a>

<style>
    .fancy-link {
        @apply relative cursor-pointer;

        color: rgba(0, 47, 255, 0.9);
    }

    .fancy-link::after {
        @apply absolute rounded-sm;

        content: '';
        z-index: -1;
        opacity: 65%;
        height: 30%;
        width: 3%;
        left: -1px;
        bottom: 0px;
        background-color: rgba(0, 174, 255, 0.658);
        transition: width .3s ease, height .3s ease-in-out .3s;
    }

    .fancy-link:hover::after {
        height: 100%;
		width: calc(100% + 2px);
		transition: width .3s ease .3s, height .3s ease-in-out;
    }
</style>
