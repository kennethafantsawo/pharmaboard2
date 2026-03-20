export const RECETTES_DATA = [
  { period: "01/01", brute: 4500, tierPayant: 3200, credit: 800, remises: 150 },
  { period: "02/01", brute: 5200, tierPayant: 3800, credit: 900, remises: 180 },
  { period: "03/01", brute: 4800, tierPayant: 3400, credit: 750, remises: 160 },
  { period: "04/01", brute: 6100, tierPayant: 4500, credit: 1100, remises: 220 },
  { period: "05/01", brute: 5500, tierPayant: 4100, credit: 950, remises: 190 },
  { period: "06/01", brute: 5900, tierPayant: 4300, credit: 1050, remises: 210 },
  { period: "07/01", brute: 5300, tierPayant: 3900, credit: 850, remises: 170 },
];

export const FOURNISSEURS_DATA = [
  { id: '1', name: 'Grossiste Pharma A', contact: '01 23 45 67 89', email: 'contact@pharma-a.com', address: '123 Rue de la Santé, Paris' },
  { id: '2', name: 'BioCare Solutions', contact: '02 34 56 78 90', email: 'sales@biocare.fr', address: '45 Ave de l\'Innovation, Lyon' },
  { id: '3', name: 'MedLink Distribution', contact: '03 45 67 89 01', email: 'info@medlink.com', address: '78 Boulevard Médical, Marseille' },
];

export const COMMANDES_DATA = [
  { fournisseur: ' Grossiste Pharma A', jan: 1500, feb: 1800, mar: 2100, total: 5400 },
  { fournisseur: 'BioCare Solutions', jan: 2000, feb: 2200, mar: 1900, total: 6100 },
  { fournisseur: 'MedLink Distribution', jan: 800, feb: 950, mar: 1100, total: 2850 },
];

export const FACTURES_DATA = [
  { id: 'f1', fournisseur: 'Grossiste Pharma A', montant: 1500, date: '15/01/2026', statut: 'Payée' },
  { id: 'f2', fournisseur: 'Grossiste Pharma A', montant: 800, date: '28/01/2026', statut: 'À payer' },
  { id: 'f3', fournisseur: 'BioCare Solutions', montant: 2200, date: '10/01/2026', statut: 'Payée' },
  { id: 'f4', fournisseur: 'MedLink Distribution', montant: 950, date: '20/01/2026', statut: 'À payer' },
];

export const ASSURANCES_DATA = [
  { id: 'as1', name: 'Assurance Allianz', consumed: 15500 },
  { id: 'as2', name: 'AXA Santé', consumed: 12300 },
  { id: 'as3', name: 'Mutuelle Générale', consumed: 8900 },
];

export const KPI_OVERVIEW = {
  entreesJour: 5420,
  entreesMois: 145600,
  sortiesJour: 3850,
  sortiesMois: 78500,
};