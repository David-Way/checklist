const omit = (
  obj: Record<string, any>,
  keysToOmit: string[],
): Record<string, any> =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key)),
  );

export function deriveSectionData(data: object, currentSection: number) {
  if (data?.schema?.meta?.sections === undefined) return data; // single section form

  const sectionsToOmit: string[] = data?.schema?.meta?.sections.filter(
    (_, i: number) => i !== currentSection,
  );

  const derivedSectionSchema = {
    ...structuredClone(data?.schema),
    properties: omit(data?.schema?.properties, sectionsToOmit),
  };

  const derivedSectionUiSchema = omit(data?.uiSchema, sectionsToOmit);

  return {
    schema: derivedSectionSchema,
    uiSchema: derivedSectionUiSchema,
  };
}

export function getPreviousSectionTitle(data: object, currentSection: number) {
  if (data?.meta?.sections === undefined) return null; // single section form

  const sectionKey = data?.meta?.sections[currentSection - 1];
  return data?.properties[sectionKey]?.title;
}
