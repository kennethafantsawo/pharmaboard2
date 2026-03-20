
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, Package, ArrowUpRight, Info } from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart,
  Line,
  Legend
} from 'recharts';
import { getKPIs, getRecettes } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverview() {
  const [kpis, setKpis] = useState(getKPIs());
  const [chartData, setChartData] = useState(getRecettes());

  useEffect(() => {
    const refreshData = () => {
      setKpis(getKPIs());
      setChartData(getRecettes());
    };
    
    window.addEventListener('storage-update', refreshData);
    return () => window.removeEventListener('storage-update', refreshData);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground">Bienvenue, Directrice. Voici l'état actuel de la pharmacie.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 bg-white">Mise à jour: Temps réel</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 bg-primary w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventes (Total)</CardTitle>
            <Coins className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.entreesMois.toLocaleString()} F CFA</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 bg-orange-400 w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commandes (Total)</CardTitle>
            <Package className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.sortiesMois.toLocaleString()} F CFA</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 bg-secondary w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Marge Estimée</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.marge.toLocaleString()} F CFA</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 bg-red-400 w-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejets / Pertes</CardTitle>
            <Info className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 F CFA</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Evolution des Ventes</CardTitle>
          <CardDescription>Graphique basé sur vos saisies journalières (F CFA)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[450px] flex items-center justify-center">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} F CFA`]} />
                  <Legend />
                  <Line type="monotone" dataKey="brute" name="Recettes" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground italic">Aucune donnée à afficher. Ajoutez des recettes dans l'onglet Mise à Jour.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
