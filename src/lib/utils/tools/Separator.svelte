<script>
    export let margin;

    // 0 - Horizontal | 1 - Vertical
    export let direction = 0;
    export let length;
    export let color;
    export let thick;

    let widthOrHeight = direction == 0 ? `min-width: ${length}` : `min-height: ${length}`;
</script>

<span
    class="separator"
    style="{widthOrHeight}; margin: {margin}; border-color: {color}; border-width: {thick};"
/>

<style>
    .separator {
        border: solid 3px black;
        border-radius: 15px;
    }
</style>
