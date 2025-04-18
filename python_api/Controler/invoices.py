from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.invoices import InvoiceService
from Model.invoices import CreateInvoice
from Model.items import CreateItem

router = APIRouter(
    prefix="/invoices",
    tags=["invoices"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_invoices():
    result = await InvoiceService.get_all()
    return ResponseSchema(detail='Successfully fetched all data', result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_invoice_by_id(id: int):
    result = await InvoiceService.get_by_id(id)
    return ResponseSchema(detail='Successfully fetched data', result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_invoice(invoice: CreateInvoice, items: list[CreateItem] = None):
    result = await InvoiceService.create(invoice, items)
    return ResponseSchema(detail='Successfully created invoice', result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_invoice(id: int = Path(..., alias="id"),*,invoice: CreateInvoice):
    result = await InvoiceService.update(id, invoice)
    return ResponseSchema(detail='Successfully updated invoice', result=result)