
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, FileText, Clock } from "lucide-react";
import { getFactures, getFournisseurs } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function FournisseursPage() {
  const [factures, setFactures] = useState<any[]>([]);
  const [fournisseurs, setFournisseurs] = useState<any[]>([]);

  useEffect(() => {
    // Initial load
    setFactures(getFactures());
    setFournisseurs(getFournisseurs());

    const refresh = () => {
      setFactures(getFactures());
      setFournisseurs(getFournisseurs());
    };
    window.addEventListener('storage-update', refresh);
    return () => window.removeEventListener('storage-update', refresh);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Fournisseurs</h1>
      
      <Tabs defaultValue="factures" className="w-full">
        <TabsList className="bg-white border p-1 rounded-xl mb-6">
          <TabsTrigger value="factures" className="gap-2"><FileText className="w-4 h-4" /> Liste des Factures</TabsTrigger>
          <TabsTrigger value="list" className="gap-2"><Package className="w-4 h-4" /> Nos Fournisseurs</TabsTrigger>
        </TabsList>

        <TabsContent value="factures" className="space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {factures.length > 0 ? (
                  factures.map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.fournisseur}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell className="text-right font-semibold">{Number(row.montant).toLocaleString()} F CFA</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 gap-1 border-none">
                          <Clock className="w-3 h-3" /> {row.statut}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={4} className="text-center py-8">Aucune facture enregistrée.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card className="border-none shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Nom du Fournisseur</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fournisseurs.length > 0 ? (
                  fournisseurs.map((f: any) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-bold">{f.name}</TableCell>
                      <TableCell>{f.contact || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={2} className="text-center py-8">Aucun fournisseur enregistré.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
