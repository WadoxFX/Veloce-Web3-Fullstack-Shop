import Image from 'next/image'
import React from 'react'
import type { UseFormRegister } from 'react-hook-form'

import { usePreview } from '@/hooks/usePreview'

import style from './inputFile.module.scss'

interface InputFileProps {
  name: string
  multiple?: boolean
  register: UseFormRegister<any>
  error?: string
  accept?: string
  files: FileList | null
}

export const InputFile: React.FC<InputFileProps> = ({ name, files, register, error, ...props }) => {
  const { preview } = usePreview(files)
  return (
    <div>
      <div className={style.container}>
        <div className={style.selector_files}>
          <div>{!files?.length && <p>You have not selected files</p>}</div>
          <label htmlFor='file'>
            {files?.length ? 'Upload more' : 'Upload'}
            <input id='file' type='file' {...(register && register(name))} {...props} />
          </label>
        </div>

        {!!files?.length && (
          <ul>
            {preview.map((image: string, id: number) => (
              <li key={id}>
                <Image className={style.image} src={image} width={100} height={100} alt='Preview' />
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className={style.error}>{error}</p>}
    </div>
  )
}
