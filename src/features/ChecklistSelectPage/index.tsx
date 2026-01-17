import { FlexContainer, Header } from "@components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllChecklists } from "../../api";
import { List, ListItem } from "../../components";

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
        <List as="ul">
          {allChecklists?.data?.map((checklist) => {
            const tags = checklist.meta.tags || null;
            return (
              <ListItem key={checklist.id} link={true}>
                <Link to={`/cl/${checklist.id}`}>
                  <h2>{checklist?.title}</h2>
                  <span>{checklist?.description}</span>

                  {tags && (
                    <FlexContainer direction="row" spacing="8">
                      {tags.map((tag) => (
                        <div key={tag}>{tag}</div>
                      ))}
                    </FlexContainer>
                  )}
                </Link>
              </ListItem>
            );
          })}
        </List>
      </main>
    </>
  );
};

export default ChecklistSelectPage;
