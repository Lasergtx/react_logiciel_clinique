from Repository.invoices import InvoiceRepository
from Model.invoices import CreateInvoice
from Model.items import CreateItem

class InvoiceService:

    @staticmethod
    async def get_all():
        return await InvoiceRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await InvoiceRepository.get_by_id(id)

    @staticmethod
    async def create(invoice: CreateInvoice, items: list[CreateItem] | None):
        return await InvoiceRepository.create(invoice, items)

    @staticmethod
    async def update(id: int, invoice: CreateInvoice):
        return await InvoiceRepository.update(id, invoice)
