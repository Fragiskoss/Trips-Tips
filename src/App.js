import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginProvider } from "./Components/LoginContext";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Destinations from "./Components/Destinations";
import Tips from "./Components/Tips";
import Blog from "./Components/Blog";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import AdminPage from "./Components/AdminPage";
import AdminBlog from "./Components/AdminBlog";
import AdminDestinations from "./Components/AdminDestinations";
import AdminTips from "./Components/AdminTips";
import BlogPostPage from "./Components/BlogPostPage";
import AdminCreateBlog from "./Components/AdminCreateBlog";
import DestinationPostPage from "./Components/DestinationPostPage";
import AdminCreateDestination from "./Components/AdminCreateDestination";
import TipPostPage from "./Components/TipPostPage";
import AdminCreateTip from "./Components/AdminCreateTip";


import PrivateRoute from "./Components/PrivateRoute";
import "./App.css";



// Import other components

function App() {
  return (
    <Router>
      <LoginProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/adminblog"
              element={
                <PrivateRoute>
                  <AdminBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/admindestinations"
              element={
                <PrivateRoute>
                  <AdminDestinations />
                </PrivateRoute>
              }
            />
            <Route
              path="/admintips"
              element={
                <PrivateRoute>
                  <AdminTips />
                </PrivateRoute>
              }
            />
            <Route
              path="/createblog"
              element={
                <PrivateRoute>
                  <AdminCreateBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/createdestination"
              element={
                <PrivateRoute>
                  <AdminCreateDestination />
                </PrivateRoute>
              }
            />

            <Route
              path="/createtip"
              element={
                <PrivateRoute>
                  <AdminCreateTip />
                </PrivateRoute>
              }
            />

            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/destinations/:id" element={<DestinationPostPage />} />
            <Route path="/tips/:id" element={<TipPostPage />} />
          </Routes>
          <Footer />
        </div>
      </LoginProvider>
    </Router>
  );
}

export default App;
