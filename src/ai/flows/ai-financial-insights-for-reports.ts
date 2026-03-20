'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating AI-powered financial insights for reports.
 * It analyzes pharmacy financial data to provide an executive summary, key points of attention, and actionable recommendations.
 *
 * - aiFinancialInsightsForReports - A function that triggers the financial insights generation process.
 * - AiFinancialInsightsForReportsInput - The input type for the aiFinancialInsightsForReports function.
 * - AiFinancialInsightsForReportsOutput - The return type for the aiFinancialInsightsForReports function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiFinancialInsightsForReportsInputSchema = z.object({
  reportingPeriod: z.string().describe('The current reporting period (e.g., "Q1 2026").'),
  previousReportingPeriod: z.string().describe('The previous reporting period used for comparison (e.g., "Q4 2025").'),
  currentPeriodData: z.object({
    totalSales: z.number().describe('Total sales in EUR for the current period.'),
    totalOrders: z.number().describe('Total orders in EUR for the current period.'),
    estimatedGrossMargin: z.number().describe('Estimated gross margin in EUR for the current period.'),
    dcssaConsumption: z.number().describe('Total DCSSA consumption in EUR for the current period.'),
    implantsConsumption: z.number().describe('Total implants consumption in EUR for the current period.'),
    insuranceAmounts: z.number().describe('Total insurance amounts in EUR for the current period.'),
    totalRejectionsLosses: z.number().describe('Total rejections and losses in EUR for the current period.'),
  }).describe('Key financial data for the current reporting period.'),
  evolutionData: z.object({
    salesPercentageChange: z.number().describe('Percentage change in sales compared to the previous period (e.g., 12 for +12%, -8 for -8%).'),
    ordersPercentageChange: z.number().describe('Percentage change in orders compared to the previous period.'),
    rejectionsPercentageChange: z.number().describe('Percentage change in rejections/losses compared to the previous period.'),
  }).describe('Percentage changes compared to the previous reporting period.'),
  specificAlerts: z.array(z.string()).describe('A list of specific alerts or detailed anomalies (e.g., "Assurance ABC: Augmentation rejet de 8%") that the AI should incorporate into points d\'attention.').optional(),
  additionalContext: z.string().describe('Any additional context or strategic objectives for the pharmacy that might influence recommendations.').optional(),
});
export type AiFinancialInsightsForReportsInput = z.infer<typeof AiFinancialInsightsForReportsInputSchema>;

const AiFinancialInsightsForReportsOutputSchema = z.object({
  executiveSummary: z.string().describe('A comprehensive narrative executive summary of the financial performance.'),
  kpiSummary: z.array(z.object({
    label: z.string().describe('Label for the KPI.'),
    value: z.string().describe('Formatted value of the KPI (e.g., "145 600 €").'),
  })).describe('Key Performance Indicators for the current period, formatted as an array of objects.'),
  evolutionSummary: z.array(z.object({
    label: z.string().describe('Label for the evolution metric.'),
    value: z.string().describe('Formatted evolution value (e.g., "↑ +12%", "↓ -5%").'),
  })).describe('Evolution indicators compared to the previous period, formatted as an array of objects.'),
  pointsDAttention: z.array(z.string()).describe('A list of bullet points highlighting specific areas needing attention.'),
  recommendations: z.array(z.string()).describe('A list of bullet points providing actionable recommendations.'),
});
export type AiFinancialInsightsForReportsOutput = z.infer<typeof AiFinancialInsightsForReportsOutputSchema>;

export async function aiFinancialInsightsForReports(input: AiFinancialInsightsForReportsInput): Promise<AiFinancialInsightsForReportsOutput> {
  return aiFinancialInsightsForReportsFlow(input);
}

const aiFinancialInsightsForReportsPrompt = ai.definePrompt({
  name: 'aiFinancialInsightsForReportsPrompt',
  input: { schema: AiFinancialInsightsForReportsInputSchema },
  output: { schema: AiFinancialInsightsForReportsOutputSchema },
  prompt: `You are a highly experienced financial analyst specializing in pharmacy management. Your task is to review the provided financial data for "Pharmacie de l'Aéroport" and generate a comprehensive executive summary, identify key points of attention, and provide actionable recommendations.

The analysis should cover the following aspects:
- Overall financial performance for the current reporting period.
- Comparison with the previous period to highlight trends and significant changes.
- Identification of anomalies or areas requiring further investigation.
- Actionable recommendations for the pharmacy director.

---
**Current Reporting Period: {{{reportingPeriod}}}**

**Key Performance Indicators (KPIs):**
- Total Sales (Recettes): {{currentPeriodData.totalSales}}
- Total Orders (Fournisseurs): {{currentPeriodData.totalOrders}}
- Estimated Gross Margin: {{currentPeriodData.estimatedGrossMargin}}
- DCSSA Consumption: {{currentPeriodData.dcssaConsumption}}
- Implants Consumption: {{currentPeriodData.implantsConsumption}}
- Insurance Amounts: {{currentPeriodData.insuranceAmounts}}
- Total Rejections/Losses: {{currentPeriodData.totalRejectionsLosses}}

---
**Evolution vs. Previous Period ({{{previousReportingPeriod}}}):**
- Sales Evolution: {{evolutionData.salesPercentageChange}}
- Orders Evolution: {{evolutionData.ordersPercentageChange}}
- Rejections Evolution: {{evolutionData.rejectionsPercentageChange}}

{{#if specificAlerts}}
**Specific Alerts/Detailed Anomalies to Integrate:**
{{#each specificAlerts}}
- {{{this}}}
{{/each}}
{{/if}}

{{#if additionalContext}}
**Additional Context:**
{{{additionalContext}}}
{{/if}}

---
Based on the data and context above, please provide the output in a structured JSON format matching the following schema. Ensure all monetary values in the output (in 'kpiSummary') are formatted as strings with the currency symbol and thousands separators (e.g., "123 456,78 €", using comma as the decimal separator). Percentage evolutions (in 'evolutionSummary') should include an arrow and sign (e.g., "↑ +12%", "↓ -5%", "↔ 0%").

```json
{
  "executiveSummary": "",
  "kpiSummary": [
    {"label": "Total Ventes (Recettes)", "value": ""},
    {"label": "Total Commandes (Fournisseurs)", "value": ""},
    {"label": "Marge Brute Estimée", "value": ""},
    {"label": "Consommation DCSSA", "value": ""},
    {"label": "Consommation Implants", "value": ""},
    {"label": "Montants Assurances", "value": ""},
    {"label": "Total Rejets/Pertes", "value": ""}
  ],
  "evolutionSummary": [
    {"label": "Ventes vs {{{previousReportingPeriod}}}", "value": ""},
    {"label": "Commandes vs {{{previousReportingPeriod}}}", "value": ""},
    {"label": "Rejets vs {{{previousReportingPeriod}}}", "value": ""}
  ],
  "pointsDAttention": [
    ""
  ],
  "recommendations": [
    ""
  ]
}
```
`,
});

const aiFinancialInsightsForReportsFlow = ai.defineFlow(
  {
    name: 'aiFinancialInsightsForReportsFlow',
    inputSchema: AiFinancialInsightsForReportsInputSchema,
    outputSchema: AiFinancialInsightsForReportsOutputSchema,
  },
  async (input) => {
    const { output } = await aiFinancialInsightsForReportsPrompt(input);
    return output!;
  }
);
