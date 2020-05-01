const livingRegex = /^([0-9]*)o/;
const deadRegex = /^([0-9]*)b/;

export function parseRle(file) {
  const [, ...bodyLines] = omitComments(file.split('\n'));

  // just ingore header for now as the current implementation doesn't need it
  const bodyWithoutLineBreak = bodyLines.join('');
  const livingCells = parseBody(bodyWithoutLineBreak, 0, 0);

  return new Set(livingCells);
}

function parseBody(body, currentX, currentY) {
  const deadMatch = body.match(deadRegex);
  if (deadMatch) {
    const incrementX = Number(deadMatch[1] || 1);
    return parseBody(
      body.substring(deadMatch[0].length),
      currentX + incrementX,
      currentY
    );
  }

  const livingMatch = body.match(livingRegex);
  if (livingMatch) {
    const incrementX = Number(livingMatch[1] || 1);

    const livingCells = range(incrementX).map(
      v => `${currentX + v},${currentY}`
    );

    return [
      ...livingCells,
      ...parseBody(
        body.substring(livingMatch[0].length),
        currentX + incrementX,
        currentY
      )
    ];
  }

  // EOL
  if (body.startsWith('$')) {
    return parseBody(body.substring(1), 0, currentY + 1);
  }

  // EOF
  if (body === '!' || body === '') {
    return [];
  }

  throw new Error('Invalid token');
}

const omitComments = ([head, ...tail]) =>
  head.startsWith('#') ? omitComments(tail) : [head, ...tail];

const range = n =>
  Array(n)
    .fill(0)
    .map((v, i) => v + i);
