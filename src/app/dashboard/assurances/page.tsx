"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Shield, AlertTriangle, Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ASSURANCES_DATA } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const REJETS_DATA = [
  { insurance: "Assurance Allianz", montant: 150, raison: "Tiers rejeté", date: "15/01/2026", periode: "Janvier" },
  { insurance: "AXA Santé", montant: 75, raison: "Dépassement limites", date: "18/01/2026", periode: "Janvier" },
  { insurance: "Mutuelle Générale", montant: 200, raison: "Non couvert", date: "22/01/2026", periode: "Janvier" },
];

export default function AssurancesPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Assurances</h1>
          <p className="text-muted-foreground">Suivi des remboursements, consommations et gestion des rejets.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle Assurance
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border border-border p-1 h-12 shadow-sm rounded-xl mb-6">
          <TabsTrigger value="all" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Shield className="w-4 h-4" /> Liste Assurances
          </TabsTrigger>
          {ASSURANCES_DATA.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
              {a.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="rejets" className="rounded-lg gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
            <AlertTriangle className="w-4 h-4" /> Rejets / Pertes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ASSURANCES_DATA.map(a => (
              <Card key={a.id} className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab(a.id)}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-bold">{a.name}</CardTitle>
                  <Badge variant="outline">Actif</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{a.consumed.toLocaleString()} F CFA</div>
                  <p className="text-sm text-muted-foreground mt-1">Consommation cumulée (Q1 2026)</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {ASSURANCES_DATA.map(a => (
          <TabsContent key={a.id} value={a.id} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-none shadow-md">
                <CardHeader>
                  <CardTitle>Evolution Mensuelle - {a.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { name: 'Jan', val: 4200 }, { name: 'Fév', val: 3800 }, { name: 'Mar', val: 4500 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value.toLocaleString()} F CFA`]} />
                        <Line type="monotone" dataKey="val" name="Montant Consommé" stroke="hsl(var(--primary))" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Détails Assurance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Responsable</span>
                    <span className="font-medium">Jean Dupont</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Contact</span>
                    <span className="font-medium">01 44 55 66 77</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Nb Bénéficiaires</span>
                    <span className="font-medium">145 patients</span>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Générer Bordereau</Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-none shadow-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Mois</TableHead>
                    <TableHead className="text-right">Montant Consommé</TableHead>
                    <TableHead className="text-right">Nombre de Bénéficiaires</TableHead>
                    <TableHead className="text-right">Évolution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Janvier</TableCell>
                    <TableCell className="text-right">4 200 F CFA</TableCell>
                    <TableCell className="text-right">45</TableCell>
                    <TableCell className="text-right">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Février</TableCell>
                    <TableCell className="text-right">3 850 F CFA</TableCell>
                    <TableCell className="text-right">42</TableCell>
                    <TableCell className="text-right text-red-500">↓ -8%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="rejets" className="space-y-6">
          <Card className="border-none shadow-md bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Cumul des Rejets & Pertes</CardTitle>
              <CardDescription className="text-red-700">Toutes assurances confondues pour la période en cours.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900">425 F CFA</div>
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
                  <TableHead>Période</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {REJETS_DATA.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.insurance}</TableCell>
                    <TableCell className="font-bold text-red-600">{row.montant.toLocaleString()} F CFA</TableCell>
                    <TableCell>{row.raison}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.periode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}