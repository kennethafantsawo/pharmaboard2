"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DCSSA_DATA = [
  { mois: 'Janvier', montant: 2500, dossiers: 18, solde: 2500 },
  { mois: 'Février', montant: 2750, dossiers: 22, solde: 5250 },
  { mois: 'Mars', montant: 2300, dossiers: 16, solde: 7550 },
];

export default function DcssaPage() {
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
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DCSSA_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} F CFA`]} />
                    <Bar dataKey="montant" name="Montant Consommé" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
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
                {DCSSA_DATA.map((row) => (
                  <TableRow key={row.mois}>
                    <TableCell className="font-medium">{row.mois}</TableCell>
                    <TableCell className="text-right">{row.montant.toLocaleString()} F CFA</TableCell>
                    <TableCell className="text-right">{row.dossiers}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{row.solde.toLocaleString()} F CFA</TableCell>
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