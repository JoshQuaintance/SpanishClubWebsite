<script>
    import BackgroundImage from '../utils/components/BackgroundImage.svelte';
    import Spacing from '../utils/tools/Spacing.svelte';
    import FancyLink from '../utils/components/FancyLink.svelte';
    import Separator from '../utils/tools/Separator.svelte';
</script>

<section id="introduction">
    <div class="container">
        <h1 id="title-call-to-action">¡Bienvenido!</h1>

        <Spacing margin="3.25rem" />

        <p class="short-desc">
            Welcome to the Official Website for <FancyLink
                href="http://www.sidneycityschools.org/"
                target="_blank">Sidney High School</FancyLink
            > Spanish Club. <br /><br />

            Here you can find lists of upcoming events, current year officers, and
            <br /> other resources related to the Sidney High School Spanish club Program
        </p>

        <Separator margin="1.5rem" length="2.5rem" direction="0" thick="2.7px" />

        <p class="short-desc spanish">
            Bienvenido al sitio web oficial del Club de español de <FancyLink
                href="http://www.sidneycityschools.org/"
                target="_blank">Sidney High School</FancyLink
            >. <br /><br />

            Aquí puede encontrar listas de próximos eventos, oficiales del año en curso y otros
            <br />recursos relacionados con el Programa de clubes de español de Sidney High School.
        </p>
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
        @apply flex flex-col justify-around;
        @apply w-full;
    }

    div > #title-call-to-action {
        @apply text-7xl font-black;

        font-family: 'Ubuntu Mono', monospace;
    }

    div > .short-desc {
        @apply text-xl text-center;

        font-weight: 500;
        font-family: 'Ubuntu Mono', monospace;
    }
</style>
