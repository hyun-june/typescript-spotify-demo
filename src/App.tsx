import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./App.css";
import LoadingSpinner from "./common/components/LoadingSpinner/LoadingSpinner";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
  () => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage")
);
const PlaylistPage = React.lazy(
  () => import("./pages/PlaylistPage/PlaylistPage")
);
const PlaylistDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);

// 0. 사이드 바 있어야함 (플레이리스트, 메뉴)
// 1. 홈페이지  /
// 2. 서치 페이지 /search
// 3. 서치 결과 페이지 /search/:keyword
// 4. 플레이 리스트 상세 페이지 /playlist/:id
// 5. (모바일버전) 플레이리스트 보여주는 페이지 /playlist

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />

          <Route path="search">
            <Route index element={<SearchPage />} />
            <Route path=":keyword" element={<SearchWithKeywordPage />} />
          </Route>

          <Route path="playlist">
            <Route index element={<PlaylistPage />} />
            <Route path=":id" element={<PlaylistDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
