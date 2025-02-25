# CIDR Calculator

A small, self-hosted CIDR calculator.

Most of the top search results for "CIDR Calculator" take a specific, pre-existing range. However,
I often use CIDR notation when I need to find the range for a set of IP
addresses, and I don't necessarily know the start and end of the range.

This app provides a text box where you can paste a set of IP addresses. A regex
divides the IP's, and then they are parsed into the smallest range using
https://github.com/vasturiano/ip.js/

You are welcome to use the demo available here: https://moerner.com/cidr-calc.

I implemented this twice, once in React and once in Svelte

This project is licensed under the Unlicense.
