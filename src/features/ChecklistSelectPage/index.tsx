import { Header } from "@components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllChecklists } from "../../api";

const ChecklistSelectPage: React.FC = () => {
  const {
    isPending,
    isError,
    data: allChecklists,
    error,
  } = useQuery({
    queryKey: ["AllChecklists"],
    queryFn: () => getAllChecklists(),
  });

  if (isPending) {
    return <span>Loading all checklists...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log("all checklists", allChecklists);
  return (
    <>
      <Header title="Checklist" />
      <main>
        <ul>
          {allChecklists?.data?.map((checklist) => (
            <li key={checklist.id}>
              <Link to={`/cl/${checklist.id}`}>{checklist.id}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default ChecklistSelectPage;
