<!DOCTYPE html>
<html>

<head>
    <title>Mise à jour de l'état de la demande de congé</title>
</head>

<body>
    <p>Bonjour {{ $conge->user->prenom }} {{ $conge->user->nom }},</p>
    <p>votre superior: {{ $superior->prenom }} {{ $superior->nom }} a {{ $conge->etat }} votre congé </p>


    <p>Type de congé : {{ $conge->type_conge }}</p>
    <p>Date de début : {{ $conge->date_debut }}</p>
    <p>Date de fin : {{ $conge->date_fin }}</p>
    <p>Description : {{ $conge->description }}</p>

    <p>Cordialement,</p>
    <p>Votre Société</p>
</body>

</html>