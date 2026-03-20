-- Script de création des tables pour la Pharmacie de l'Aéroport (Système PharmaFlow)

-- Table des Fournisseurs
CREATE TABLE fournisseurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact TEXT,
    email TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des Recettes Journalières
CREATE TABLE recettes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    brute NUMERIC NOT NULL DEFAULT 0,
    tier_payant NUMERIC NOT NULL DEFAULT 0,
    credit NUMERIC NOT NULL DEFAULT 0,
    remises NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des Assurances
CREATE TABLE assurances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type_contrat TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des Dettes Fournisseurs (Suivi des soldes)
CREATE TABLE dettes_fournisseurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fournisseur_id UUID REFERENCES fournisseurs(id) ON DELETE CASCADE,
    montant_du NUMERIC NOT NULL DEFAULT 0,
    derniere_facture TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des Créances Assurances (Montants à recevoir)
CREATE TABLE creances_assurances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assurance_id UUID REFERENCES assurances(id) ON DELETE CASCADE,
    periode DATE NOT NULL, -- Premier jour du mois concerné
    montant_attendu NUMERIC NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertion de données de test (Optionnel)
-- INSERT INTO fournisseurs (name, contact) VALUES ('Grossiste Pharma A', '01 23 45 67 89');
-- INSERT INTO assurances (name) VALUES ('Assurance Allianz');
