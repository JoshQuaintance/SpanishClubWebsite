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
            > Spanish Club. <br />

            <Separator margin="1rem" length="2rem" direction="0" thick="2.7px" />

            Here you can find lists of upcoming events, current year officers, and
            <br /> other resources related to the Sidney High School Spanish club Program
        </p>

        <Spacing margin="1.5rem" />

        <a href="#CHANGE_ME" class="flex justify-center">
            <img
                src="src/assets/heroicons/chevron-double-down.svg"
                alt="chevron-double-down"
                class="h-12"
                id="title-chevron-down"
            />
        </a>
        
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
        @apply text-center;
    }

    div.container > #title-call-to-action {
        @apply text-7xl font-black;

        font-family: 'Ubuntu Mono', monospace;
    }

    div.container > .short-desc {
        @apply text-xl;

        font-weight: 500;
        font-family: 'Ubuntu Mono', monospace;
    }

    @keyframes title-up-down {
        0% {
            transform: translateY(-15px);
        }

        50% {
            transform: translateY(15px);
        }

        100% {
            transform: translateY(-15px);
        }
    }
    #title-chevron-down {
        animation: 3.5s title-up-down cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
    }
</style>
