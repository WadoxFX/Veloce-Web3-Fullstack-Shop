Imports System
Imports System.Threading.Tasks
Imports System.Collections.Generic
Imports System.Numerics
Imports Nethereum.Hex.HexTypes
Imports Nethereum.ABI.FunctionEncoding.Attributes
Imports Nethereum.Web3
Imports Nethereum.RPC.Eth.DTOs
Imports Nethereum.Contracts.CQS
Imports Nethereum.Contracts.ContractHandlers
Imports Nethereum.Contracts
Imports System.Threading
Imports Client.Contracts.Shopping.ContractDefinition
Namespace Client.Contracts.Shopping


    Public Partial Class ShoppingService
    
    
        Public Shared Function DeployContractAndWaitForReceiptAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal shoppingDeployment As ShoppingDeployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return web3.Eth.GetContractDeploymentHandler(Of ShoppingDeployment)().SendRequestAndWaitForReceiptAsync(shoppingDeployment, cancellationTokenSource)
        
        End Function
         Public Shared Function DeployContractAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal shoppingDeployment As ShoppingDeployment) As Task(Of String)
        
            Return web3.Eth.GetContractDeploymentHandler(Of ShoppingDeployment)().SendRequestAsync(shoppingDeployment)
        
        End Function
        Public Shared Async Function DeployContractAndGetServiceAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal shoppingDeployment As ShoppingDeployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of ShoppingService)
        
            Dim receipt = Await DeployContractAndWaitForReceiptAsync(web3, shoppingDeployment, cancellationTokenSource)
            Return New ShoppingService(web3, receipt.ContractAddress)
        
        End Function
    
        Protected Property Web3 As Nethereum.Web3.IWeb3
        
        Public Property ContractHandler As ContractHandler
        
        Public Sub New(ByVal web3 As Nethereum.Web3.Web3, ByVal contractAddress As String)
            Web3 = web3
            ContractHandler = web3.Eth.GetContractHandler(contractAddress)
        End Sub
    
        Public Sub New(ByVal web3 As Nethereum.Web3.IWeb3, ByVal contractAddress As String)
            Web3 = web3
            ContractHandler = web3.Eth.GetContractHandler(contractAddress)
        End Sub
    
        Public Function GetMyOrdersQueryAsync(ByVal getMyOrdersFunction As GetMyOrdersFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of GetMyOrdersOutputDTO)
        
            Return ContractHandler.QueryDeserializingToObjectAsync(Of GetMyOrdersFunction, GetMyOrdersOutputDTO)(getMyOrdersFunction, blockParameter)
        
        End Function

        
        Public Function GetMyOrdersQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of GetMyOrdersOutputDTO)
        
            return ContractHandler.QueryDeserializingToObjectAsync(Of GetMyOrdersFunction, GetMyOrdersOutputDTO)(Nothing, blockParameter)
        
        End Function



        Public Function GetTotalBalanceQueryAsync(ByVal getTotalBalanceFunction As GetTotalBalanceFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Return ContractHandler.QueryAsync(Of GetTotalBalanceFunction, BigInteger)(getTotalBalanceFunction, blockParameter)
        
        End Function

        
        Public Function GetTotalBalanceQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            return ContractHandler.QueryAsync(Of GetTotalBalanceFunction, BigInteger)(Nothing, blockParameter)
        
        End Function



        Public Function OwnerQueryAsync(ByVal ownerFunction As OwnerFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            Return ContractHandler.QueryAsync(Of OwnerFunction, String)(ownerFunction, blockParameter)
        
        End Function

        
        Public Function OwnerQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            return ContractHandler.QueryAsync(Of OwnerFunction, String)(Nothing, blockParameter)
        
        End Function



        Public Function PayRequestAsync(ByVal payFunction As PayFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of PayFunction)(payFunction)
        
        End Function

        Public Function PayRequestAndWaitForReceiptAsync(ByVal payFunction As PayFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of PayFunction)(payFunction, cancellationToken)
        
        End Function

        
        Public Function PayRequestAsync(ByVal [productsId] As List(Of String), ByVal [price] As BigInteger) As Task(Of String)
        
            Dim payFunction = New PayFunction()
                payFunction.ProductsId = [productsId]
                payFunction.Price = [price]
            
            Return ContractHandler.SendRequestAsync(Of PayFunction)(payFunction)
        
        End Function

        
        Public Function PayRequestAndWaitForReceiptAsync(ByVal [productsId] As List(Of String), ByVal [price] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim payFunction = New PayFunction()
                payFunction.ProductsId = [productsId]
                payFunction.Price = [price]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of PayFunction)(payFunction, cancellationToken)
        
        End Function
    
    End Class

End Namespace
