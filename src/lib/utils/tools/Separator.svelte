<script>
    export let margin;

    // 0 - Horizontal | 1 - Vertical
    export let direction = 0;
    export let length;
    export let color;
    export let thick;

    let widthOrHeight = direction == 0 ? `width: ${length} ` : `height: ${length};`;
</script>

<!-- {direction == 0 ? 'w-full' : 'h-full'} -->
<div class="separator-container relative">
    <span
        class="separator inline-block"
        style="{widthOrHeight}; margin: {margin}; border-color: {color}; border-width: {thick};"
    />
</div>

<style>

    @keyframes separator-anim {
        from {
            width: 0;
            height: 0;
        }
    }
    .separator {
        @apply text-center;

        border: solid 3px black;
        border-radius: 15px;
        animation: separator-anim .7s ease-in-out forwards;
    }
</style>
