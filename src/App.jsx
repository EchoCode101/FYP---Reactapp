import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import NavBar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import List from "./components/List/List";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";
import ArticleLoader from "./components/Detailed Data/ArticleLoader";
import ArticleLoaderForDetailedData from "./components/Detailed Data/ArticleLoaderForDetailedData";
import SignUpForm from "./components/User/SignUpForm";
import LoginForm from "./components/User/LoginForm";
import WorldUniDomain from "./components/WorldUniDomains/WorldUniDomain";
import AboutUs from "./components/AboutUs/AboutUs";
import Programs from "./components/DegreePrograms/Bachelor";
import Intermediate from "./components/DegreePrograms/Intermediate";

const App = () => {
  const [progress, setProgress] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState(null);

  const pageSize = 10;
  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/signup"
            element={<SignUpForm setProgress={setProgress} />}
          />
          <Route
            path="/login"
            element={<LoginForm setProgress={setProgress} />}
          />
          <Route
            path="/search"
            element={<Search setProgress={setProgress} />}
          />
          <Route
            path="/all_universities"
            element={<List setProgress={setProgress} pageSize={pageSize} />}
          />
          <Route
            path="/all_universities/:id"
            element={<ArticleLoader setProgress={setProgress} />}
          />
          <Route
            path="/detailedData/:id"
            element={<ArticleLoaderForDetailedData setProgress={setProgress} />}
          />
          <Route
            path="/WorldsUnies_and_Domains"
            element={<WorldUniDomain setProgress={setProgress} />}
          />
          <Route
            path="/about_us"
            element={<AboutUs setProgress={setProgress} />}
          />
          <Route path="/programs" element={<Programs />} />
          <Route path="/intermediate_programs" element={<Intermediate />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
