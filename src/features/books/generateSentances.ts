import { Faker } from "@faker-js/faker";

export function Func(Custom: Faker) {
  let text = "";
  try {
    text = Custom.commerce.productDescription();
  } catch {
    text = Custom.lorem.sentence();
  }
  return text;
}
