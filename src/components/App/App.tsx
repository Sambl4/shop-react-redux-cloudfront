import { Routes, Route } from "react-router-dom";
import MainLayout from "~/components/MainLayout/MainLayout";
import PageProductForm from "~/components/pages/PageProductForm/PageProductForm";
import PageOrders from "~/components/pages/PageOrders/PageOrders";
import PageOrder from "~/components/pages/PageOrder/PageOrder";
import PageProductImport from "~/components/pages/admin/PageProductImport/PageProductImport";
import PageCart from "~/components/pages/PageCart/PageCart";
import PageProducts from "~/components/pages/PageProducts/PageProducts";
import { Typography } from "@mui/material";
import Context from "~/context/context";
import { useEffect, useState } from "react";

function App() {
  const [ msg, setMsg] = useState('');
  if(!localStorage.getItem("authorization_token")) {
    localStorage.setItem("authorization_token", btoa('Sambl4:TEST_PASSWORD'));
  }
  useEffect(() => {
    msg && alert(msg);
  }, [msg])

  return (
    <Context.Provider value={{msg, setMsg}}>
    <MainLayout>
      <Routes>
        <Route path="/" element={<PageProducts />} />
        <Route path="cart" element={<PageCart />} />
        <Route path="admin/orders">
          <Route index element={<PageOrders />} />
          <Route path=":id" element={<PageOrder />} />
        </Route>
        <Route path="admin/products" element={<PageProductImport />} />
        <Route path="admin/product-form">
          <Route index element={<PageProductForm />} />
          <Route path=":id" element={<PageProductForm />} />
        </Route>
        <Route
          path="*"
          element={<Typography variant="h1">Not found</Typography>}
        />
      </Routes>
    </MainLayout>
    </Context.Provider>
  );
}

export default App;
