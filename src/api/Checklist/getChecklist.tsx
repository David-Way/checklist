type ChecklistRequest = {
  id: string;
};

// export default function getChecklist(id: number): Checklist {
//   return fetch(`${import.meta.env.VITE_APP_API_URL}/checklist/${id}.json`).then(
//     (r) => r.json(),
//   );
// }

export default async function getChecklist(id: number): ChecklistRequest {
  const [schema, uiSchema] = await Promise.all([
    fetch(`${import.meta.env.VITE_APP_API_URL}/checklist/${id}.json`),
    fetch(`${import.meta.env.VITE_APP_API_URL}/checklist/${id}-ui-schema.json`),
  ]);

  console.log("uiSchema", uiSchema);
  return {
    schema: await schema.json(),
    uiSchema: (await uiSchema?.json()) || {},
  };
}
