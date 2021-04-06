import styled from "@emotion/styled";
import Layout from "../components/layout";

const NotFoundPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Custom404() {
  return (
    <Layout>
      <NotFoundPage>
        <h3>Page Not Found</h3>
      </NotFoundPage>
    </Layout>
  );
}
