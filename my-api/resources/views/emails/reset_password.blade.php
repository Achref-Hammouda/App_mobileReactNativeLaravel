<!DOCTYPE html>
<html>

<head>
    <title>New Leave Request</title>
</head>

<body style="background-color: white;">
    <h1>Réinitialisation de mot de passe</h1>

    <p>utilisez ce code pour modifier votre mot de passe .</p>

    <p>>voici votre de code: {{ $resetLink }}</p>

    <p>Cordialement,</p>
    <p>Votre Société</p>
    <img src="{{ $message->embed(public_path('images/tactic.jpg')) }}" alt="Example Image" style="max-width: 30%;">
</body>

</html>