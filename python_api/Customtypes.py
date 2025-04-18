from enum import Enum

class EventType(str, Enum):
    RENDEZVOUS = "RENDEZVOUS"
    OPERATION = "OPERATION"
    AUTRE = "AUTRE"

class Gender(str, Enum):
    M = "M"
    F = "F"
    NA = "NA"

class Payment(str, Enum):
    PAYER = "PAYER"
    APAYER = "APAYER"
    ENCOURSDEPAIEMENT = "ENCOURSDEPAIEMENT"
    NONPAYER = "NONPAYER"

class Role(str, Enum):
    DIRECTEUR = "DIRECTEUR"
    VETERINAIRE = "VETERINAIRE"
    ASSISTANT = "ASSISTANT"

class Status(str, Enum):
    ACTIF = "ACTIF"
    INACTIF = "INACTIF"

class Statut(str, Enum):
    AFAIRE = "AFAIRE"
    REPORTER = "REPORTER"
    ANNULER = "ANNULER"
    TERMINER = "TERMINER"