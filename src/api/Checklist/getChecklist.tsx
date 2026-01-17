type Checklist = {
  id: string;
};

export default function getChecklist(id: number): Checklist {
  return fetch(`${import.meta.env.VITE_APP_API_URL}/checklist/${id}.json`).then(
    (r) => r.json(),
  );
}
