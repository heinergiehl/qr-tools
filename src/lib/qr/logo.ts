export const sanitizeSvg = (rawSvg: string) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(rawSvg, "image/svg+xml");
  document.querySelectorAll("script").forEach((node) => node.remove());
  document.querySelectorAll("*").forEach((node) => {
    Array.from(node.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on")) {
        node.removeAttribute(attr.name);
      }
      if ((name === "href" || name === "xlink:href") && attr.value.startsWith("javascript:")) {
        node.removeAttribute(attr.name);
      }
    });
  });
  return new XMLSerializer().serializeToString(document.documentElement);
};

export const svgToDataUrl = (svg: string) =>
  `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
