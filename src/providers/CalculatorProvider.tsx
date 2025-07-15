import React, {useContext, useState} from "react";
import CalculatorForm from "@/layout/CalculatorForm";
import {useTranslation} from "react-i18next";
import {
  Accessibility,
  AccountBalance,
  AddRoad,
  Checklist,
  FormatColorFill,
  House,
  PriceCheck,
  Receipt,
  Link, BlurCircular
} from "@mui/icons-material";

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
      {
        key: 'bmi',
        label: t("calculator.bmi"),
        href: '/bmi-calculator',
        icon: <Accessibility />
      },
    ],
    financial: [
      {
        key: 'mortgage',
        label: t("calculator.mortgage"),
        href: '/mortgage-calculator',
        icon: <House />
      },
      {
        key: 'loanPayoff',
        label: t("calculator.loanPayoff"),
        href: '/loan-payoff-calculator',
        icon: <AccountBalance/>
      },
      {
        key: 'percentOff',
        label: t("calculator.percentOff"),
        href: '/percent-off-calculator',
        icon: <PriceCheck />
      },
    ],
    construction: [
      {
        key: 'asphaltTonnage',
        label: t("calculator.asphaltTonnage"),
        href: '/asphalt-tonnage-calculator',
        icon: <AddRoad />
      },
      {
        key: 'paintCoverage',
        label: t("calculator.paintCoverage"),
        href: '/paint-coverage-calculator',
        icon: <FormatColorFill />
      },
    ],
    // medicine: [
    //   {key: 'peptide', label: t("calculator.peptide"), href: '/peptide-calculator'},
    // ],
    // math: [
    //   {key: 'circumference', label: t("calculator.circumference"), href: '/circumference-calculator'},
    // ],
    other: [
      {
        key: 'tip',
        label: t("calculator.tip"),
        href: '/tip-calculator',
        icon: <Receipt />
      },
      {
        key: 'circumference',
        label: t("calculator.circumference"),
        href: '/circumference-calculator',
        icon: <BlurCircular />
      },
      {
        key: 'peptide',
        label: t("calculator.peptide"),
        href: '/peptide-calculator',
        icon: <Link />
      },
      {
        key: 'gpa',
        label: t("calculator.gpa"),
        href: '/gpa-calculator',
        icon: <Checklist />
      },
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