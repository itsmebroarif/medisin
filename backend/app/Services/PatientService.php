<?php

namespace App\Services;

use App\Repositories\PatientRepository;
use Illuminate\Validation\ValidationException;

class PatientService
{
    public function __construct(
        protected PatientRepository $patientRepository
    ) {}

    public function getAll()
    {
        return $this->patientRepository->getAll();
    }

    public function generateMedicalRecordNumber(): string
    {
        $lastNumber = $this->patientRepository->getLastMedicalRecordNumber();

        if (!$lastNumber) {
            return 'RM0001';
        }

        $number = (int) substr($lastNumber, 2);
        $number++;

        return 'RM' . str_pad($number, 4, '0', STR_PAD_LEFT);
    }

    public function create(array $data): \App\Models\Patient
    {
        $errors = $this->validateUniqueFields($data);
        if (!empty($errors)) {
            throw ValidationException::withMessages($errors);
        }

        $data['medical_record_number'] = $this->generateMedicalRecordNumber();
        return $this->patientRepository->create($data);
    }

    public function validateUniqueFields(array $data): array
    {
        $errors = [];

        if ($this->patientRepository->nikExists($data['nik'])) {
            $errors['nik'] = ['NIK already exists.'];
        }

        if ($this->patientRepository->emailExists($data['email'])) {
            $errors['email'] = ['Email already exists.'];
        }

        return $errors;
    }
}
