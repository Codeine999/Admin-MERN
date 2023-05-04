import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "scenes/customers";
import { themeSettings } from "theme";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Products from "./scenes/products"
import Header from "./scenes/header"
import ShowProp from "./scenes/addprop/showprop"
import Form from "scenes/addprop/form";
import Edit from "scenes/addprop/edit";
import ShowAdmin from "scenes/admin/showAdmin";
import AddAdmin from "scenes/admin/addAdmin";
import Login from "./components/Login"



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/header" element={<Header />} />
              <Route path="/blog" element={<ShowProp />} />
              <Route path="/blog/create" element={<Form />} />
              <Route path="/blog/edit/:id" element={<Edit />} />
              <Route path="/admin" element={<ShowAdmin />} />
              <Route path="/admin/addadmin" element={<AddAdmin />} />
  

              </Route>
            </Routes>
       </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
