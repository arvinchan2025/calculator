import {Navigate, useRoutes} from "react-router-dom";
import MainLayout from "@/layout";
import {lazy} from "react";
import LoanPayOff from "@/features/financial/LoanPayOff";

const HomePage = lazy(() => import("@/features/HomePage"))
const BMICalculator = lazy(() => import("@/features/health/BMICalculator"))
const MortgageCalculator = lazy(() => import("@/features/financial/Mortgage"))
const LoanPayOffCalculator = lazy(() => import("@/features/financial/LoanPayOff"))
const TipCalculator = lazy(() => import("@/features/other/TipCalculator"))
const PercentOffCalculator = lazy(() => import("@/features/financial/PercentOffCalculator"))
const CircumferenceCalculator = lazy(() => import("@/features/math/Circumference"))
const PeptideCalculator = lazy(() => import("@/features/medicine/PeptideCalculator"))
const AsphaltTonnageCalculator = lazy(() => import("@/features/construction/AsphaltTonnage"))


const MainRouter = () => {
  return useRoutes([{
    path: "/", element: <MainLayout/>, children: [
      // {index: true, element: <Navigate to={'bmi-calculator'} />},
      {index: true, element: <HomePage />},
      {path: 'bmi-calculator', element: <BMICalculator/>},
      {path: 'mortgage-calculator', element: <MortgageCalculator/>},
      {path: 'loan-payoff-calculator', element: <LoanPayOffCalculator/>},
      {path: 'tip-calculator', element: <TipCalculator/>},
      {path: 'percent-off-calculator', element: <PercentOffCalculator/>},
      {path: 'circumference-calculator', element: <CircumferenceCalculator/>},
      {path: 'peptide-calculator', element: <PeptideCalculator/>},
      {path: 'asphalt-tonnage-calculator', element: <AsphaltTonnageCalculator/>}
    ]
  }])
}
export default MainRouter;