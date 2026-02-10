import { getAllChecklists } from "@api";
import {
  Container,
  FlexContainer,
  Header,
  List,
  ListItem,
  Tag,
} from "@components";
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
    return (
      <Container maxWidth="large" className="u-mh:auto">
        <FlexContainer spacing="16" direction="column" align="stretch">
          <Header title="Checklist" />

          <main>
            <p>Loading all checklists...</p>
          </main>
        </FlexContainer>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="large" className="u-mh:auto">
        Error: {error.message}
      </Container>
    );
  }

  return (
    <Container maxWidth="large" className="u-mh:auto">
      <FlexContainer direction="column" spacing="16" align="stretch">
        <Header title="Checklist" />
        <main>
          <List as="ul">
            {allChecklists?.data?.map((checklist) => {
              const tags = checklist.meta.tags || null;
              return (
                <ListItem key={checklist.$id} link={true}>
                  <Link to={`/cl/${checklist.$id}`}>
                    <FlexContainer direction="column" spacing="4">
                      <h2
                        style={{
                          viewTransitionName: `view-transition-${checklist?.$id}`,
                        }}
                      >
                        {checklist?.title}
                      </h2>
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
    </Container>
  );
};

export default ChecklistSelectPage;
