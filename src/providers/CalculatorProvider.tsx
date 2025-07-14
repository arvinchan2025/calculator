import React, {useContext, useState} from "react";
import CalculatorForm from "@/layout/CalculatorForm";
import {useTranslation} from "react-i18next";

type CalculatorContextProps = Record<string, any>

export const CalculatorContext = React.createContext<CalculatorContextProps>({
  direction: "ltr",
});

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext)
  if (!context) {
    throw new Error('The snackbar provider not found!')
  }
  return context
}

const CalculatorProvider = (props: any) => {
  const {t} = useTranslation();
  const [result, setResult] = useState<any>(null);
  const calculators = {
    health: [
      {key: 'bmi', label: t("calculator.bmi"), href: '/bmi-calculator'},
    ],
    financial: [
      {key: 'mortgage', label: t("calculator.mortgage"), href: '/mortgage-calculator'},
      {key: 'loanPayoff', label: t("calculator.loanPayoff"), href: '/loan-payoff-calculator'},
      {key: 'percentOff', label: t("calculator.percentOff"), href: '/percent-off-calculator'},
    ],
    construction: [
      {key: 'asphaltTonnage', label: t("calculator.asphaltTonnage"), href: '/asphalt-tonnage-calculator'},
      {key: 'paintCoverage', label: t("calculator.paintCoverage"), href: '/paint-coverage-calculator'},
    ],
    // medicine: [
    //   {key: 'peptide', label: t("calculator.peptide"), href: '/peptide-calculator'},
    // ],
    // math: [
    //   {key: 'circumference', label: t("calculator.circumference"), href: '/circumference-calculator'},
    // ],
    other: [
      {key: 'tip', label: t("calculator.tip"), href: '/tip-calculator'},
      {key: 'circumference', label: t("calculator.circumference"), href: '/circumference-calculator'},
      {key: 'peptide', label: t("calculator.peptide"), href: '/peptide-calculator'},
      {key: 'gpa', label: t("calculator.gpa"), href: '/gpa-calculator'},
    ]
  }
  // const calculators = [
  //   {label: t("calculator.bmi"), href: '/bmi-calculator'},
  //   {label: t("calculator.mortgage"), href: '/mortgage-calculator'},
  //   {label: t("calculator.loanPayoff"), href: '/loan-payoff-calculator'},
  //   {label: t("calculator.tip"), href: '/tip-calculator'},
  //   {label: t("calculator.percentOff"), href: '/percent-off-calculator'},
  //   {label: t("calculator.circumference"), href: '/circumference-calculator'},
  //   {label: t("calculator.peptide"), href: '/peptide-calculator'},
  //   {label: t("calculator.asphaltTonnage"), href: '/asphalt-tonnage-calculator'},
  // ]
  return (
    <CalculatorContext.Provider value={{
      calculators,
      result,
      setResult
    }}>
      {props.children}
    </CalculatorContext.Provider>
  )
}
export default CalculatorProvider