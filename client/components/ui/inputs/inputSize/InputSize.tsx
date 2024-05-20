import type { ComponentProps } from 'react'
import type { UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'

import { TrashIcon } from '@/components/icons'

import style from './inputSize.module.scss'

type FieldsType = { id?: string; size: string; quantity: string }
interface InputSizeProps extends ComponentProps<'input'> {
  register: UseFormRegister<any>
  remove: UseFieldArrayRemove
  append: UseFieldArrayAppend<
    {
      title: string
      brand: string
      price: string
      files: FileList
      desc: string
      sizes: FieldsType[]
      color: string
      collection: string
      discount?: string | undefined
    },
    'sizes'
  >
  fields: FieldsType[]
  error?: string
}

export const InputSize: React.FC<InputSizeProps> = ({
  fields,
  error,
  register,
  remove,
  append,
}) => (
  <div>
    <div className={style.container}>
      {!!fields.length && (
        <ul>
          {fields.map((field: FieldsType, id: number) => (
            <li key={field.id}>
              <input
                placeholder='Size*'
                {...register(`sizes.${id}.size`)}
                defaultValue={field.size}
              />
              <input
                placeholder='Quantity*'
                {...register(`sizes.${id}.quantity`)}
                defaultValue={field.quantity}
              />
              <button
                type='button'
                aria-label='Add new size'
                className={style.remove}
                onClick={() => remove(id)}
              >
                <TrashIcon color='#fff' size={24} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className={style.sizes_infos}>
        {!fields.length && <p>You haven&apos;t added dimensions</p>}
        <button type='button' onClick={() => append({ quantity: '', size: '' })}>
          Append
        </button>
      </div>
    </div>
    {error && <p className={style.error}>{error}</p>}
  </div>
)
