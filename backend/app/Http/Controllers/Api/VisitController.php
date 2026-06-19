<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVisitRequest;
use App\Services\VisitService;
use Illuminate\Http\JsonResponse;

class VisitController extends Controller
{
    public function __construct(
        protected VisitService $visitService
    ) {}

    public function index(): JsonResponse
    {
        $visits = $this->visitService->getAll();

        return response()->json([
            'message' => 'Visits retrieved successfully',
            'data' => $visits,
        ]);
    }

    public function store(StoreVisitRequest $request): JsonResponse
    {
        $visit = $this->visitService->create($request->validated());

        return response()->json([
            'message' => 'Visit created successfully',
            'data' => $visit->load('patient'),
        ], 201);
    }
}
