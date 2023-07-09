
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
     // errorElement: <Page404 />
    },
    {
      path: "/home",
      element: <Home />,
    },

    
  ]);
  return(
    <div><RouterProvider router={router} /></div>
  )
}

export default App;
