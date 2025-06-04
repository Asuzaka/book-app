import { Faker } from "@faker-js/faker";

export function Func(Custom: Faker) {
  let title = "";
  try {
    title = Custom.book.title();
  } catch {
    title = Custom.lorem.words({ min: 1, max: 3 });
  }
  return title;
}
