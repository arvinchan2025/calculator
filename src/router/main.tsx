import {Navigate, useRoutes} from "react-router-dom";
import MainLayout from "@/layout";
import BMICalculator from "@/features/health/BMICalculator";
import HomePage from "@/features/HomePage";
import PaymentCalculator from "@/features/financial/PaymentCalculator";
import TipCalculator from "@/features/other/TipCalculator";


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