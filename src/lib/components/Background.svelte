<script lang="ts">
	let width = $state(0);
	let height = $state(0);

	let targetX = $state(0);
	let targetY = $state(0);
	let currentX = $state(0);
	let currentY = $state(0);

	$effect(() => {
		if (width && height) {
			targetX = width / 2;
			targetY = height / 2;
			currentX = width / 2;
			currentY = height / 2;
		}

		let frame: number;
		function loop() {
			currentX += (targetX - currentX) * 0.1;
			currentY += (targetY - currentY) * 0.1;
			frame = requestAnimationFrame(loop);
		}
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	});

	function handleMouseMove(e: MouseEvent) {
		targetX = e.clientX;
		targetY = e.clientY;
	}

	const transform = $derived(
		`translate(${(currentX - width / 2) / 10}px, ${(currentY - height / 2) / 10}px) rotateX(${
			(currentY - height / 2) / 40
		}deg) rotateY(${(currentX - width / 2) / 40}deg)`
	);
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} onmousemove={handleMouseMove} />

<div
	class="pointer-events-none fixed top-0 left-0 -z-10 h-lvh w-full overflow-hidden bg-background"
	style=""
>
	<div class="absolute inset-0 h-lvh" style:transform style="">
		<div class="blob blob-orange-1"></div>
		<div class="blob blob-orange-2"></div>
		<div class="blob blob-orange-3"></div>
	</div>

	<div
		class="grain-bg pointer-events-none absolute inset-0 h-lvh opacity-[0.25] mix-blend-overlay"
	></div>
</div>

<style lang="postcss">
	@reference '../../routes/layout.css';

	.grain-bg {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
	}

	.blob {
		@apply absolute;
		width: 80vw;
		height: 80vh;
		min-width: 600px;
		min-height: 600px;
		top: 10vh;
		left: 10vw;
		filter: blur(50px);
		opacity: 0.8;
		will-change: transform;
	}

	.blob-orange-1 {
		background: radial-gradient(
			circle at center,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 122, 48, 0.8) 20%,
			transparent 60%
		);
		animation:
			float-1 29s infinite ease-in-out,
			squish 13s infinite alternate ease-in-out;
	}

	.blob-orange-2 {
		background: radial-gradient(
			circle at center,
			rgba(255, 255, 255, 0.3) 0%,
			rgba(255, 122, 48, 0.7) 20%,
			transparent 60%
		);
		animation:
			float-2 31s infinite ease-in-out,
			squish 17s infinite alternate ease-in-out;
	}

	.blob-orange-3 {
		background: radial-gradient(
			circle at center,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 122, 48, 0.6) 20%,
			transparent 60%
		);
		animation:
			float-3 23s infinite ease-in-out,
			squish 11s infinite alternate ease-in-out;
	}

	@keyframes float-1 {
		0% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(35vw, 5vh) scale(1.1);
		}
		50% {
			transform: translate(25vw, 35vh) scale(0.9);
		}
		75% {
			transform: translate(-10vw, 20vh) scale(1.05);
		}
		100% {
			transform: translate(0, 0) scale(1);
		}
	}

	@keyframes float-2 {
		0% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(-20vw, 30vh) scale(0.95);
		}
		50% {
			transform: translate(15vw, 40vh) scale(1.1);
		}
		75% {
			transform: translate(35vw, -10vh) scale(0.85);
		}
		100% {
			transform: translate(0, 0) scale(1);
		}
	}

	@keyframes float-3 {
		0% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(20vw, -20vh) scale(1.15);
		}
		50% {
			transform: translate(-15vw, -10vh) scale(0.9);
		}
		75% {
			transform: translate(-30vw, 30vh) scale(1.05);
		}
		100% {
			transform: translate(0, 0) scale(1);
		}
	}

	@keyframes squish {
		0% {
			border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
		}
		50% {
			border-radius: 40% 60% 60% 40% / 60% 50% 50% 40%;
		}
		100% {
			border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
		}
	}
</style>
