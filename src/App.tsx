import { useState, FormEvent, ChangeEvent } from 'react'
import { Addr, Range } from 'ip.js';

function App() {
  const [result, setResult] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  function calculateRange(input: string): string {
    // https://stackoverflow.com/a/36760050
    const re = /(?:(?:25[0-5]|(?:2[0-4]|1\d|[1-9]|)\d)\.?){4}/g;
    const ips = [...input.matchAll(re)].map((ip) => new Addr(ip[0]));
    if (ips.length === 0) {
      return ""
    }

    let max = ips[0]
    let min = ips[0]
    for (const ip of ips) {
      const minComp = ip.compare2Ip(min);
      const maxComp = ip.compare2Ip(max);
      if (minComp && minComp < 0) min = ip;
      if (maxComp && maxComp > 0) max = ip;
    }
    const range = new Range(min, max)

    const prefix = range.toEncompassingPrefix();

    return prefix.toString();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(calculateRange(textareaValue))
  }

  function handleTextarea(e: ChangeEvent<HTMLTextAreaElement>) {
    setTextareaValue(e.target.value)
  }

  return (
    <>
      <h1>CIDR Calculator</h1>

      <p>Enter a set of IPv4 addresses in the text box below. They may be separated by any reasonable separator (newline, comma, semicolon, etc.). This tool will find the smallest CIDR range that covers them all. The code can be found on <a href="https://github.com/dmoerner/cidr-calc/">Github</a>.</p>

      <form onSubmit={handleSubmit}>
        <textarea onChange={handleTextarea} name="ipAddresses" rows={10} cols={40} />
        <div>
          <button type="submit">
            Calculate CIDR Range
          </button>
        </div>
      </form>
      <div className="result">{result}</div>
    </>
  )
}

export default App
