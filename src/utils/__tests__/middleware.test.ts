import { PlanFromPlansQuery, getParsedLocale } from '../middleware.utils';

const primaryLanguage = 'en-US';
const otherLanguages = ['es-US', 'DOTHRAKI'];
const MOCK_PLAN = {
  id: 'foo',
  identifier: 'foo',
  otherLanguages,
  primaryLanguage,
} as PlanFromPlansQuery;

describe('getParsedLocale', () => {
  it('returns the plan primary language if no match is found in the path', () => {
    expect(getParsedLocale([], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
    expect(getParsedLocale(['fi', 'bar'], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
  });

  it('returns the plan primary language if it is found in the path', () => {
    expect(getParsedLocale([primaryLanguage], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
    expect(getParsedLocale([primaryLanguage, 'foo', 'bar'], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
  });

  it("returns the plan's other language if it is found in the path", () => {
    expect(getParsedLocale([otherLanguages[0]], MOCK_PLAN)).toMatchObject({
      parsedLocale: otherLanguages[0],
      isCaseInvalid: false,
    });
    expect(getParsedLocale(['foo', otherLanguages[1]], MOCK_PLAN)).toMatchObject({
      parsedLocale: otherLanguages[1],
      isCaseInvalid: false,
    });
  });

  it('returns the plan primary language or other language if a lowercase version is found in the path', () => {
    expect(getParsedLocale(['en-us'], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: true,
    });
    expect(getParsedLocale(['plan', 'es-us', 'foo'], MOCK_PLAN)).toMatchObject({
      parsedLocale: 'es-US',
      isCaseInvalid: true,
    });
    expect(getParsedLocale(['dothraki', 'foo'], MOCK_PLAN)).toMatchObject({
      parsedLocale: 'DOTHRAKI',
      isCaseInvalid: true,
    });
  });
});
