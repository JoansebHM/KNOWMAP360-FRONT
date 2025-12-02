import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
