<!DOCTYPE html>
<html>

<head>
    <title>Mise à jour du solde de congé</title>
</head>

<body style="background-color: white;">
    <p>Bonjour {{ $user->nom }},</p>
    <p>Votre "solde de congé" a été augmenté . Votre nouveau solde est de : {{ $user->solde_de_conge }}.</p>

    <p>Cordialement,</p>
    <p>Votre Société</p>
    <img src="{{ $message->embed(public_path('images/tactic.jpg')) }}" alt="Example Image" style="max-width: 30%;">
</body>

</html>