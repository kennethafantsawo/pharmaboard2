"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getImplants } from "@/lib/mock-data";

export default function ImplantsPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const load = () => setData(getImplants());
    load();
    window.addEventListener('storage-update', load);
    return () => window.removeEventListener('storage-update', load);
  }, []);

  const hasData = data.length > 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Consommation Implants</h1>
      
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Évolution par Fournisseur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} F CFA`]} />
                  <Legend />
                  <Line type="monotone" dataKey="f1" name="Fournisseur A" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="f2" name="Fournisseur B" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground italic">Aucune donnée de consommation d'implants.</p>
            )}
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
            {hasData ? (
              data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{row.mois}</TableCell>
                  <TableCell className="text-right">{Number(row.f1).toLocaleString()} F CFA</TableCell>
                  <TableCell className="text-right">{Number(row.f2).toLocaleString()} F CFA</TableCell>
                  <TableCell className="text-right font-bold text-primary">{Number(row.total).toLocaleString()} F CFA</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Aucun implant enregistré.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
