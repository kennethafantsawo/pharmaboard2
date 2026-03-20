"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { RECETTES_DATA } from "@/lib/mock-data";

export default function RecettesPage() {
  const [period, setPeriod] = useState("mois");

  const totalRecettes = RECETTES_DATA.reduce((acc, curr) => acc + curr.brute, 0);
  const hasData = RECETTES_DATA.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Recettes</h1>
          <p className="text-muted-foreground">Suivi des encaissements, tiers payant et crédits patients.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="jour">Journée</TabsTrigger>
              <TabsTrigger value="quinzaine">Quinzaine</TabsTrigger>
              <TabsTrigger value="mois">Mois</TabsTrigger>
              <TabsTrigger value="annee">Année</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-primary text-white border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Total Période</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRecettes.toLocaleString()} F CFA</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Part Assurée (Moyenne)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 F CFA</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Encaissements Comptants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 F CFA</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crédits en Cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 F CFA</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Analyse Visuelle des Recettes</CardTitle>
          <CardDescription>Répartition par catégorie sur la période sélectionnée</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={RECETTES_DATA}>
                  <defs>
                    <linearGradient id="colorBrute" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} F CFA`]} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="brute" 
                    name="Recette Brute Encaissée" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorBrute)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground italic">En attente de saisie de données.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader>
          <CardTitle>Détails des Recettes</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Période</TableHead>
                <TableHead className="text-right">Brute Encaissée</TableHead>
                <TableHead className="text-right">Tiers Payant</TableHead>
                <TableHead className="text-right">Crédit</TableHead>
                <TableHead className="text-right">Remises</TableHead>
                <TableHead className="text-right font-bold">TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasData ? (
                RECETTES_DATA.map((row) => (
                  <TableRow key={row.period} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{row.period}</TableCell>
                    <TableCell className="text-right">{row.brute.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{row.tierPayant.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{row.credit.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{row.remises.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right font-bold text-primary">{(row.brute + row.tierPayant + row.credit).toLocaleString()} F CFA</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Aucune recette enregistrée pour cette période.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
