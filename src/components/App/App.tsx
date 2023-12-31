import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import RecordsPage from "../../pages/RecordsPage/RecordsPage";
import AppStyled from "./AppStyled";
import { useAppSelector } from "../../store/hooks";
import Loading from "../Loading/Loading";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Toast from "../Toast/Toast";
import CreateFormPage from "../../pages/CreateFormPage/CreateFormPage";
import RecordDetailsPage from "../../pages/RecordDetailsPage/RecordDetailsPage";
import ModifyFormPage from "../../pages/ModifyFormPage/ModifyFormPage";

const App = (): React.ReactElement => {
  const isLoading = useAppSelector((state) => state.uiState.isLoading);

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <AppStyled>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<RecordsPage />} />
          <Route path="/add" element={<CreateFormPage />} />
          <Route path={`/details/:recordId`} element={<RecordDetailsPage />} />
          <Route path={`/modify/:recordId`} element={<ModifyFormPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Toast />
        <div className="footer" />
      </AppStyled>
    </>
  );
};
export default App;
