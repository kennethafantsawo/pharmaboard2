"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const IMPLANTS_DATA = [
  { mois: 'Janvier', f1: 1500, f2: 800, total: 2300 },
  { mois: 'Février', f1: 1750, f2: 950, total: 2700 },
  { mois: 'Mars', f1: 1600, f2: 900, total: 2500 },
];

export default function ImplantsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Consommation Implants</h1>
      
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Évolution par Fournisseur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={IMPLANTS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="f1" name="Fournisseur A" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="f2" name="Fournisseur B" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Mois</TableHead>
              <TableHead className="text-right">Fournisseur A</TableHead>
              <TableHead className="text-right">Fournisseur B</TableHead>
              <TableHead className="text-right font-bold">TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {IMPLANTS_DATA.map((row) => (
              <TableRow key={row.mois}>
                <TableCell className="font-medium">{row.mois}</TableCell>
                <TableCell className="text-right">{row.f1.toLocaleString()} €</TableCell>
                <TableCell className="text-right">{row.f2.toLocaleString()} €</TableCell>
                <TableCell className="text-right font-bold text-primary">{row.total.toLocaleString()} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}