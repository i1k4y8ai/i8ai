# i8ai

Interface web mobile-first pour piloter une VM Oracle Cloud sans terminal.

## État

Le frontend fonctionne immédiatement en **mode simulation**. Il ne crée aucune ressource OCI.

## Démarrage

```bash
npm install
npm run dev
```

Backend minimal :

```bash
npm run server
```

## Sécurité

Les credentials OCI doivent rester côté serveur. Ne jamais les mettre dans `src/`, dans le navigateur, ni dans Git.

Le backend réel devra appeler OCI avec des credentials serveur et valider strictement les paramètres reçus du frontend.

## Suite OCI

Le prochain module peut implémenter les appels OCI réels :
- découverte tenancy/région
- validation IAM
- VCN/subnet/Internet Gateway
- sélection image Oracle Linux ARM
- lancement `VM.Standard.A1.Flex`
- polling du statut
- récupération IP
- stop/start/reboot/delete

Le mode simulation permet de tester toute l'interface avant d'activer ces appels.
