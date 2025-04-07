import { Outlet } from "react-router-dom";
import styled from "styled-components";

import QueryErrorBoundary from "@/services/QueryErrorBoundary";
import { Suspense } from "react";
import Loading from "@/pages/Loading";
import Header from "./Header";
import Footer from "./Footer";

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  overflow: hidden;
`;

function CommonLayout() {
  return (
    <Background>
      <Header />
      <Main>
        <QueryErrorBoundary>
          <Suspense
            fallback={
              <Loading
                title="데이터를 불러오는 중.."
                description="열심히 데이터를 가져오고 있어요"
              />
            }
          >
            <Outlet />
          </Suspense>
        </QueryErrorBoundary>
      </Main>
      <Footer />
    </Background>
  );
}

export default CommonLayout;
