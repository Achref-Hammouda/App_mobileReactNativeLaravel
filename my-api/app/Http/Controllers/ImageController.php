<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    //
    public function uploadImage(Request $request, $id)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName =  $id . '_' . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $user = User::findOrFail($id);
            if ($user->imageName) {
                $this->deleteImage($user->imageName);
            }
            $user->imageName = $imageName;
            $user->save();
            return response()->json(['success' => true, 'image_url' => url('images/' . $imageName)], 200);
        }

        return response()->json(['success' => false, 'message' => 'Image not found.'],);
    }
    public function getImage($imageName)
    {
        $imagePath = public_path('images/' . $imageName);

        if (file_exists($imagePath)) {
            $fileContents = file_get_contents($imagePath);

            return response($fileContents, 200)->header('Content-Type', 'image/jpeg');
        }

        return response()->json(['success' => false, 'message' => 'Image not found.'],);
    }
    public static function  deleteImage($imageName)
    {
        $imagePath = public_path('images/' . $imageName);

        if (file_exists($imagePath)) {
            unlink($imagePath); // Supprimer le fichier

            return response()->json(['success' => true, 'message' => 'Image deleted successfully.'], 200);
        }

        return response()->json(['success' => false, 'message' => 'Image not found.'],);
    }
}
