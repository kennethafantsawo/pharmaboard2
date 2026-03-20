
"use client";

import { useState, useEffect } from "react";
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
import { getRecettes } from "@/lib/mock-data";

export default function RecettesPage() {
  const [period, setPeriod] = useState("mois");
  const [recettes, setRecettes] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      setRecettes(getRecettes());
    };
    loadData();
    window.addEventListener('storage-update', loadData);
    return () => window.removeEventListener('storage-update', loadData);
  }, []);

  const totalRecettes = recettes.reduce((acc, curr) => acc + (Number(curr.brute) || 0), 0);
  const totalTierPayant = recettes.reduce((acc, curr) => acc + (Number(curr.tierPayant) || 0), 0);
  const totalCredit = recettes.reduce((acc, curr) => acc + (Number(curr.credit) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Recettes</h1>
          <p className="text-muted-foreground">Suivi des encaissements, tiers payant et crédits patients.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-primary text-white border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Total Brute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRecettes.toLocaleString()} F CFA</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Part Assurée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTierPayant.toLocaleString()} F CFA</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crédits Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredit.toLocaleString()} F CFA</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Solde Global</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalRecettes + totalTierPayant + totalCredit).toLocaleString()} F CFA</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Evolution Graphique</CardTitle>
          <CardDescription>Visualisation des recettes par date.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            {recettes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recettes}>
                  <defs>
                    <linearGradient id="colorBrute" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} F CFA`]} />
                  <Area 
                    type="monotone" 
                    dataKey="brute" 
                    name="Recette Brute" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorBrute)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground italic">En attente de saisie de données dans l'onglet Mise à Jour.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader>
          <CardTitle>Détails des Saisies</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Brute Encaissée</TableHead>
                <TableHead className="text-right">Tiers Payant</TableHead>
                <TableHead className="text-right">Crédit</TableHead>
                <TableHead className="text-right">Remises</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recettes.length > 0 ? (
                recettes.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{row.date}</TableCell>
                    <TableCell className="text-right">{Number(row.brute).toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{Number(row.tierPayant).toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{Number(row.credit).toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{Number(row.remises).toLocaleString()} F CFA</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Aucune recette enregistrée.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
