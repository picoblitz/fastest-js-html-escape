const FNS = (() => {
  "use strict";

  // pick random element of array
  const pick = (ary) => ary[Math.floor(Math.random() * ary.length)];

  // get last element of array
  const last = (ary) => ary[ary.length - 1];

  // query selector and query selector all
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => Array.from(document.querySelectorAll(s));

  // html escape (text-based, old)
  const h0 = (() => {
    const E = [
      [/&/g, '&amp;'],
      [/</g, '&lt;'],
      [/>/g, '&gt;'],
      [/'/g, '&apos;'],
      [/"/g, '&quot;'],
    ];

    return (v) => E.reduce((r, e) => r.replace(...e), v);
  })();

  // html escape (text-based, old, frozen)
  const h1 = (() => {
    const E = Object.freeze([
      [/&/g, '&amp;'],
      [/</g, '&lt;'],
      [/>/g, '&gt;'],
      [/'/g, '&apos;'],
      [/"/g, '&quot;'],
    ]);

    return (v) => E.reduce((r, e) => r.replace(...e), v);
  })();

  // html escape (text-based, new, capture)
  const h2 = (() => {
    // characters to match
    const M = /([&<>'"])/g;

    // map of char to entity
    const E = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&apos;',
      '"': '&quot;',
    };

    // build and return escape function
    return (v) => v.replace(M, (_, c) => E[c]);
  })();

  // html escape (text-based, new, capture, frozen)
  const h3 = (() => {
    // characters to match
    // (cannot freeze regex)
    const M = /([&<>'"])/g;

    // map of char to entity
    const E = Object.freeze({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&apos;',
      '"': '&quot;',
    });

    // build and return escape function
    return (v) => v.replace(M, (_, c) => E[c]);
  })();

  // html escape (text-based, new, no capture)
  const h4 = (() => {
    // characters to match
    const M = /[&<>'"]/g;

    // map of char to entity
    const E = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&apos;',
      '"': '&quot;',
    };

    // build and return escape function
    return (v) => v.replace(M, (c) => E[c]);
  })();

  // html escape (text-based, new, no capture, frozen)
  const h5 = (() => {
    // characters to match
    const M = /[&<>'"]/g;

    // map of char to entity
    const E = Object.freeze({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&apos;',
      '"': '&quot;',
    });

    // build and return escape function
    return (v) => v.replace(M, (c) => E[c]);
  })();

  // html escape (text-based, new, no capture, frozen)
  const h6 = Object.freeze((() => {
    // characters to match
    const M = /[&<>'"]/g;

    // map of char to entity
    const E = Object.freeze({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&apos;',
      '"': '&quot;',
    });

    // build and return escape function
    return (v) => v.replace(M, (c) => E[c]);
  })());

  // html escape (reduce, replaceall)
  const h7 = (() => {
    const E = [
      ['&', '&amp;'],
      ['<', '&lt;'],
      ['>', '&gt;'],
      ["'", '&apos;'],
      ['"', '&quot;'],
    ];

    return (v) => E.reduce((r, e) => r.replaceAll(e[0], e[1]), v);
  })();

  // html escape (reduce, replaceall, freeze)
  const h8 = (() => {
    const E = Object.freeze([
      ['&', '&amp;'],
      ['<', '&lt;'],
      ['>', '&gt;'],
      ["'", '&apos;'],
      ['"', '&quot;'],
    ]);

    return (v) => E.reduce((r, e) => r.replaceAll(e[0], e[1]), v);
  })();

  // html escape (replaceall explicit)
  const h9 = (v) => {
    return v.replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll("'", '&apos;')
      .replaceAll('"', '&quot;');
  };

  // html escape (replace global regex)
  const h10 = (v) => {
    return v.replace(/\&/g, '&amp;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\'/g, '&apos;')
      .replace(/\"/g, '&quot;');
  };

//   // html escape (dom-based)
//   // note: textContent rather than innerText; the latter does not
//   // handle newlines correctly
//   const hd = (() => {
//     const e = document.createElement('p');
//     return (v) => { e.textContent = v; return e.innerHTML };
//   })();

  // html escape functions
  const TESTS = [{
    id: 'h0',
    name: "h0: Reduce",
    text: `
      HTML escape with replacement regular expression array.
    `,
  }, {
    id: 'h1',
    name: "h1: Reduce, Frozen Array",
    text: `
      HTML escape with frozen replacement regular expression array.
    `,
  }, {
    id: 'h2',
    name: "h2: Match, Capture",
    text: `
      HTML escape with capturing regex and replacement entity map.
    `,
  }, {
    id: 'h3',
    name: "h3: Match, Capture, Frozen",
    text: `
      HTML escape with capturing regex and frozen replacement entity map.
    `,
  }, {
    id: 'h4',
    name: "h4: Match, No Capture",
    text: `
      HTML escape with non-capturing regex and replacement entity map.
    `,
  }, {
    id: 'h5',
    name: "h5: Match, No Capture, Frozen Map",
    text: `
      HTML escape with non-capturing regex and frozen replacement entity
      map.
    `,
  }, {
    id: 'h6',
    name: "h6: Match, No Capture, Frozen Map/Function",
    text: `
      HTML escape with non-capturing regex, frozen replacement entity
      map, and frozen function.
    `,
  }, {
    id: 'h7',
    name: "h7: Reduce, Replace All",
    text: `
      HTML escape with replacement string array.
    `,
  }, {
    id: 'h8',
    name: "h8: Reduce, Replace All, Frozen",
    text: `
      HTML escape with frozen replacement string array.
    `,
  }, {
    id: 'h9',
    name: "h9: Replace All Literal",
    text: `
      HTML escape series of literal replaceAll()s.
    `,
  }, {
    id: 'h10',
    name: "h10: Replace Global RegExp",
    text: `
      HTML escape series of literal replaces by global regex.
    `,
  }];

  const LENS = [{
    id: '10',
    name: '10 characters',
    text: 'Strings of length 10.'
  }, {
    id: '50',
    name: '50 characters',
    text: 'Strings of length 50.'
  }, {
    id: '100',
    name: '100 characters',
    text: 'Strings of length 100.'
  }, {
    id: '500',
    name: '500 characters',
    text: 'Strings of length 500.'
  }, {
    id: '1000',
    name: '1000 characters',
    text: 'Strings of length 1000.'
  }, {
    id: '1500',
    name: '1500 characters',
    text: 'Strings of length 1500.'
  }, {
    id: '2000',
    name: '2000 characters',
    text: 'Strings of length 2000.'
  }, {
    id: '3000',
    name: '3000 characters',
    text: 'Strings of length 3000.'
  }];

  const FROMS = [{
    id: 'auto',
    name: 'auto',
    text: 'auto',
  }, {
    id: 'seed',
    name: 'seed',
    text: 'seed',
  }, {
    id: 'user',
    name: 'user',
    text: 'user',
  }];

  // escape value as csv cell
  const csv_esc = v => `"${v.toString().replaceAll('"', '""')}"`;

  const CSV_COLS = [{
    name: 'Source',
    get: row => row.data.from,
  }, {
    name: 'Test',
    get: row => row.data.test,
  }, {
    name: 'Length',
    get: row => row.data.len,
  }, {
    name: 'Time',
    get: row => row.mean,
  }];

  return Object.freeze({
    tests: TESTS,
    lens: LENS,
    froms: FROMS,

    pick: pick,
    last: last,
    qs: qs,
    qsa: qsa,

    // html escape functions
    h0: h0,
    h1: h1,
    h2: h2,
    h3: h3,
    h4: h4,
    h5: h5,
    h6: h6,
    h7: h7,
    h8: h8,
    h9: h9,
    h10: h10,
    // hd: hd,
    h: h6,

    csv_cols: CSV_COLS,
    csv_esc: csv_esc,
  });
})();
