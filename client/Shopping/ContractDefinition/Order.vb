Imports System
Imports System.Threading.Tasks
Imports System.Collections.Generic
Imports System.Numerics
Imports Nethereum.Hex.HexTypes
Imports Nethereum.ABI.FunctionEncoding.Attributes
Namespace Client.Contracts.Shopping.ContractDefinition

    Public Partial Class Order
        Inherits OrderBase
    End Class

    Public Class OrderBase
        
        <[Parameter]("uint256", "id", 1)>
        Public Overridable Property [Id] As BigInteger
        <[Parameter]("string[]", "productsId", 2)>
        Public Overridable Property [ProductsId] As List(Of String)
        <[Parameter]("uint256", "totalPrice", 3)>
        Public Overridable Property [TotalPrice] As BigInteger
        <[Parameter]("address", "buyer", 4)>
        Public Overridable Property [Buyer] As String
        <[Parameter]("uint8", "status", 5)>
        Public Overridable Property [Status] As Byte
        <[Parameter]("bool", "paid", 6)>
        Public Overridable Property [Paid] As Boolean
    
    End Class

End Namespace
