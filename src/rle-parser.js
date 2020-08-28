const headerRegex = /^x = (\d+), y = (\d+)/;
const livingRegex = /^(\d*)o/;
const deadRegex = /^(\d*)b/;
const lastLivingRegex = /^(\d+)[$!]/;

export function parseRle(file) {
  const [header, ...bodyLines] = omitComments(file.split(/\r?\n/));

  const [x, y] = parseHeader(header);

  const currentX = -Math.floor(x / 2);
  const currentY = -Math.floor(y / 2);

  const bodyWithoutLineBreak = bodyLines.join('');
  const livingCells = parseBody(bodyWithoutLineBreak, {
    currentX,
    currentY,
    baseX: currentX
  });

  return new Set(livingCells);
}

function parseBody(body, { currentX, currentY, baseX }) {
  const deadMatch = body.match(deadRegex);
  if (deadMatch) {
    const incrementX = Number(deadMatch[1] || 1);
    return parseBody(body.substring(deadMatch[0].length), {
      currentX: currentX + incrementX,
      currentY,
      baseX
    });
  }

  const livingMatch = body.match(livingRegex);
  if (livingMatch) {
    const incrementX = Number(livingMatch[1] || 1);

    const livingCells = range(incrementX).map(
      v => `${currentX + v},${currentY}`
    );

    return [
      ...livingCells,
      ...parseBody(body.substring(livingMatch[0].length), {
        currentX: currentX + incrementX,
        currentY,
        baseX
      })
    ];
  }

  const lastLivingMatch = body.match(lastLivingRegex);
  if (lastLivingMatch) {
    const incrementX = Number(lastLivingMatch[1]);

    const livingCells = range(incrementX).map(
      v => `${currentX + v},${currentY}`
    );

    return [
      ...livingCells,
      ...parseBody(body.substring(lastLivingMatch[0].length - 1), {
        currentX: currentX + incrementX,
        currentY,
        baseX
      })
    ];
  }

  // EOL
  if (body.startsWith('$')) {
    return parseBody(body.substring(1), {
      currentX: baseX,
      currentY: currentY + 1,
      baseX
    });
  }

  // EOF
  if (body === '!') {
    return [];
  }

  throw new Error('Invalid token');
}

function parseHeader(header) {
  const [, x, y] = header.match(headerRegex);

  return [x, y].map(v => parseInt(v, 10));
}

const omitComments = ([head, ...tail]) =>
  head.startsWith('#') ? omitComments(tail) : [head, ...tail];

const range = n =>
  Array(n)
    .fill(0)
    .map((v, i) => v + i);
