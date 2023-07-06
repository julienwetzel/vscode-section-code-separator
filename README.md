# Section Code Separator

Créer des sections de code avec des commentaires spécifiques dans VS Code

## Description

Pour organiser le code, il est recommandé de créer des sections dans le code ce qui permet de mieux se retrouver visuellement. Ainsi, on peut limiter la création de fichiers annexes.

La création d'une nouvelle ligne de commentaire pour la séparation est `// ### MA SEPARATION ###`
L'extension va ajouter ensuite des tirets sur la droite jusqu'à obtenir une ligne de 80 caractères.
Pour terminer la séparation de code, on ajoute le code `// ####`, donc quatre dièses qui indique la fermeture.

Cette extension, va ajouter des tirets sur la droite des commentaires pour la séparation de code en ne dépassant pas les 80 caractères de la ligne.

## Exemple

Avant:
```rust
// ### LIBRARY ###
// ##

use std::eprintln;
use std::collections::HashMap;

// ####
// ### CONSTANTES ###
// ##

const MA_CONSTANTE: &str = "constante";

// ####
// ### STRUCTURES ###
// ##

struct MaStructure {
    pub something: String,
}

// ####
```

Après:
```rust
// ### LIBRARY ### -------------------------------------------------------------
// ## --------------------------------------------------------------------------

use std::collections::HashMap;
use std::eprintln;

// #### ------------------------------------------------------------------------
// ### CONSTANTES ### ----------------------------------------------------------
// ## --------------------------------------------------------------------------

const MA_CONSTANTE: &str = "constante";

// #### ------------------------------------------------------------------------
// ### STRUCTURES ### ----------------------------------------------------------
// ## --------------------------------------------------------------------------

struct MaStructure {
    pub something: String,
}

// #### ------------------------------------------------------------------------
```

## Tips

Pour faire le pliage de code, nous pouvons utiliser l'extension Explicit Folding et ajouter le code suivant dans le fichier settings.json:

```json
{
    "[rust]": {
        "editor.defaultFormatter": "rust-lang.rust-analyzer",
        "explicitFolding.rules": [
            {
                "beginRegex": "^[ ]*\\/\\/[ ]#{3}[ ]\\w+[ ]#{3}[ ][-]+$",
                "whileRegex": "^[ ]*\\/\\/[ ]#{4}[ ][-]+$",
                "autoFold": true
            }
        ],
        "explicitFolding.autoFold": "1"
    }
}

```

> Tip: Il est possible de désactiver l'auto pliage en mettant paramètrant `"autoFold": false`

Vous pouvez changer la couleur des commentaires avec l'extension Better Comments. Voici un exemple pour settings.json:

```json
{
    "better-comments.tags": [
        {
            "tag": "#",
            "color": "#668252",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        }
    ]
}

```
Vous pouvez également ajouter des snippets pour ajouter les séparations :
```json
{
	"Add Comment Separator": {
		"prefix": "commsep",
		"body": [
			"// ####",
			"// ### $1 ###",
			"// ##",
		],
		"description": "Insérer un commentaire de séparation de code"
	},
	"Comment Separator New File": {
		"prefix": "commsep_newfile",
		"body": [
			"// ### LIBRARY ###",
			"// ##",
			"",
			"// External library",
			"use thiserror::Error;",
			"use anyhow::{anyhow, bail, Context, Result};",
			"",
			"// Internal library",
			"",
			"// ####",
			"// ### CONSTANTES ###",
			"// ##",
			"",
			"const MA_CONSTANTE: &str = \"constante\";",
			"",
			"// ####",
			"// ### STRUCTURES ###",
			"// ##",
			"",
			"struct MaStructure {",
			"    pub something: String,",
			"}",
			"",
			"// ####",
			"// ### FONCTIONS ###",
			"// ##",
			"",
			"fn main() -> Result<()> {",
			"    Ok(())",
			"}",
			"",
		],
		"description": "Insérer un template de séparation de code pour un nouveau fichier"
	}
}
```
## Informations importantes

- L'extension est active sur tous les documents rust.
- La modifications sur les lignes de commentaires se fait à l'enregistrement du document.

## Release Notes

### 0.0.1

Release initial

---

**Enjoy!**
