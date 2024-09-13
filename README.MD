<div align="center">
  <h1 align="center">Tomuss Grade API</h1>

### Obtenir ses notes de Tomuss
![NodeJS](https://img.shields.io/badge/node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Github stars](https://img.shields.io/github/stars/MohistMC/Website?style=for-the-badge)
</div>

## A propos

Ceci est un petit projet node.js avec typescript pour obtenir ses notes de Tomuss (nécessite de se connecter avec le CAS).    
C'est un projet perso qui peut avoir quelques bugs, mais si vous voulez contribuer, n'hésitez pas à faire un pull request.

## Pour commencer
Installer en tant que package Node.js :
```bash
npm install shawiizz/tomuss-api
```

### Contribuer / Modifier le code source
Clonez le repository et installez les dépendances :

```bash
git clone https://github.com/Shawiizz/tomuss-api.git
cd tomuss-api
npm install
```

Pour compiler le code TypeScript en JavaScript :
```bash
npm run build
```
Tout les fichiers compilés se trouvent dans le dossier `dist`.

## Exemples

*Le code ci-dessous est présent dans le fichier `examples/Testing.ts` du repository.*

### Comment obtenir ses notes
```typescript
// Pour se connecter via le CAS
const authService = new CASAuthService()
await authService.login('pXXXXXX', 'password')

// Pour récupérer les différents modules enseignés dans un semestre
const tomussService = new TomussService(authService)
const subjects = await tomussService.getModules(SemesterService.fromYearAndSeason(2022, Season.AUTOMNE))

// Pour récupérer les semestres disponibles
const semesters = tomussService.getAvailableSemesters()

// Pour fusionner les modules qui ont le même id d'UE si nécéssaire. 
// Il peut arriver que des professeurs mettent des notes pour le même module mais sur plusieurs lignes d'UE sur Tomuss.
const mergedModules = mergeModulesWithSameUeId(subjects)
```

### Remplir un fichier xlsx avec ses notes (pour l'IUT Info)

#### Une version avec un site web a mettre en place facilement est disponible [à ce lien](https://github.com/Shawiizz/tomuss-api/tree/website).

Si vous avez le fichier `Calculer ses moyennes BUT - Info Doua.xlsx` et que vous êtes en 1ʳᵉ année, il y a un bout de code qui permet de préremplir le fichier avec vos notes.     
Je ne garantis pas que ça marche à 100%, mais ça peut vous faire gagner du temps.   
<strong>Pour les matières où il n'y a pas de notes, le programme laissera la case vide.</strong>

```typescript
const path = '/chemin/vers/le/fichier.xlsx'
const modifiedXlsxFileBuffer = await fillXlsxFile(modules, path, false)
fs.writeFileSync(path, modifiedXlsxFileBuffer)
```

En ce qui concerne le 3ᵉ paramètre qui est par défaut à `false`, il permet de calculer la moyenne d'une matière si la moyenne n'a pas déjà été calculée par les professeurs sur Tomuss. Vous pouvez donc mettre `true` si vous voulez que la moyenne soit calculée avec les notes récupérées.
