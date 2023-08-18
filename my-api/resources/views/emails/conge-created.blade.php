<!DOCTYPE html>
<html>

<head>
    <title>Nouvelle Demande de Congé</title>
</head>

<body>
    <p>Bonjour {{ $superior->prenom }} {{ $superior->nom }},</p>

    <p>Une nouvelle demande de congé a été soumise par {{ $conge->user->prenom }} {{ $conge->user->nom }}:</p>

    <p>Type de congé : {{ $conge->type_conge }}</p>
    <p>Date de début : {{ $conge->date_debut }}</p>
    <p>Date de fin : {{ $conge->date_fin }}</p>
    <p>Description : {{ $conge->description }}</p>

    <p>Veuillez prendre les mesures nécessaires.</p>

    <p>Cordialement,</p>
    <p>Votre Société</p>
</body>

</html>