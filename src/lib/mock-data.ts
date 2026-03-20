import { supabase } from './supabase';

// Fonctions d'accès aux données via Supabase

export const getRecettes = async () => {
  const { data, error } = await supabase
    .from('recettes')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const addRecette = async (recette: any) => {
  const { data, error } = await supabase
    .from('recettes')
    .insert([recette])
    .select();
  if (error) throw error;
  return data;
};

export const getFournisseurs = async () => {
  const { data, error } = await supabase
    .from('fournisseurs')
    .select('*')
    .order('name');
  if (error) throw error;
  return data || [];
};

export const addFournisseur = async (fournisseur: any) => {
  const { data, error } = await supabase
    .from('fournisseurs')
    .insert([fournisseur])
    .select();
  if (error) throw error;
  return data;
};

export const deleteFournisseur = async (id: string) => {
  const { error } = await supabase
    .from('fournisseurs')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const getAssurances = async () => {
  const { data, error } = await supabase
    .from('assurances')
    .select('*')
    .order('name');
  if (error) throw error;
  return data || [];
};

export const addAssurance = async (assurance: any) => {
  const { data, error } = await supabase
    .from('assurances')
    .insert([assurance])
    .select();
  if (error) throw error;
  return data;
};

export const deleteAssurance = async (id: string) => {
  const { error } = await supabase
    .from('assurances')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const getFactures = async () => {
  const { data, error } = await supabase
    .from('factures')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const addFacture = async (facture: any) => {
  const { data, error } = await supabase
    .from('factures')
    .insert([{ ...facture, statut: "En attente" }])
    .select();
  if (error) throw error;
  return data;
};

export const getCreancesAssurance = async () => {
  const { data, error } = await supabase
    .from('creances_assurance')
    .select('*');
  if (error) throw error;
  return data || [];
};

export const updateCreanceAssurance = async (creance: any) => {
  const { data, error } = await supabase
    .from('creances_assurance')
    .insert([creance])
    .select();
  if (error) throw error;
  return data;
};

export const getRejets = async () => {
  const { data, error } = await supabase
    .from('rejets')
    .select('*');
  if (error) throw error;
  return data || [];
};

export const getDcssa = async () => {
  const { data, error } = await supabase
    .from('dcssa')
    .select('*');
  if (error) throw error;
  return data || [];
};

export const getImplants = async () => {
  const { data, error } = await supabase
    .from('implants')
    .select('*');
  if (error) throw error;
  return data || [];
};

// Calcul des indicateurs clés (KPI) - Version asynchrone
export const getKPIs = async () => {
  const [recettes, factures, rejets] = await Promise.all([
    getRecettes(),
    getFactures(),
    getRejets()
  ]);
  
  const totalRecettes = recettes.reduce((acc: number, r: any) => acc + (Number(r.brute) || 0), 0);
  const totalCommandes = factures.reduce((acc: number, f: any) => acc + (Number(f.montant) || 0), 0);
  const totalRejets = rejets.reduce((acc: number, r: any) => acc + (Number(r.montant) || 0), 0);
  
  return {
    entreesMois: totalRecettes,
    sortiesMois: totalCommandes,
    marge: totalRecettes - totalCommandes,
    rejets: totalRejets
  };
};