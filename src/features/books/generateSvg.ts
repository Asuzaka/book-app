export function Func(text: string, width = 128, height = 192): string {
  const randomColor = () => {
    const r = Math.floor(150 + Math.random() * 100);
    const g = Math.floor(150 + Math.random() * 100);
    const b = Math.floor(150 + Math.random() * 100);
    return `rgb(${r},${g},${b})`;
  };

  const escapeXml = (unsafe: string) =>
    unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return c;
      }
    });

  const wrapText = (str: string, maxLen = 12) => {
    const words = str.split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + " " + word).trim().length <= maxLen) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const bgColor = randomColor();
  const lines = wrapText(text);

  const fontSize = 14;
  const lineHeight = fontSize * 1.2;
  const startY = height / 2 - (lines.length - 1) * (lineHeight / 2);

  const svgLines = lines
    .map(
      (line, i) =>
        `<tspan x="${width / 2}" y="${startY + i * lineHeight}">${escapeXml(
          line
        )}</tspan>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="${bgColor}" />
    <text
      x="${width / 2}" 
      y="${startY}" 
      font-family="Montserrat, sans-serif" 
      font-size="${fontSize}" 
      fill="white" 
      text-anchor="middle"
      dominant-baseline="middle"
    >${svgLines}</text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
