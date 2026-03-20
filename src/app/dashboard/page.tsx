"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowUpRight, Coins, Package, Info, Calendar } from "lucide-react";
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
import { KPI_OVERVIEW, RECETTES_DATA } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground">Bienvenue, Directrice. Voici l'état actuel de la pharmacie.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 bg-white">Mise à jour: Aujourd'hui, 14:30</Badge>
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

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Événements à venir
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-primary">
              <p className="text-sm font-bold">Inventaire Mensuel</p>
              <p className="text-xs text-muted-foreground">Demain, 08:00 - Zone Stock A</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-secondary">
              <p className="text-sm font-bold">Réunion Fournisseurs</p>
              <p className="text-xs text-muted-foreground">Vendredi, 10:30 - Bureau</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-orange-400">
              <p className="text-sm font-bold">Vérification des Périmés</p>
              <p className="text-xs text-muted-foreground">25 Janvier - Équipe Assistante</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}