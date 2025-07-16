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
const CreditCardCalculator = lazy(() => import("@/features/financial/CreditCard"))
const CircumferenceCalculator = lazy(() => import("@/features/math/Circumference"))
const PeptideCalculator = lazy(() => import("@/features/medicine/PeptideCalculator"))
const AsphaltTonnageCalculator = lazy(() => import("@/features/construction/AsphaltTonnage"))
const PaintCoverageCalculator = lazy(() => import("@/features/construction/PaintCoverage"))
const GPACalculator = lazy(() => import("@/features/other/GPA"))


const MainRouter = () => {
  return useRoutes([{
    path: "/", element: <MainLayout/>, children: [
      // {index: true, element: <Navigate to={'bmi-calculator'} />},
      {index: true, element: <HomePage />},
      {path: 'home', element: <HomePage />},
      {path: 'bmi-calculator', element: <BMICalculator/>},
      {path: 'mortgage-calculator', element: <MortgageCalculator/>},
      {path: 'loan-payoff-calculator', element: <LoanPayOffCalculator/>},
      {path: 'credit-card-payoff-calculator', element: <CreditCardCalculator/>},
      {path: 'tip-calculator', element: <TipCalculator/>},
      {path: 'percent-off-calculator', element: <PercentOffCalculator/>},
      {path: 'circumference-calculator', element: <CircumferenceCalculator/>},
      {path: 'peptide-calculator', element: <PeptideCalculator/>},
      {path: 'asphalt-tonnage-calculator', element: <AsphaltTonnageCalculator/>},
      {path: 'paint-coverage-calculator', element: <PaintCoverageCalculator/>},
      {path: 'gpa-calculator', element: <GPACalculator/>}
    ]
  }])
}
export default MainRouter;