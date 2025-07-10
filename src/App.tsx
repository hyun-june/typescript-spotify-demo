import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AppLayout from "./layout/AppLayout";
import "./App.css";

// 0. 사이드 바 있어야함 (플레이리스트, 메뉴)
// 1. 홈페이지  /
// 2. 서치 페이지 /search
// 3. 서치 결과 페이지 /search/:keyword
// 4. 플레이 리스트 상세 페이지 /playlist/:id
// 5. (모바일버전) 플레이리스트 보여주는 페이지 /playlist

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route path="search">
          <Route index element={<SearchPage />} />
          {/* <Route path=":keyword" element={<SearchWithKeywordPage />} /> */}
        </Route>

        {/* <Route path="playlist">
          <Route index element={<PlaylistPage />} />
          <Route path=":id" element={<PlaylistDetailPage />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
