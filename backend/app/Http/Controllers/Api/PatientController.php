<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Services\PatientService;
use Illuminate\Http\JsonResponse;

class PatientController extends Controller
{
    public function __construct(
        protected PatientService $patientService
    ) {}

    public function index(): JsonResponse
    {
        $patients = $this->patientService->getAll();

        return response()->json([
            'message' => 'Patients retrieved successfully',
            'data' => $patients,
        ]);
    }

    public function store(StorePatientRequest $request): JsonResponse
    {
        $patient = $this->patientService->create($request->validated());

        return response()->json([
            'message' => 'Patient registered successfully',
            'data' => $patient,
        ], 201);
    }
}
