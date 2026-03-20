"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Package, FileText, RotateCcw, CheckCircle2, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COMMANDES_DATA, FACTURES_DATA } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function FournisseursPage() {
  const [activeSubTab, setActiveSubTab] = useState("commandes");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Fournisseurs</h1>
          <p className="text-muted-foreground">Gestion des commandes, facturation et retours produits.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter Fournisseur
        </Button>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="bg-white border border-border p-1 h-12 shadow-sm rounded-xl mb-6">
          <TabsTrigger value="commandes" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Package className="w-4 h-4" /> Commandes
          </TabsTrigger>
          <TabsTrigger value="factures" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <FileText className="w-4 h-4" /> Factures
          </TabsTrigger>
          <TabsTrigger value="retours" className="rounded-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <RotateCcw className="w-4 h-4" /> Retours Produits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="commandes" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Evolution des Commandes</CardTitle>
              <CardDescription>Par fournisseur sur les derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMMANDES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="fournisseur" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} F CFA`]} />
                    <Legend />
                    <Bar dataKey="jan" name="Janvier" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="feb" name="Février" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mar" name="Mars" fill="#EAB308" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Fournisseur / Grossiste</TableHead>
                  <TableHead className="text-right">Janvier</TableHead>
                  <TableHead className="text-right">Février</TableHead>
                  <TableHead className="text-right">Mars</TableHead>
                  <TableHead className="text-right font-bold">TOTAL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMMANDES_DATA.map((row) => (
                  <TableRow key={row.fournisseur}>
                    <TableCell className="font-medium">{row.fournisseur}</TableCell>
                    <TableCell className="text-right">{row.jan.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{row.feb.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{row.mar.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right font-bold">{row.total.toLocaleString()} F CFA</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="factures" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-none shadow-md bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Total Payé</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">3 700 F CFA</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-orange-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">Total Dû</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-800">1 750 F CFA</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Date Facture</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FACTURES_DATA.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.fournisseur}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell className="text-right font-semibold">{row.montant.toLocaleString()} F CFA</TableCell>
                    <TableCell>
                      {row.statut === "Payée" ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 border-none">
                          <CheckCircle2 className="w-3 h-3" /> {row.statut}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 gap-1 border-none">
                          <Clock className="w-3 h-3" /> {row.statut}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.statut !== "Payée" && (
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                          Régler
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="retours" className="space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead className="text-right">Montant Retour</TableHead>
                  <TableHead>Raison</TableHead>
                  <TableHead>Statut Remboursement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Grossiste Pharma A</TableCell>
                  <TableCell>Janvier</TableCell>
                  <TableCell className="text-right font-semibold">150 F CFA</TableCell>
                  <TableCell>Produits défectueux</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-none">Remboursé</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">BioCare Solutions</TableCell>
                  <TableCell>Janvier</TableCell>
                  <TableCell className="text-right font-semibold">300 F CFA</TableCell>
                  <TableCell>Commande erronée</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-none">En attente</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}