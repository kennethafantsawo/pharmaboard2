-- Schema SQL pour Supabase / PostgreSQL (Pharmacie de l'Aéroport)

-- Table des Fournisseurs
CREATE TABLE fournisseurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des Recettes Journalières
CREATE TABLE recettes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  brute_comptant NUMERIC DEFAULT 0,
  part_assuree NUMERIC DEFAULT 0,
  tiers_payant NUMERIC DEFAULT 0,
  credit_patient NUMERIC DEFAULT 0,
  remises NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des Assurances
CREATE TABLE assurances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type_contrat TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dettes envers les Fournisseurs
CREATE TABLE dettes_fournisseurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fournisseur_id UUID REFERENCES fournisseurs(id),
  montant_du NUMERIC DEFAULT 0,
  derniere_facture TEXT,
  date_update TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créances Assurances (Montants dus par les assurances)
CREATE TABLE creances_assurances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assurance_id UUID REFERENCES assurances(id),
  periode TEXT, -- Format "YYYY-MM"
  montant_du NUMERIC DEFAULT 0,
  date_update TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consommation DCSSA / Koundjouré
CREATE TABLE dcssa_consommation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mois TEXT,
  montant NUMERIC DEFAULT 0,
  nb_dossiers INTEGER DEFAULT 0,
  service TEXT DEFAULT 'DCSSA' -- 'DCSSA' ou 'KOUNDJOURÉ'
);

-- Consommation Implants
CREATE TABLE implants_consommation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mois TEXT,
  fournisseur_a NUMERIC DEFAULT 0,
  fournisseur_b NUMERIC DEFAULT 0
);