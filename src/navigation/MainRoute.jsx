import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "../pages/Home/Home";
import PublicRoute from "../Layout/Routes/PublicRoute";
import { pathConstant } from "./pathConstant";
import CrashPage from "../pages/Crash";

const MainRoute = () => {
  return (
    <div>
      <Router>
        {/* <Suspense fallback={<LuLoader />}> */}
        <Suspense fallback={<span>Loading...</span>}>
          <Routes>
            <Route
              path={pathConstant.home}
              element={
                <PublicRoute>
                  <CrashPage />
                </PublicRoute>
              }
            />
 
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default MainRoute;