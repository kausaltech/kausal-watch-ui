# TypeScript static typing conventions

- Do not use this pattern
  `sequence.filter((s): s is NonNullable<typeof s> => s != null)`
  since Typescript knows how to deduce the types from this simpler pattern:
  `sequence.filter(s => s != null)`
