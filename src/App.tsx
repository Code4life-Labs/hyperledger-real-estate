import { Suspense, lazy } from "react";
import { BrowserRouter , Route, Routes  } from "react-router-dom";

// Import components
import Background from "./components/Background/Background.tsx";
import Loader from "./components/Loader/Loader.tsx";
const MainLayout = lazy(()=>import("./layouts/MainLayout.tsx"));

// Import modules
const Trade = lazy(()=>import("./module/Trade/Trade.tsx"));
const NFT = lazy(()=>import("./module/NFT/NFT.tsx"));

function App() {
  return (
    <Background>
      <Suspense fallback={<Loader/>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route path="/" element={
                <Suspense fallback={<Loader/>}>
                  <NFT />
                </Suspense>
              }/>
              <Route path="/trade" element={
                <Suspense fallback={<Loader/>}>
                  <Trade />
                </Suspense>
              }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Background>
    
  )
}

export default App
