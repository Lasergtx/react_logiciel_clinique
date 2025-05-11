from Model.patients import CreatePatient
from Config.Connection import prisma_connection
from datetime import datetime

class PatientsRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.patients.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.patients.find_first(
            where={
                'patientid': id
            }
        )

    @staticmethod
    async def create(patient: CreatePatient):
        return await prisma_connection.prisma.patients.create(
            data={
                'name': patient.name,
                'gender': patient.gender,
                'type': patient.type,
                'species': patient.species,
                'birthdate': datetime.combine(patient.birthdate, datetime.min.time()) if patient.birthdate else None,
                'numberid': patient.numberid,
                'color': patient.color,
                'clientid': patient.clientid
            }
        )

    @staticmethod
    async def update(id: int, patient: CreatePatient):
        await prisma_connection.prisma.patients.update(
            where={
                'patientid': id
            },
            data={
                'name': patient.name,
                'gender': patient.gender,
                'type': patient.type,
                'species': patient.species,
                'birthdate': datetime.combine(patient.birthdate, datetime.min.time()) if patient.birthdate else None,
                'numberid': patient.numberid,
                'color': patient.color,
                'clientid': patient.clientid
            }
        )

    @staticmethod
    async def delete(id: int):
        await prisma_connection.prisma.patients.delete(
            where={'patientid': id}
        )

