"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Lock, FileUp, Save, History, Database, PlusCircle, CreditCard, Building2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOURNISSEURS_DATA, ASSURANCES_DATA } from "@/lib/mock-data";

export default function AdminDataPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const { toast } = useToast();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === "admin123") {
      setIsAuthenticated(true);
      toast({ title: "Mode Administrateur Activé", description: "Vous pouvez maintenant modifier les données." });
    } else {
      toast({ variant: "destructive", title: "Accès refusé", description: "Mot de passe incorrect." });
    }
  };

  const handleSave = (category: string) => {
    toast({
      title: "Données enregistrées",
      description: `Les modifications pour ${category} ont été prises en compte.`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md border-none shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-orange-600" />
            </div>
            <CardTitle>Protection Supplémentaire</CardTitle>
            <CardDescription>Veuillez entrer le mot de passe administrateur pour accéder à la mise à jour des données.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminPass">Mot de passe secret</Label>
                <Input 
                  id="adminPass" 
                  type="password" 
                  value={adminPass} 
                  onChange={(e) => setAdminPass(e.target.value)} 
                  placeholder="••••••••" 
                />
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">Déverrouiller</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
            <Database className="text-orange-600" /> Mise à Jour des Données
          </h1>
          <p className="text-muted-foreground">Ajoutez ou modifiez les entrées journalières, les fournisseurs et les assurances.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileUp className="w-4 h-4" /> Télécharger Template
          </Button>
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" /> Logs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recettes" className="w-full">
        <TabsList className="bg-white border border-border p-1 h-12 shadow-sm rounded-xl mb-6 flex overflow-x-auto whitespace-nowrap">
          <TabsTrigger value="recettes">Recettes</TabsTrigger>
          <TabsTrigger value="fournisseurs">Fournisseurs</TabsTrigger>
          <TabsTrigger value="assurances">Assurances</TabsTrigger>
          <TabsTrigger value="excel" className="text-primary font-bold">Import Excel</TabsTrigger>
        </TabsList>

        <TabsContent value="recettes">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Saisie Manuelle - Recettes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date de l'opération</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Recette Brute (Comptants)</Label>
                  <Input type="number" placeholder="0 F CFA" />
                </div>
                <div className="space-y-2">
                  <Label>Part Assurée (Recette)</Label>
                  <Input type="number" placeholder="0 F CFA" />
                </div>
                <div className="space-y-2">
                  <Label>Tiers Payant</Label>
                  <Input type="number" placeholder="0 F CFA" />
                </div>
                <div className="space-y-2">
                  <Label>Crédits Patients</Label>
                  <Input type="number" placeholder="0 F CFA" />
                </div>
                <div className="space-y-2">
                  <Label>Remises Autorisées</Label>
                  <Input type="number" placeholder="0 F CFA" />
                </div>
              </div>
              <Button className="w-full bg-primary gap-2" onClick={() => handleSave("Recettes")}>
                <Save className="w-4 h-4" /> Enregistrer les Recettes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fournisseurs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-primary" /> Nouveau Fournisseur
                </CardTitle>
                <CardDescription>Ajouter une nouvelle entité à la base de données.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom du Fournisseur / Grossiste</Label>
                  <Input placeholder="Ex: Grossiste Pharma X" />
                </div>
                <div className="space-y-2">
                  <Label>Contact (Téléphone/Email)</Label>
                  <Input placeholder="Contact principal" />
                </div>
                <Button className="w-full" onClick={() => handleSave("Nouveau Fournisseur")}>
                  Créer le Fournisseur
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-600" /> Montants Dus (Dettes)
                </CardTitle>
                <CardDescription>Mettre à jour le montant total dû à un fournisseur.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sélectionner le Fournisseur</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {FOURNISSEURS_DATA.map(f => (
                        <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Montant Total Actualisé (F CFA)</Label>
                  <Input type="number" placeholder="Montant total de la dette" />
                </div>
                <div className="space-y-2">
                  <Label>Dernière Facture associée (N°)</Label>
                  <Input placeholder="Optionnel" />
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={() => handleSave("Dettes Fournisseurs")}>
                  Actualiser le Solde
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assurances">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Nouvelle Assurance
                </CardTitle>
                <CardDescription>Ajouter une nouvelle compagnie d'assurance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de l'Assurance</Label>
                  <Input placeholder="Ex: AXA, Allianz..." />
                </div>
                <div className="space-y-2">
                  <Label>Type de contrat</Label>
                  <Input placeholder="Tiers-payant / Remboursement direct" />
                </div>
                <Button className="w-full" onClick={() => handleSave("Nouvelle Assurance")}>
                  Créer l'Assurance
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" /> Montants à Recevoir
                </CardTitle>
                <CardDescription>Mettre à jour les sommes que les assurances doivent à la pharmacie.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sélectionner l'Assurance</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir l'assurance" />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSURANCES_DATA.map(a => (
                        <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Période Concernée</Label>
                  <Input type="month" />
                </div>
                <div className="space-y-2">
                  <Label>Montant Dû par l'Assurance (F CFA)</Label>
                  <Input type="number" placeholder="0 F CFA" />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleSave("Montants Assurances")}>
                  Mettre à Jour la Créance
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="excel">
          <Card className="border-none shadow-md border-2 border-dashed border-primary/20">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FileUp className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Importation en Masse</h3>
              <p className="text-muted-foreground text-center max-w-sm mb-6">
                Utilisez notre template Excel pour importer toutes vos données du mois en une seule fois.
              </p>
              <Input type="file" className="hidden" id="excel-upload" accept=".xlsx,.xls" />
              <Label htmlFor="excel-upload" className="cursor-pointer bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                Sélectionner le fichier
              </Label>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}