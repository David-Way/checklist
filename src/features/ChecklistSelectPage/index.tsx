import { getAllChecklists } from "@api";
import { FlexContainer, Header, List, ListItem, Tag } from "@components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
    <FlexContainer direction="column" spacing="16" align="stretch">
      <Header title="Checklist" />
      <main>
        <List as="ul">
          {allChecklists?.data?.map((checklist) => {
            const tags = checklist.meta.tags || null;
            return (
              <ListItem key={checklist.id} link={true}>
                <Link to={`/cl/${checklist.id}`}>
                  <FlexContainer direction="column" spacing="4">
                    <h2>{checklist?.title}</h2>
                    <p>{checklist?.description}</p>

                    {tags && (
                      <FlexContainer direction="row" spacing="8">
                        {tags.map((tag) => (
                          <Tag size="sm" key={tag}>
                            {tag}
                          </Tag>
                        ))}
                      </FlexContainer>
                    )}
                  </FlexContainer>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </main>
    </FlexContainer>
  );
};

export default ChecklistSelectPage;
