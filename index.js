/**
 * dom-parser
 *
 * Browser compatible DOM parser.
 */

// Thanks to rails/turbolinks

function useParser(html) {
  var d = new DOMParser();
  return d.parseFromString(html, 'text/html');
}

function useDom(html) {
  var d = document.implementation.createHTMLDocument('');
  d.documentElement.innerHTML = html;
  return d;
}

function useWrite(html) {
  var d = document.implementation.createHTMLDocument('');
  d.open('replace');
  d.write(html);
  d.close();
  return d;
}

var snippet = '<html><body><p>test';

function getParser() {
  var ref ;
  try {
    if (window.DOMParser) {
      ref = useParser(snippet);
      return useParser;
    }
  } catch (err) {
    ref = useDom(snippet);
    return useDom;
  } finally {
    if (!(ref && ref.body && ref.body.childNodes.length === 1)) {
      return useWrite;
    }
  }
}

var parser = getParser();

function dom(html) {
  if (parser) return parser(html);
  return null;
}
dom.parser = parser;

module.exports = dom;
