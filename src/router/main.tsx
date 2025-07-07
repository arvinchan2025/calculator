import {Navigate, useRoutes} from "react-router-dom";
import MainLayout from "@/layout";
import {lazy} from "react";

const HomePage = lazy(() => import("@/features/HomePage"))
const BMICalculator = lazy(() => import("@/features/health/BMICalculator"))
const PaymentCalculator = lazy(() => import("@/features/financial/PaymentCalculator"))
const TipCalculator = lazy(() => import("@/features/other/TipCalculator"))
const PercentOffCalculator = lazy(() => import("@/features/financial/PercentOffCalculator"))
const CircumferenceCalculator = lazy(() => import("@/features/math/Circumference"))


const MainRouter = () => {
  return useRoutes([{
    path: "/", element: <MainLayout/>, children: [
      // {index: true, element: <Navigate to={'bmi-calculator'} />},
      {index: true, element: <HomePage />},
      {path: 'bmi-calculator', element: <BMICalculator/>},
      {path: 'loan-payoff-calculator', element: <PaymentCalculator/>},
      {path: 'tip-calculator', element: <TipCalculator/>},
      {path: 'percent-off-calculator', element: <PercentOffCalculator/>},
      {path: 'circumference-calculator', element: <CircumferenceCalculator/>}
    ]
  }])
}
export default MainRouter;