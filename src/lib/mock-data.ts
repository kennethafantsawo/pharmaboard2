"use client";

// Utilitaire pour gérer la persistance locale simple pour le prototype
const isClient = typeof window !== 'undefined';

const getStorage = (key: string, defaultValue: any) => {
  if (!isClient) return defaultValue;
  const saved = localStorage.getItem(key);
  try {
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setStorage = (key: string, data: any) => {
  if (isClient) {
    localStorage.setItem(key, JSON.stringify(data));
    // Déclencher un événement personnalisé pour informer les autres composants
    window.dispatchEvent(new Event('storage-update'));
  }
};

// Fonctions d'accès aux données
export const getRecettes = () => getStorage('pharma_recettes', []);
export const addRecette = (data: any) => {
  const current = getRecettes();
  setStorage('pharma_recettes', [...current, { ...data, id: Date.now().toString() }]);
};

export const getFournisseurs = () => getStorage('pharma_fournisseurs', []);
export const addFournisseur = (data: any) => {
  const current = getFournisseurs();
  setStorage('pharma_fournisseurs', [...current, { ...data, id: Date.now().toString() }]);
};
export const deleteFournisseur = (id: string) => {
  const current = getFournisseurs();
  setStorage('pharma_fournisseurs', current.filter((f: any) => f.id !== id));
};

export const getAssurances = () => getStorage('pharma_assurances', []);
export const addAssurance = (data: any) => {
  const current = getAssurances();
  setStorage('pharma_assurances', [...current, { ...data, id: Date.now().toString() }]);
};
export const deleteAssurance = (id: string) => {
  const current = getAssurances();
  setStorage('pharma_assurances', current.filter((a: any) => a.id !== id));
};

export const getFactures = () => getStorage('pharma_factures', []);
export const addFacture = (data: any) => {
  const current = getFactures();
  setStorage('pharma_factures', [...current, { ...data, id: Date.now().toString(), statut: "En attente" }]);
};

export const getCreancesAssurance = () => getStorage('pharma_creances_assurance', []);
export const updateCreanceAssurance = (data: any) => {
  const current = getCreancesAssurance();
  setStorage('pharma_creances_assurance', [...current, { ...data, id: Date.now().toString() }]);
};

export const getRejets = () => getStorage('pharma_rejets', []);

export const getDcssa = () => getStorage('pharma_dcssa', []);

export const getImplants = () => getStorage('pharma_implants', []);

// Calcul des indicateurs clés (KPI)
export const getKPIs = () => {
  const recettes = getRecettes();
  const factures = getFactures();
  const rejets = getRejets();
  
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
