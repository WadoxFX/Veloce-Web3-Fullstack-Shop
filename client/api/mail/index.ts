import axios from 'axios'

const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

export const getMailOffices = async (city: string, warehouseId: string): Promise<AddressDelivery> => {
  try {
    const requestData = {
      apiKey: process.env.NEW_POST_APIKEY,
      modelName: 'AddressGeneral',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: city,
        Limit: '26',
        Page: '1',
        WarehouseId: warehouseId
      },
    }

    const data = await axios.post(apiUrl, requestData).then(res => res.data.data[0].Addresses)
    return data
  } catch (error) {
    return []
  }
}
