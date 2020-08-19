import React, {Suspense} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Auth from "../hoc/auth";
import HomePage from "./views/HomePage/HomePage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import VideoUpload from "./views/VideoUpload/VideoUpload";
import ShowVideo from "./views/ShowVideo/ShowVideo";
import SubscriptionPage from "./views/SubscriptionPage/SubsciptionPage";

import 'bootstrap/dist/css/bootstrap.min.css';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUpload, true)} />
          <Route exact path="/video/:id" component={Auth(ShowVideo, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;