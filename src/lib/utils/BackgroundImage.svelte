<script>
    export let attachment = 'background-fixed';
    export let src;
    export let opacity = '100';
</script>

<div class="BackgroundImage">
    <div
        class="{attachment} h-full w-full"
        style="background-image: url({src}); opacity: {opacity}"
    />
</div>

<style>
    .BackgroundImage {
        @apply absolute top-0 left-0;
        @apply w-full h-full;

        z-index: -10;
    }

    .BackgroundImage div {
        @apply bg-cover bg-no-repeat;
        @apply opacity-20;

        background-position: 50% 50%;
    }
</style>
