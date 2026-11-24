# ParcAuto


# API Agence de Location de Voitures

API REST construite avec **Express** pour gérer les véhicules d'une agence de location.
Il n'y a pas de base de données : les véhicules sont gardés dans un tableau en mémoire
(les données reviennent à l'état initial à chaque redémarrage du serveur).

## Structure du projet

```
api-agence-location/
├── package.json
├── server.js
├── routes/
│   └── vehicules.js      # express.Router : routes /vehicules
└── middlewares/
    └── journal.js        # affiche la méthode et l'URL de chaque requête
```

## Installation et lancement

Prérequis : Node.js 18 ou plus récent.

```bash
npm install
npm run dev     # redémarre automatiquement à chaque modification
# ou
npm start
```

Le serveur démarre sur `http://localhost:3000`.

## La ressource `vehicule`

| Champ           | Type    | Remarque                              |
|-----------------|---------|---------------------------------------|
| `id`            | nombre  | attribué par le serveur               |
| `marque`        | texte   | obligatoire                           |
| `modele`        | texte   | obligatoire                           |
| `immatriculation` | texte | obligatoire                           |
| `disponible`    | booléen | vaut `true` à la création             |

## Routes

| Méthode | URL                 | Description                                                    | Réponses   |
|---------|---------------------|----------------------------------------------------------------|------------|
| GET     | `/vehicules`        | Liste les véhicules (`?disponible=true` : seulement les disponibles) | 200        |
| GET     | `/vehicules/:id`    | Renvoie un véhicule                                            | 200 · 404  |
| POST    | `/vehicules`        | Crée un véhicule                                               | 201 · 400  |
| PATCH   | `/vehicules/:id`    | Modifie un ou plusieurs champs                                 | 200 · 404  |
| DELETE  | `/vehicules/:id`    | Supprime un véhicule                                           | 204 · 404  |

Toute autre URL renvoie `404` avec `{ "erreur": "Route introuvable" }`.

## Exemples

### Lister les véhicules disponibles

```
GET http://localhost:3000/vehicules?disponible=true
```

### Créer un véhicule

```
POST http://localhost:3000/vehicules
Content-Type: application/json

{ "marque": "Fiat", "modele": "Tipo", "immatriculation": "11111-E-2" }
```

Réponse `201` :

```json
{ "id": 4, "marque": "Fiat", "modele": "Tipo", "immatriculation": "11111-E-2", "disponible": true }
```

### Modifier un véhicule

```
PATCH http://localhost:3000/vehicules/2
Content-Type: application/json

{ "disponible": true }
```

### Supprimer un véhicule

```
DELETE http://localhost:3000/vehicules/3
```

Réponse `204` sans contenu.

## Erreurs

Toutes les erreurs sont renvoyées en JSON :

| Code | Message                              | Cas                                         |
|------|--------------------------------------|---------------------------------------------|
| 400  | `Champs obligatoires manquants`      | POST sans marque, modele ou immatriculation |
| 404  | `Véhicule introuvable`               | id inexistant                               |
| 404  | `Route introuvable`                  | URL inconnue                                |

## Tester avec Postman

1. Choisir la méthode et saisir l'URL.
2. Pour `POST` et `PATCH` : onglet **Body → raw → JSON**, puis écrire le JSON.
   Un body vide provoque une erreur `Unexpected end of JSON input`.
3. Cliquer sur **Send** et vérifier le code de statut.

## Middlewares

- **`journal`** : affiche dans le terminal la méthode et l'URL de chaque requête
  (ex. `GET /vehicules?disponible=true`). Il est placé avant les routes.
- **404** : placé après les routes, il renvoie `{ "erreur": "Route introuvable" }`.