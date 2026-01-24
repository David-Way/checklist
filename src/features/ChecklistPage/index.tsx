import { getChecklist } from "@api";
import { FlexContainer, FormContainer, Header } from "@components";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const ChecklistPage: React.FC = () => {
  const { id } = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getChecklist"],
    queryFn: () => {
      if (id) return getChecklist(id);
    },
  });

  if (isPending) {
    return <span>Loading checklist...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <FlexContainer spacing="16" direction="column" align="stretch">
      <Header title="Checklist" />
      <aside>
        <Link to="/">Back to all Checklists</Link>
      </aside>
      <main>
        <FormContainer schema={data.schema} uiSchema={data.uiSchema} />
      </main>
    </FlexContainer>
  );
};

export default ChecklistPage;
