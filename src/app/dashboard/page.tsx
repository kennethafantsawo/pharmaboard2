"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Coins, Package, Info, Wand2 } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { KPI_OVERVIEW, RECETTES_DATA } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiFinancialInsightsForReports, type AiFinancialInsightsForReportsOutput } from "@/ai/flows/ai-financial-insights-for-reports";

export default function DashboardOverview() {
  const [insights, setInsights] = useState<AiFinancialInsightsForReportsOutput | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchAiInsights = async () => {
    setLoadingInsights(true);
    try {
      const data = await aiFinancialInsightsForReports({
        reportingPeriod: "Janvier 2026",
        previousReportingPeriod: "Décembre 2025",
        currentPeriodData: {
          totalSales: KPI_OVERVIEW.entreesMois,
          totalOrders: KPI_OVERVIEW.sortiesMois,
          estimatedGrossMargin: KPI_OVERVIEW.entreesMois - KPI_OVERVIEW.sortiesMois,
          dcssaConsumption: 12500,
          implantsConsumption: 24300,
          insuranceAmounts: 98200,
          totalRejectionsLosses: 3200,
        },
        evolutionData: {
          salesPercentageChange: 12,
          ordersPercentageChange: 8,
          rejectionsPercentageChange: -5,
        }
      });
      setInsights(data);
    } catch (error) {
      console.error("AI Insight error:", error);
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground">Bienvenue, Directrice. Voici l'état actuel de la pharmacie.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 bg-white">Mise à jour: Aujourd'hui, 14:30</Badge>
          <Button onClick={fetchAiInsights} disabled={loadingInsights} className="gap-2 bg-secondary hover:bg-secondary/90 text-white">
            <Wand2 className="w-4 h-4" />
            {loadingInsights ? "Analyse..." : "Analyse IA"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-md overflow-hidden group">
          <div className="h-1 bg-primary w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventes (Mois)</CardTitle>
            <Coins className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{KPI_OVERVIEW.entreesMois.toLocaleString()} €</div>
            <div className="flex items-center text-xs text-green-600 mt-1 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden group">
          <div className="h-1 bg-orange-400 w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commandes (Mois)</CardTitle>
            <Package className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{KPI_OVERVIEW.sortiesMois.toLocaleString()} €</div>
            <div className="flex items-center text-xs text-green-600 mt-1 font-medium">
              <TrendingDown className="h-3 w-3 mr-1" />
              -8% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden group">
          <div className="h-1 bg-secondary w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Marge Estimée</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(KPI_OVERVIEW.entreesMois - KPI_OVERVIEW.sortiesMois).toLocaleString()} €</div>
            <div className="flex items-center text-xs text-green-600 mt-1 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden group">
          <div className="h-1 bg-red-400 w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejets / Pertes</CardTitle>
            <Info className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 200 €</div>
            <div className="flex items-center text-xs text-red-600 mt-1 font-medium">
              <TrendingDown className="h-3 w-3 mr-1" />
              +5% d'anomalies
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Evolution Entrées vs Sorties</CardTitle>
            <CardDescription>Comparaison journalière sur les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RECETTES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="brute" name="Ventes" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="tierPayant" name="Commandes" stroke="hsl(var(--secondary))" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {insights ? (
            <Card className="border-none shadow-md bg-primary text-white h-full overflow-y-auto max-h-[500px]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  <CardTitle className="text-lg">Analyses de l'IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm opacity-80 uppercase tracking-wider">Résumé Exécutif</h4>
                  <p className="text-sm leading-relaxed">{insights.executiveSummary}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-white/20">
                  <h4 className="font-semibold text-sm opacity-80 uppercase tracking-wider">Points d'Attention</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {insights.pointsDAttention.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="space-y-2 pt-2 border-t border-white/20">
                  <h4 className="font-semibold text-sm opacity-80 uppercase tracking-wider">Recommandations</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {insights.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-md h-full flex flex-col items-center justify-center p-8 text-center bg-muted/30 border-dashed border-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <Info className="text-muted-foreground w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Pas encore d'analyse IA</h3>
              <p className="text-sm text-muted-foreground mb-6">Cliquez sur le bouton "Analyse IA" pour générer des insights stratégiques basés sur vos données.</p>
              <Button onClick={fetchAiInsights} variant="outline" className="gap-2">
                <Wand2 className="w-4 h-4" />
                Générer maintenant
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}