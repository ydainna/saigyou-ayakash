import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wishlist from "@pages/Wishlist";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
