import { getChecklist } from "@api";
import {
  Button,
  Container,
  FlexContainer,
  FormContainer,
  Header,
} from "@components";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deriveSectionData, getPreviousSectionTitle } from "./utils";

const ChecklistPage: React.FC = () => {
  const { id } = useParams();
  const [section, setSection] = useState(0);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getChecklist"],
    queryFn: () => {
      if (id) return getChecklist(id);
    },
  });

  if (isPending) {
    return (
      <Container maxWidth="large" className="u-mh:auto">
        <FlexContainer spacing="16" direction="column" align="stretch">
          <Header title="Checklist" />

          <main>
            <p>Loading checklist...</p>
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

  const derivedSectionData = deriveSectionData(data, section);
  const isLastSection = section === data?.schema?.meta?.sections?.length - 1;

  return (
    <Container maxWidth="large" className="u-mh:auto">
      <FlexContainer spacing="16" direction="column" align="stretch">
        <aside>
          {section === 0 ? (
            <Link to="/">‹ Back to all Checklists</Link>
          ) : (
            <Link
              to="/"
              onClick={(event) => {
                event.preventDefault();
                setSection(section - 1);
                window.scroll({ top: 0 });
              }}
            >
              Back to {getPreviousSectionTitle(data.schema, section)}
            </Link>
          )}
        </aside>
        <main>
          <FormContainer
            schema={derivedSectionData.schema}
            uiSchema={derivedSectionData.uiSchema}
            onSubmit={() => {
              if (!isLastSection) {
                setSection(section + 1);
                window.scroll({ top: 0 });
              } else {
                // submitAllData(formData);
                alert("Demonstration Software: Submitting");
              }
            }}
          >
            <FlexContainer className="u-pv:24 u-ph:16" spacing="16">
              <Button type="submit">{isLastSection ? "Submit" : "Next"}</Button>
            </FlexContainer>
          </FormContainer>
        </main>
      </FlexContainer>
    </Container>
  );
};

export default ChecklistPage;
