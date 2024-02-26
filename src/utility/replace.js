export function replaceHtmlEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

export function replaceImageWithMaxRes(originalUrl) {
  const newUrl = originalUrl
    .replace('/default.jpg', '/maxresdefault.jpg')
    .replace('/mqdefault.jpg', '/maxresdefault.jpg')
    .replace('/hqdefault.jpg', '/maxresdefault.jpg')
    .replace('/sddefault.jpg', '/maxresdefault.jpg');
  return newUrl;
}
