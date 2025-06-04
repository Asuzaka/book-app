import { LOCALES_FAKER } from "@/shared";
import { Faker, LocaleDefinition } from "@faker-js/faker";

function returnSelected(lc: string): LocaleDefinition {
  const found = LOCALES_FAKER.find((each) => each.name === lc)?.language;
  if (!found) throw new Error("There is no such language");
  return found;
}

export function Load(locale: string) {
  const customFaker = new Faker({
    locale: [returnSelected(locale)],
  });
  return customFaker;
}
