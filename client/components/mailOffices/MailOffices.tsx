'use client'

import React, { memo, useEffect, useState } from 'react'

import { getMailOffices } from '@/api/mail'

import style from './mailOffices.module.scss'

const MailOffices: React.FC<MailOfficesProps> = memo(({ city, mail, onSetDeliveryInfo }) => {
  const [isShow, setIsShow] = useState<boolean>(true)
  const [offices, setOffices] = useState<AddressDelivery>([])

  useEffect(() => {
    const getOffices = async () => {
      const data: AddressDelivery = await getMailOffices(city, mail)
      setOffices(data)
    }

    getOffices()
  }, [city, mail])

  return (
    isShow && (
      <ul className={style.address}>
        {offices.map((office: AddresDelivery, index) => (
          <li
            key={index}
            className={style.addres}
            onClick={() => {
              onSetDeliveryInfo('city', office.Present)
              onSetDeliveryInfo('mail', String(office.Warehouses))
              setIsShow(false)
            }}
          >
            {office.Present} №{office.Warehouses}
          </li>
        ))}
      </ul>
    )
  )
})

export default MailOffices
