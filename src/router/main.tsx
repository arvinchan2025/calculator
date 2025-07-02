import {Navigate, useRoutes} from "react-router-dom";
import MainLayout from "@/layout";
import BMICalculator from "@/features/BMICalculator";
import HomePage from "@/features/HomePage";


const MainRouter = () => {
  return useRoutes([{
    path: "/", element: <MainLayout/>, children: [
      {index: true, element: <Navigate to={'bmi-calculator'} />},
      // {index: true, element: <Navigate to={'home'} />},
      {path: 'home', element: <HomePage />},
      {path: 'bmi-calculator', element: <BMICalculator />}
    ]
  }])
}
export default MainRouter;