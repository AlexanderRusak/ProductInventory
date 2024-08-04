import { Route, Routes } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { ListPage } from "@/pages/ListPage";
import { ProductPage } from "@/pages/ProductPage";
import { ROUTES } from "@constants/routes";
import { NotFound } from "./pages/404";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.INVENTORY_LIST} element={<ListPage />} />
        <Route path={ROUTES.CREATE_PRODUCT} element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
