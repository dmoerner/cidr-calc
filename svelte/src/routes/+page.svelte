<script lang="ts">
	import { Addr, Range } from "ip.js";

	let value = $state("");
	let result = $state("");

	function calculateRange(input: string): string {
		// https://stackoverflow.com/a/36760050
		const re = /(?:(?:25[0-5]|(?:2[0-4]|1\d|[1-9]|)\d)\.?){4}/g;
		const ips = [...input.matchAll(re)].map(
			(ip) => new Addr(ip[0]),
		);
		if (ips.length === 0) {
			return "";
		}

		let max = ips[0];
		let min = ips[0];
		for (const ip of ips) {
			const minComp = ip.compare2Ip(min);
			const maxComp = ip.compare2Ip(max);
			if (minComp && minComp < 0) min = ip;
			if (maxComp && maxComp > 0) max = ip;
		}
		const range = new Range(min, max);

		const prefix = range.toEncompassingPrefix();

		return prefix.toString();
	}
</script>

<div class="container">
	<h1>CIDR Calculator</h1>

	<p>
		Enter a set of IPv4 addresses in the text box below. They may be
		separated by any reasonable separator (newline, comma,
		semicolon, etc.). This tool will find the smallest CIDR range
		that covers them all. The code can be found on <a
			href="https://github.com/dmoerner/cidr-calc/">Github</a
		>.
	</p>

	<textarea bind:value rows={10} cols={40}></textarea>
	<div>
		<button
			onclick={() => {
				result = calculateRange(value);
			}}>Calculate CIDR Range</button
		>
	</div>
	<div class="result">{result}</div>
</div>

<style>
	.container {
		font-family: Inter, system-ui, Avenir, Helvetica, Arial,
			sans-serif;
		line-height: 1.5;
		font-weight: 400;
		max-width: 1280px;
		margin: 0 auto;
		padding: 2em;
		text-align: center;

		color-scheme: light dark;
		color: rgba(255, 255, 255, 0.87);
		background-color: #242424;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	a {
		font-weight: 500;
		color: #646cff;
		text-decoration: inherit;
	}
	a:hover {
		color: #535bf2;
	}

	h1 {
		font-size: 3.2em;
		line-height: 1.1;
	}

	textarea {
		border-radius: 4px;
		resize: none;
	}

	.result {
		padding: 2em;
		font-size: 1.5em;
	}

	button {
		border-radius: 8px;
		border: 1px solid;
		padding: 0.6em 1.2em;
		margin: 2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: #1a1a1a;
		cursor: pointer;
		transition: border-color 0.25s;
	}

	button:hover,
	textarea:hover {
		border-color: #646cff;
	}

	@media (prefers-color-scheme: light) {
		:root {
			color: #213547;
			background-color: #ffffff;
		}
		a:hover {
			color: #747bff;
		}
		button,
		textarea {
			background-color: #f9f9f9;
		}
	}
</style>
