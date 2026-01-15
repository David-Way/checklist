import { createHashRouter } from "react-router-dom";
import ChecklistPage from "../features/ChecklistPage";
import ChecklistSelectPage from "../features/ChecklistSelectPage";

const router = createHashRouter([
  {
    path: "/",
    element: <ChecklistSelectPage />,
  },
  {
    path: "cl/:id",
    element: <ChecklistPage />,
    // loader: teamLoader,
  },
]);

export default router;
