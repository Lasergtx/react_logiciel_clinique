from enum import Enum

class EventType(str, Enum):
    RENDEZ_VOUS = "RENDEZ-VOUS"
    OPERATION = "OPERATION"
    AUTRE = "AUTRE"

class Gender(str, Enum):
    M = "M"
    F = "F"
    N_A = "N/A"

class Payment(str, Enum):
    PAYER = "PAYER"
    A_PAYER = "A PAYER"
    EN_COURS_DE_PAIEMENT = "EN COURS DE PAIEMENT"
    NON_PAYER = "NON PAYER"

class Role(str, Enum):
    DIRECTEUR = "DIRECTEUR"
    VETERINAIRE = "VETERINAIRE"
    ASSISTANT = "ASSISTANT"

class Status(str, Enum):
    ACTIF = "ACTIF"
    INACTIF = "INACTIF"

class Statut(str, Enum):
    A_FAIRE = "A FAIRE"
    REPORTER = "REPORTER"
    ANNULER = "ANNULER"
    TERMINER = "TERMINER"