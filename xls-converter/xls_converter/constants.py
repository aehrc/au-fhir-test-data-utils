SHEETS = [
    "Patient",
    "Encounter",
    "Condition",
    "AllergyIntolerance",
    "Immunization",
    "Observation",
    "Organization",
    "HealthcareService",
    "PractitionerRole",
    "Practitioner",
    "Procedure",
    "Location",
    "MedicationRequest",
    "MedicationStatement",
    "Medication",
    #'Specimen',
    "RelatedPerson",
    "ServiceRequest",
]

HEALTHCARE_SERVICE_REPLACE = [
    ("	Surgical service", '"	Surgical service"'),
    ("	Pathology service", '"	Pathology service"'),
    ("	Optometry service", '"	Optometry service"'),
    ("	Thoracic surgery", '"	Thoracic surgery"'),
]

ORGANIZATION_REPLACE = [
    ("	Surgical service", '"	Surgical service"'),
    ("	Pathology service", '"	Pathology service"'),
    ("	Optometry service", '"	Optometry service"'),
]

PRACTITIONER_ROLE_REPLACE = [
    ("	Clinical psychology", '"	Clinical psychology"'),
    ("General practitioner	", '"General practitioner	"'),
    ("Community pharmacist	", '"Community pharmacist	"'),
    ("Cardiothoracic surgery	", '"Cardiothoracic surgery	"'),
]

ALLERGY_INTOLERANCE_REPLACE = [
    (
        "asserter_reference_identifier_type.1",
        "asserter_reference_identifier_type",
    ),
    (
        "asserter_reference_identifier_type.2",
        "asserter_reference_identifier_type",
    ),
]
