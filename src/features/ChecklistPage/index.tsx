import { getChecklist } from "@api";
import { FlexContainer, FormContainer, Header } from "@components";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const ChecklistPage: React.FC = () => {
  console.log("JERE");
  const { id } = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getChecklist"],
    queryFn: () => getChecklist(id),
  });

  if (isPending) {
    return <span>Loading checklist...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log("checklist", data);
  return (
    <FlexContainer spacing="16" direction="column" align="stretch">
      <Header title="Checklist" />
      <Link to="/">Back to all Checklists</Link>
      <main>
        <FormContainer schema={data} />
      </main>
    </FlexContainer>
  );
};

export default ChecklistPage;
