import { NextRequest, NextResponse } from "next/server";
import {
  FakerLanguage,
  GenerateSentance,
  GenerateSVG,
  GenerateTitle,
} from "@/features";
import { PER_PAGE } from "@/shared";
import { Book } from "@/entites";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ seed: string; lng: string }> }
) {
  const params = await props.params;
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const seed = parseInt(params.seed);
  if (isNaN(seed)) {
    return NextResponse.json({ error: "Invalid seed" }, { status: 400 });
  }

  try {
    const CustomFaker = FakerLanguage(params.lng);
    CustomFaker.seed(seed + page);

    const books: Book[] = Array.from({ length: PER_PAGE }, (_, i) => {
      const title = GenerateTitle(CustomFaker);
      const authorsCount = CustomFaker.number.int({ min: 1, max: 3 });
      const reviewsCount = CustomFaker.number.int({ min: 3, max: 6 });
      return {
        index: (page - 1) * PER_PAGE + i + 1,
        isbn: CustomFaker.helpers.replaceSymbols("978-#-###-#####-#"),
        title,
        authors: Array.from({ length: authorsCount }, () =>
          CustomFaker.person.fullName()
        ).join(", "),
        publisher: CustomFaker.company.name(),
        year: CustomFaker.date.past({ years: 20 }).getFullYear(),
        likes:
          Math.round(CustomFaker.number.float({ min: 0, max: 10 }) * 10) / 10,
        coverUrl: GenerateSVG(title),
        reviews: Array.from({ length: reviewsCount }, () => ({
          text: GenerateSentance(CustomFaker),
          reviewer: CustomFaker.person.fullName(),
          company: CustomFaker.company.name(),
        })),
      };
    });

    return NextResponse.json({ books });
  } catch {
    return NextResponse.json(
      { error: "Unsupported language" },
      { status: 400 }
    );
  }
}
