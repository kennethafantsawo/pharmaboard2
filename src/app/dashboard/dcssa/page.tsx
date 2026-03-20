"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getDcssa } from "@/lib/mock-data";

export default function DcssaPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const load = () => setData(getDcssa());
    load();
    window.addEventListener('storage-update', load);
    return () => window.removeEventListener('storage-update', load);
  }, []);

  const hasData = data.length > 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">DCSSA / Services à Crédit</h1>
      
      <Tabs defaultValue="dcssa">
        <TabsList className="bg-white border p-1 rounded-xl mb-6">
          <TabsTrigger value="dcssa">Service DCSSA</TabsTrigger>
          <TabsTrigger value="koundjoure">Service KOUNDJOURÉ</TabsTrigger>
        </TabsList>

        <TabsContent value="dcssa" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Consommation Mensuelle DCSSA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {hasData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} F CFA`]} />
                      <Bar dataKey="montant" name="Montant Consommé" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground italic">Aucune donnée de consommation DCSSA.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Mois</TableHead>
                  <TableHead className="text-right">Montant Consommé</TableHead>
                  <TableHead className="text-right">Nombre de Dossiers</TableHead>
                  <TableHead className="text-right font-bold">Solde Cumulé</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hasData ? (
                  data.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.mois}</TableCell>
                      <TableCell className="text-right">{Number(row.montant).toLocaleString()} F CFA</TableCell>
                      <TableCell className="text-right">{row.dossiers}</TableCell>
                      <TableCell className="text-right font-bold text-primary">{Number(row.solde).toLocaleString()} F CFA</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Aucun dossier enregistré pour le moment.</TableCell>
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
