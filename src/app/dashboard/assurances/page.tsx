
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Plus } from "lucide-react";
import { getAssurances, getRejets } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function AssurancesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [assurances, setAssurances] = useState<any[]>([]);
  const [rejets, setRejets] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      setAssurances(getAssurances());
      setRejets(getRejets());
    };
    loadData();
    window.addEventListener('storage-update', loadData);
    return () => window.removeEventListener('storage-update', loadData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Assurances</h1>
          <p className="text-muted-foreground">Suivi des remboursements, consommations et gestion des rejets.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border border-border p-1 h-12 shadow-sm rounded-xl mb-6 flex overflow-x-auto">
          <TabsTrigger value="all" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Shield className="w-4 h-4" /> Liste Assurances
          </TabsTrigger>
          {assurances.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
              {a.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="rejets" className="rounded-lg gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
            <AlertTriangle className="w-4 h-4" /> Rejets / Pertes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {assurances.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assurances.map(a => (
                <Card key={a.id} className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab(a.id)}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-bold">{a.name}</CardTitle>
                    <Badge variant="outline">Actif</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{(a.consumed || 0).toLocaleString()} F CFA</div>
                    <p className="text-sm text-muted-foreground mt-1">Consommation cumulée</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-none shadow-md py-20">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <Shield className="w-12 h-12 text-muted mb-4" />
                <h3 className="text-lg font-bold">Aucune assurance enregistrée</h3>
                <p className="text-muted-foreground max-w-xs">Commencez par ajouter vos compagnies d'assurances partenaires dans l'onglet Mise à Jour.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {assurances.map(a => (
          <TabsContent key={a.id} value={a.id} className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Détails - {a.name}</CardTitle>
                <CardDescription>Données de consommation pour cette assurance.</CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>Aucune donnée détaillée disponible pour le moment.</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="rejets" className="space-y-6">
          <Card className="border-none shadow-md bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Cumul des Rejets & Pertes</CardTitle>
              <CardDescription className="text-red-700">Toutes assurances confondues.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900">
                {rejets.reduce((acc, r) => acc + (Number(r.montant) || 0), 0).toLocaleString()} F CFA
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Assurance</TableHead>
                  <TableHead>Montant Rejet</TableHead>
                  <TableHead>Raison</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rejets.length > 0 ? (
                  rejets.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.insurance}</TableCell>
                      <TableCell className="font-bold text-red-600">{Number(row.montant).toLocaleString()} F CFA</TableCell>
                      <TableCell>{row.raison}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Aucun rejet enregistré.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
