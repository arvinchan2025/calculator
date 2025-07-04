import {Navigate, useRoutes} from "react-router-dom";
import MainLayout from "@/layout";
import {lazy} from "react";

const HomePage = lazy(() => import("@/features/HomePage"))
const BMICalculator = lazy(() => import("@/features/health/BMICalculator"))
const PaymentCalculator = lazy(() => import("@/features/financial/PaymentCalculator"))
const TipCalculator = lazy(() => import("@/features/other/TipCalculator"))


const MainRouter = () => {
  return useRoutes([{
    path: "/", element: <MainLayout/>, children: [
      // {index: true, element: <Navigate to={'bmi-calculator'} />},
      {index: true, element: <Navigate to={'home'}/>},
      {path: 'home', element: <HomePage/>},
      {path: 'bmi-calculator', element: <BMICalculator/>},
      {path: 'loan-payoff-calculator', element: <PaymentCalculator/>},
      {path: 'tip-calculator', element: <TipCalculator/>}
    ]
  }])
}
export default MainRouter;