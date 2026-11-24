
import { Router } from "express";

const router = Router();

// Données de départ
let vehicules = [
  { id: 1, marque: "Dacia", modele: "Logan", immatriculation: "12345-A-6", disponible: true },
  { id: 2, marque: "Renault", modele: "Clio", immatriculation: "67890-B-6", disponible: false },
  { id: 3, marque: "Peugeot", modele: "208", immatriculation: "24680-D-1", disponible: true }
];

// Prochain ID
let prochainId = 4;


// GET /vehicules
router.get("/", (req, res) => {

  if (req.query.disponible === "true") {
    let resultat = vehicules.filter((v) => v.disponible === true);
    res.status(200).json(resultat);

  } else {
    res.status(200).json(vehicules);
  }

});


// GET /vehicules/:id
router.get("/:id", (req, res) => {

  let id = Number(req.params.id);
  let vehicule = vehicules.find((v) => v.id === id);

  if (vehicule === undefined) {
    res.status(404).json({ erreur: "Véhicule introuvable" });

  } else {
    res.status(200).json(vehicule);
  }

});


// POST /vehicules
router.post("/", (req, res) => {

  let marque = req.body.marque;
  let modele = req.body.modele;
  let immatriculation = req.body.immatriculation;

  if (marque === undefined || modele === undefined || immatriculation === undefined) {
    res.status(400).json({ erreur: "Champs obligatoires manquants" });

  } else {

    let nouveau = {
      id: prochainId,
      marque: marque,
      modele: modele,
      immatriculation: immatriculation,
      disponible: true
    };

    prochainId = prochainId + 1;

    vehicules.push(nouveau);

    res.status(201).json(nouveau);
  }

});


// PATCH /vehicules/:id
router.patch("/:id", (req, res) => {

  let id = Number(req.params.id);
  let vehicule = vehicules.find((v) => v.id === id);

  if (vehicule === undefined) {
    res.status(404).json({ erreur: "Véhicule introuvable" });

  } else {

    if (req.body.marque !== undefined) {
      vehicule.marque = req.body.marque;
    }

    if (req.body.modele !== undefined) {
      vehicule.modele = req.body.modele;
    }

    if (req.body.immatriculation !== undefined) {
      vehicule.immatriculation = req.body.immatriculation;
    }

    if (req.body.disponible !== undefined) {
      vehicule.disponible = req.body.disponible;
    }

    res.status(200).json(vehicule);
  }

});


// DELETE /vehicules/:id
router.delete("/:id", (req, res) => {

  let id = Number(req.params.id);
  let index = vehicules.findIndex((v) => v.id === id);

  if (index === -1) {
    res.status(404).json({ erreur: "Véhicule introuvable" });

  } else {

    vehicules.splice(index, 1);

    res.status(204).send();
  }

});


export default router;
