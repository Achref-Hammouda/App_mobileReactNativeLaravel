<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExpoService
{
    public function sendPushNotification($recipients, $title, $body)
    {
        $response = Http::post("https://exp.host/--/api/v2/push/send", [
            "to" => $recipients,
            "title" => $title,
            "body" => $body,

        ])->json();
        Log::info($response);
    }
}
