
type Checklist = {
    // TODO
};

export default function getAllChecklists():Checklist[] {
    return fetch(`${import.meta.env.VITE_APP_API_URL}/checklist/index-[generated-file].json`).then(r => r.json())
};
