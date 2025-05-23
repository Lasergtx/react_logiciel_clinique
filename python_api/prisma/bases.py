# -*- coding: utf-8 -*-
# code generated by Prisma. DO NOT EDIT.
# pyright: reportUnusedImport=false
# fmt: off

# global imports for type checking
from builtins import bool as _bool
from builtins import int as _int
from builtins import float as _float
from builtins import str as _str
import sys
import decimal
import datetime
from typing import (
    TYPE_CHECKING,
    Optional,
    Iterable,
    Iterator,
    Sequence,
    Callable,
    ClassVar,
    NoReturn,
    TypeVar,
    Generic,
    Mapping,
    Tuple,
    Union,
    List,
    Dict,
    Type,
    Any,
    Set,
    overload,
    cast,
)
from typing_extensions import TypedDict, Literal


LiteralString = str
# -- template models.py.jinja --
from pydantic import BaseModel

from . import fields, actions
from ._types import FuncType
from ._builder import serialize_base64
from ._compat import PYDANTIC_V2, ConfigDict

if TYPE_CHECKING:
    from .client import Prisma


_PrismaModelT = TypeVar('_PrismaModelT', bound='_PrismaModel')


class _PrismaModel(BaseModel):
    if PYDANTIC_V2:
        model_config: ClassVar[ConfigDict] = ConfigDict(
            use_enum_values=True,
            arbitrary_types_allowed=True,
            populate_by_name=True,
        )
    elif not TYPE_CHECKING:
        from ._compat import BaseConfig

        class Config(BaseConfig):
            use_enum_values: bool = True
            arbitrary_types_allowed: bool = True
            allow_population_by_field_name: bool = True
            json_encoders: Dict[Any, FuncType] = {
                fields.Base64: serialize_base64,
            }

    # TODO: ensure this is required by subclasses
    __prisma_model__: ClassVar[str]


class Baseallergies(_PrismaModel):
    __prisma_model__: ClassVar[Literal['allergies']] = 'allergies'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.allergiesActions[_PrismaModelT]':
        from .client import get_client

        return actions.allergiesActions[_PrismaModelT](client or get_client(), cls)


class Basebooster_shots(_PrismaModel):
    __prisma_model__: ClassVar[Literal['booster_shots']] = 'booster_shots'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.booster_shotsActions[_PrismaModelT]':
        from .client import get_client

        return actions.booster_shotsActions[_PrismaModelT](client or get_client(), cls)


class Baseclients(_PrismaModel):
    __prisma_model__: ClassVar[Literal['clients']] = 'clients'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.clientsActions[_PrismaModelT]':
        from .client import get_client

        return actions.clientsActions[_PrismaModelT](client or get_client(), cls)


class Baseearnings(_PrismaModel):
    __prisma_model__: ClassVar[Literal['earnings']] = 'earnings'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.earningsActions[_PrismaModelT]':
        from .client import get_client

        return actions.earningsActions[_PrismaModelT](client or get_client(), cls)


class Baseevents(_PrismaModel):
    __prisma_model__: ClassVar[Literal['events']] = 'events'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.eventsActions[_PrismaModelT]':
        from .client import get_client

        return actions.eventsActions[_PrismaModelT](client or get_client(), cls)


class Baseexpenses(_PrismaModel):
    __prisma_model__: ClassVar[Literal['expenses']] = 'expenses'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.expensesActions[_PrismaModelT]':
        from .client import get_client

        return actions.expensesActions[_PrismaModelT](client or get_client(), cls)


class Baseinvoices(_PrismaModel):
    __prisma_model__: ClassVar[Literal['invoices']] = 'invoices'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.invoicesActions[_PrismaModelT]':
        from .client import get_client

        return actions.invoicesActions[_PrismaModelT](client or get_client(), cls)


class Baseitems_bought(_PrismaModel):
    __prisma_model__: ClassVar[Literal['items_bought']] = 'items_bought'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.items_boughtActions[_PrismaModelT]':
        from .client import get_client

        return actions.items_boughtActions[_PrismaModelT](client or get_client(), cls)


class Baseitems_sold(_PrismaModel):
    __prisma_model__: ClassVar[Literal['items_sold']] = 'items_sold'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.items_soldActions[_PrismaModelT]':
        from .client import get_client

        return actions.items_soldActions[_PrismaModelT](client or get_client(), cls)


class Basepatients(_PrismaModel):
    __prisma_model__: ClassVar[Literal['patients']] = 'patients'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.patientsActions[_PrismaModelT]':
        from .client import get_client

        return actions.patientsActions[_PrismaModelT](client or get_client(), cls)


class Basepatients_allergies(_PrismaModel):
    __prisma_model__: ClassVar[Literal['patients_allergies']] = 'patients_allergies'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.patients_allergiesActions[_PrismaModelT]':
        from .client import get_client

        return actions.patients_allergiesActions[_PrismaModelT](client or get_client(), cls)


class Baseprescriptions(_PrismaModel):
    __prisma_model__: ClassVar[Literal['prescriptions']] = 'prescriptions'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.prescriptionsActions[_PrismaModelT]':
        from .client import get_client

        return actions.prescriptionsActions[_PrismaModelT](client or get_client(), cls)


class Baseproduct_types(_PrismaModel):
    __prisma_model__: ClassVar[Literal['product_types']] = 'product_types'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.product_typesActions[_PrismaModelT]':
        from .client import get_client

        return actions.product_typesActions[_PrismaModelT](client or get_client(), cls)


class Baseproducts(_PrismaModel):
    __prisma_model__: ClassVar[Literal['products']] = 'products'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.productsActions[_PrismaModelT]':
        from .client import get_client

        return actions.productsActions[_PrismaModelT](client or get_client(), cls)


class Baseusers(_PrismaModel):
    __prisma_model__: ClassVar[Literal['users']] = 'users'  # pyright: ignore[reportIncompatibleVariableOverride]

    @classmethod
    def prisma(cls: Type[_PrismaModelT], client: Optional['Prisma'] = None) -> 'actions.usersActions[_PrismaModelT]':
        from .client import get_client

        return actions.usersActions[_PrismaModelT](client or get_client(), cls)


