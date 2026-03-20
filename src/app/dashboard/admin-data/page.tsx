"use client";

import { useState, useEffect } from "react";
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
import { Lock, Save, Database, PlusCircle, CreditCard, Building2, ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addRecette, addFournisseur, addAssurance, addFacture, updateCreanceAssurance, getFournisseurs, getAssurances } from "@/lib/mock-data";

export default function AdminDataPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [fournisseurs, setFournisseurs] = useState<any[]>([]);
  const [assurances, setAssurances] = useState<any[]>([]);

  const refreshLookups = async () => {
    try {
      const [f, a] = await Promise.all([getFournisseurs(), getAssurances()]);
      setFournisseurs(f);
      setAssurances(a);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshLookups();
    }
  }, [isAuthenticated]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === "admin123") {
      setIsAuthenticated(true);
      toast({ title: "Mode Administrateur Activé", description: "Connexion sécurisée établie." });
    } else {
      toast({ variant: "destructive", title: "Accès refusé", description: "Mot de passe incorrect." });
    }
  };

  // Gestion Recettes
  const [recetteForm, setRecetteForm] = useState({ date: "", brute: "", tierPayant: "", credit: "", remises: "" });
  const handleSaveRecette = async () => {
    if (!recetteForm.date || !recetteForm.brute) return toast({ variant: "destructive", title: "Erreur", description: "Date et Recette Brute obligatoires." });
    setLoading(true);
    try {
      await addRecette(recetteForm);
      toast({ title: "Succès", description: "Recette enregistrée dans Supabase." });
      setRecetteForm({ date: "", brute: "", tierPayant: "", credit: "", remises: "" });
    } catch (e) {
      toast({ variant: "destructive", title: "Erreur", description: "Erreur lors de l'enregistrement." });
    } finally {
      setLoading(false);
    }
  };

  // Gestion Fournisseurs
  const [fournForm, setFournForm] = useState({ name: "", contact: "" });
  const handleCreateFournisseur = async () => {
    if (!fournForm.name) return;
    setLoading(true);
    try {
      await addFournisseur(fournForm);
      await refreshLookups();
      toast({ title: "Succès", description: "Fournisseur créé." });
      setFournForm({ name: "", contact: "" });
    } catch (e) {
      toast({ variant: "destructive", title: "Erreur", description: "Erreur Supabase." });
    } finally {
      setLoading(false);
    }
  };

  const [detteForm, setDetteForm] = useState({ fournisseurId: "", montant: "", factures: "" });
  const handleSaveFacture = async () => {
    if (!detteForm.fournisseurId || !detteForm.montant) return;
    setLoading(true);
    try {
      const f = fournisseurs.find(x => x.id === detteForm.fournisseurId);
      await addFacture({ ...detteForm, fournisseur: f?.name, date: new Date().toISOString().split('T')[0] });
      toast({ title: "Succès", description: "Facture enregistrée." });
      setDetteForm({ fournisseurId: "", montant: "", factures: "" });
    } catch (e) {
      toast({ variant: "destructive", title: "Erreur", description: "Erreur Supabase." });
    } finally {
      setLoading(false);
    }
  };

  // Gestion Assurances
  const [assuForm, setAssuForm] = useState({ name: "", typeContrat: "" });
  const handleCreateAssurance = async () => {
    if (!assuForm.name) return;
    setLoading(true);
    try {
      await addAssurance(assuForm);
      await refreshLookups();
      toast({ title: "Succès", description: "Assurance ajoutée." });
      setAssuForm({ name: "", typeContrat: "" });
    } catch (e) {
      toast({ variant: "destructive", title: "Erreur", description: "Erreur Supabase." });
    } finally {
      setLoading(false);
    }
  };

  const [creanceForm, setCreanceForm] = useState({ assuranceId: "", montant: "" });
  const handleUpdateCreance = async () => {
    if (!creanceForm.assuranceId || !creanceForm.montant) return;
    setLoading(true);
    try {
      const a = assurances.find(x => x.id === creanceForm.assuranceId);
      await updateCreanceAssurance({ ...creanceForm, insurance: a?.name, date: new Date().toISOString().split('T')[0] });
      toast({ title: "Succès", description: "Créance mise à jour." });
      setCreanceForm({ assuranceId: "", montant: "" });
    } catch (e) {
      toast({ variant: "destructive", title: "Erreur", description: "Erreur Supabase." });
    } finally {
      setLoading(false);
    }
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
            <CardDescription>Entrez le mot de passe admin pour modifier Supabase.</CardDescription>
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
            <Database className="text-orange-600" /> Mise à Jour Supabase
          </h1>
          <p className="text-muted-foreground">Gestion des données réelles de la pharmacie.</p>
        </div>
        {loading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
      </div>

      <Tabs defaultValue="recettes" className="w-full">
        <TabsList className="bg-white border border-border p-1 h-12 shadow-sm rounded-xl mb-6 flex overflow-x-auto">
          <TabsTrigger value="recettes">Recettes</TabsTrigger>
          <TabsTrigger value="fournisseurs">Fournisseurs</TabsTrigger>
          <TabsTrigger value="assurances">Assurances</TabsTrigger>
        </TabsList>

        <TabsContent value="recettes">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Saisie Manuelle - Recettes</CardTitle>
              <CardDescription>Tous les montants doivent être saisis en F CFA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date de l'opération</Label>
                  <Input type="date" value={recetteForm.date} onChange={(e) => setRecetteForm({...recetteForm, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Recette Brute (Comptants)</Label>
                  <Input type="number" placeholder="0 F CFA" value={recetteForm.brute} onChange={(e) => setRecetteForm({...recetteForm, brute: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Tiers Payant (Part Assurée)</Label>
                  <Input type="number" placeholder="0 F CFA" value={recetteForm.tierPayant} onChange={(e) => setRecetteForm({...recetteForm, tierPayant: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Crédits Patients</Label>
                  <Input type="number" placeholder="0 F CFA" value={recetteForm.credit} onChange={(e) => setRecetteForm({...recetteForm, credit: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Remises Accordées</Label>
                  <Input type="number" placeholder="0 F CFA" value={recetteForm.remises} onChange={(e) => setRecetteForm({...recetteForm, remises: e.target.value})} />
                </div>
              </div>
              <Button disabled={loading} className="w-full bg-primary gap-2" onClick={handleSaveRecette}>
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom du Grossiste</Label>
                  <Input placeholder="Ex: Labo Pharma" value={fournForm.name} onChange={(e) => setFournForm({...fournForm, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Contact</Label>
                  <Input placeholder="+221 ..." value={fournForm.contact} onChange={(e) => setFournForm({...fournForm, contact: e.target.value})} />
                </div>
                <Button disabled={loading} className="w-full" onClick={handleCreateFournisseur}>Créer le profil</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-600" /> Facture Fournisseur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sélectionner le Fournisseur</Label>
                  <Select onValueChange={(v) => setDetteForm({...detteForm, fournisseurId: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir..." />
                    </SelectTrigger>
                    <SelectContent>
                      {fournisseurs.map(f => (
                        <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Montant Facture (F CFA)</Label>
                  <Input type="number" placeholder="0 F CFA" value={detteForm.montant} onChange={(e) => setDetteForm({...detteForm, montant: e.target.value})} />
                </div>
                <Button disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleSaveFacture}>
                  Enregistrer la Facture
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de l'Assurance</Label>
                  <Input placeholder="Ex: AXA" value={assuForm.name} onChange={(e) => setAssuForm({...assuForm, name: e.target.value})} />
                </div>
                <Button disabled={loading} className="w-full" onClick={handleCreateAssurance}>Enregistrer</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-green-600" /> Créance Assurance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sélectionner l'Assurance</Label>
                  <Select onValueChange={(v) => setCreanceForm({...creanceForm, assuranceId: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir..." />
                    </SelectTrigger>
                    <SelectContent>
                      {assurances.map(a => (
                        <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Montant Créance (F CFA)</Label>
                  <Input type="number" placeholder="0 F CFA" value={creanceForm.montant} onChange={(e) => setCreanceForm({...creanceForm, montant: e.target.value})} />
                </div>
                <Button disabled={loading} className="w-full bg-green-600 hover:bg-green-700" onClick={handleUpdateCreance}>
                  Mettre à Jour la Créance
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}