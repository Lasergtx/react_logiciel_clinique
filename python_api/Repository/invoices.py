from Model.invoices import CreateInvoice
from Model.items import CreateItem
from Model.earnings import CreateEarning
from Service.earnings import EarningService
from Config.Connection import prisma_connection
from Customtypes import Payment


class InvoiceRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.invoices.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.invoices.find_first(
            where={
                'invoiceid': id
            }
        )

    @staticmethod
    async def create(invoice: CreateInvoice, items: list[CreateItem] | None):
        earning_data = CreateEarning(
            amount=invoice.amount,
            description='',
            paymentstatus=Payment.APAYER,
            clientid=invoice.clientid
        )

        earning = await EarningService.create(earning_data, items)
        return await prisma_connection.prisma.invoices.create(
            data={
                'amount': invoice.amount,
                'invoicelink': invoice.invoicelink,
                'clientid': invoice.clientid,
                'earningid': earning.earningid
            }
        )

    @staticmethod
    async def update(id: int, invoice: CreateInvoice):
        baseInvoice = await prisma_connection.prisma.invoices.find_first(
            where={
                'invoiceid': id
            }
        )
        await prisma_connection.prisma.invoices.update(
            where={
                'invoiceid': id
            },
            data={
                'amount': invoice.amount,
                'invoicelink': invoice.invoicelink,
                'clientid': baseInvoice.clientid,
                'earningid': baseInvoice.earningid
            }
        )
