// public/scripts/template.js
export function prepareTemplate(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.cloneNode(true);
}
