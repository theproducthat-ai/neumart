interface AllergenInfoSectionProps {
  ingredients?: string;
  containsAllergens?: string[];
  mayContainAllergens?: string[];
  dietaryTags?: string[];
  allergenNotes?: string;
}

export function AllergenInfoSection({
  ingredients,
  containsAllergens,
  mayContainAllergens,
  dietaryTags,
  allergenNotes,
}: AllergenInfoSectionProps) {
  const hasData =
    !!ingredients ||
    (containsAllergens?.length ?? 0) > 0 ||
    (mayContainAllergens?.length ?? 0) > 0 ||
    (dietaryTags?.length ?? 0) > 0 ||
    !!allergenNotes;

  return (
    <div className="mt-8 rounded-lg border bg-muted/30 p-5 text-sm">
      <h2 className="mb-3 text-base font-semibold">Allergen &amp; Ingredient Information</h2>

      {!hasData ? (
        <p className="text-muted-foreground">Allergen information not available.</p>
      ) : (
        <div className="space-y-3">
          {ingredients && (
            <div>
              <p className="mb-0.5 font-medium">Ingredients</p>
              <p className="text-muted-foreground">{ingredients}</p>
            </div>
          )}

          {(containsAllergens?.length ?? 0) > 0 && (
            <div>
              <p className="mb-0.5 font-medium">Contains</p>
              <p className="text-muted-foreground">{containsAllergens!.join(", ")}</p>
            </div>
          )}

          {(mayContainAllergens?.length ?? 0) > 0 && (
            <div>
              <p className="mb-0.5 font-medium">May Contain Traces Of</p>
              <p className="text-muted-foreground">{mayContainAllergens!.join(", ")}</p>
            </div>
          )}

          {(dietaryTags?.length ?? 0) > 0 && (
            <div>
              <p className="mb-0.5 font-medium">Dietary Information</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {dietaryTags!.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {allergenNotes && (
            <div>
              <p className="mb-0.5 font-medium">Notes</p>
              <p className="text-muted-foreground">{allergenNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
