<script>
    import IntersectionObserver from 'svelte-intersection-observer';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let intersecting;
    let element;
    
    // If the variable intersecting is true, then dispatch the 'intersecting event'
    $: if (intersecting) dispatch('intersecting')
    else dispatch('not-intersecting')
    
</script>

<IntersectionObserver {element} bind:intersecting>
    <div class="h-1 intersection" bind:this={element}></div>
</IntersectionObserver>
