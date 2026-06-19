<?php

namespace App\Services;

use App\Repositories\VisitRepository;

class VisitService
{
    public function __construct(
        protected VisitRepository $visitRepository
    ) {}

    public function getAll()
    {
        return $this->visitRepository->getAll();
    }

    public function getByPatient($patientId)
    {
        return $this->visitRepository->findByPatientId($patientId);
    }

    public function create(array $data)
    {
        return $this->visitRepository->create($data);
    }
}
