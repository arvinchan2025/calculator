import Calculator from "@/layout/Calculator";
import {useTranslation} from "react-i18next";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import CalculatorForm from "@/layout/CalculatorForm";
import Grid from "@mui/material/Grid2";
import React from "react";
import {Stack, Typography} from "@mui/material";

const PeptideCalculator = () => {
  const {t} = useTranslation();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      sequence: {
        type: "string",
        title: t('peptide.sequence'),
      },
      pi: {
        type: "string",
        title: t('peptide.pi'),
      }
    },
    required: ["sequence"],
  }

  const uiSchema: UiSchema = {
    pi: {
      'ui:readonly': true,
    },
  }

  const pKaTable: Record<string, number> = {
    N_term: 9.0,
    C_term: 2.0,
    D: 3.9,
    E: 4.3,
    C: 8.3,
    Y: 10.1,
    H: 6.0,
    K: 10.5,
    R: 12.5,
  };

  const positiveResidues = ["H", "K", "R"];
  const negativeResidues = ["D", "E", "C", "Y"];

  const calculateNetCharge = (sequence: string, pH: number): number => {
    let netCharge = 0;

    // N-terminus
    netCharge += 1 / (1 + Math.pow(10, pH - pKaTable.N_term));
    // C-terminus
    netCharge += -1 / (1 + Math.pow(10, pKaTable.C_term - pH));

    for (const aa of sequence) {
      if (positiveResidues.includes(aa)) {
        netCharge += 1 / (1 + Math.pow(10, pH - pKaTable[aa]));
      } else if (negativeResidues.includes(aa)) {
        netCharge += -1 / (1 + Math.pow(10, pKaTable[aa] - pH));
      }
    }

    return netCharge;
  }

  const calculatePI = (sequence: string): number => {
    let low = 0.0;
    let high = 14.0;
    let mid = 7.0;

    while (high - low > 0.001) {
      mid = (low + high) / 2;
      const charge = calculateNetCharge(sequence, mid);
      if (charge > 0) {
        low = mid;
      } else {
        high = mid;
      }
    }

    return mid;
  }

  const onCalculate = (formData: any) => {
    const cleanSeq = formData.sequence.toUpperCase().replace(/[^ACDEFGHIKLMNPQRSTVWY]/g, "");
    const result = calculatePI(cleanSeq);
    return {pi: parseFloat(result.toFixed(2))}
  }

  const onChange = (data: any, id?: string) => {
    if (id === 'root_sequence') {
      return onCalculate(data.formData)
    }
    return {}
  }

  return (
    <Calculator
      category={'MedicineApplication'}
      title={'Peptide Calculator'}
      description={'A Peptide Calculator typically helps you compute properties of a peptide based on its amino acid sequence.'}
    >
      <Grid size={{xs: 12, md: 6}}>
        <CalculatorForm
          schema={schema}
          uiSchema={uiSchema}
          onCalculate={onCalculate}
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <Stack spacing={4}>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              {t("How to calculator pi for peptide?")}
            </Typography>
            <Typography variant={"body1"}>
              {t("To calculate the isoelectric point (pI) of a peptide, you need to find the pH at which the net charge of the peptide is zero. This involves the acid-base properties of the ionizable groups in the peptide.")}
            </Typography>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              {t("pI Calculation Steps (Simplified)")}
            </Typography>
            <ol>
              <li>List all ionizable groups with their pKa values.</li>
              <li>At low pH, all groups are protonated (fully positive).</li>
              <li>Gradually increase the pH, and track when groups deprotonate (lose protons).</li>
              <li>Calculate the net charge at each pH step.</li>
              <li>The pI is the pH at which the net charge = 0.</li>
            </ol>
          </Stack>
          <Stack spacing={2} component={"section"}>
            <Typography variant={"h2"}>
              {"Example:"}
            </Typography>
            <Typography variant={"h3"}>
              {t("Peptide ACDE")}
            </Typography>
            <Typography variant={"h3"}>
              {t("Ionizable groups")}
            </Typography>
            <ul>
              <li>N-term: pKa ~9.0</li>
              <li>C-term: pKa ~2.0</li>
              <li>D (Asp): pKa ~3.9</li>
              <li>E (Glu): pKa ~4.3</li>
            </ul>
            <Typography variant={"h3"}>
              {t("Charges at low pH (e.g., pH 1)")}
            </Typography>
            <ul>
              <li>N-term: +1</li>
              <li>C-term: 0</li>
              <li>D side chain: 0</li>
              <li>E side chain: 0</li>
            </ul>
            <Typography variant={"h3"}>
              {"Net Charge: +1"}
            </Typography>
            <Typography variant={"h3"}>
              {"As pH increases:"}
            </Typography>
            <ul>
              <li>C-terminal deprotonates at pH 2 → charge –1</li>
              <li>D side chain deprotonates at pH 3.9 → charge –1</li>
              <li>E side chain deprotonates at pH 4.3 → charge –1</li>
              <li>N-terminal deprotonates at pH 9 → charge 0</li>
            </ul>
            <Typography variant={"h3"}>
              You find the pH where net charge transitions from positive to negative, and interpolate that value → that’s the pI
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Calculator>
  )
}
export default PeptideCalculator