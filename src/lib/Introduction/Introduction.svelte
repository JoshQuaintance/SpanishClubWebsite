<script>
    import BackgroundImage from '../utils/BackgroundImage.svelte';
</script>

<section id="introduction">
    <div class="container">
        <h1>¡Bienvenido!</h1>
    </div>

    <BackgroundImage
        src="https://sidneyspanishclub.vercel.app/assets/images/background7.jpg"
        opacity="30%"
    />
</section>

<style style lang="postcss">
    section {
        @apply min-h-screen;
        @apply relative;
        @apply flex flex-col justify-center items-center;
    }

    section > div {
        @apply flex flex-col justify-center items-center;
    }
</style>
