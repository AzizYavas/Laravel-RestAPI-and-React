<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Faker\Core\File;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $useId = Auth::id();

        $allSkills = Skill::where('user_id', '=', $useId)->get();

        return SkillResource::collection($allSkills);
    }

    public function deneme(Request $request)
    {

        // $this->validate($request, [
        //     'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        // ]);

        if ($request->has('image')) {
            $image = $request->image;

            $imageArray = [];

            foreach ($image as $key => $value) {
                $name = time() . $key . '.' . $value->getClientOriginalExtension();

                // $imageArray = Arr::prepend($imageArray, $name);
                $imageArray[] = ['idImage' => $key, 'nameImage' => $name];

                $path = public_path('upload');

                $value->move($path, $name);
            }
        }

        // $useId = Auth::id();

        // $get = Skill::where('user_id' , '=' , 9)->get();

        // return response()->json(['data' => '', 'message' => 'oldu', 'status' => true],200);
        return dd($imageArray);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // dd($request->file('image'));
        // die();

        $useId = Auth::id();

        $request->validate([
            'name' => 'required|min:3|max:20',
            'slug' => 'required|unique:skills,slug'
        ]);

        if ($request->has('image')) {
            
            $image = $request->file('image');

            $imageArray = [];

            foreach ((array)$image as $key => $value) {
                $name = time() . $key . '.jpeg';

                // $imageArray = Arr::prepend($imageArray, $name);
                $imageArray[] = ['idImage' => $key, 'nameImage' => $name];

                $path = public_path('upload');

                $value->move($path, $name);
            }
        }

        DB::table('skills')->insert([
            'name' => $request->name,
            'slug' => $request->slug,
            'user_id' => $useId,
            'image_path' => json_encode($imageArray)
        ]);



        return dd("asnjdkbkas");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function show(Skill $skill)
    {
        return new SkillResource($skill);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:20',
            'slug' => 'required|unique:skills,slug'
        ]);

        $skill->update($validated);

        return response()->json("skill update");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->json("skill delete");
    }
}
