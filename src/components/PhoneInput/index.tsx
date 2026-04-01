'use client'
import React from 'react'
import { PatternFormat } from 'react-number-format'
import { useField, FieldLabel } from '@payloadcms/ui'

export const PhoneInput = ({ path, field }: any) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type text">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <PatternFormat
        format="(###) ###-####"
        mask=" "
        placeholder="(123) 456-7890"
        className="after-label"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          background: 'var(--theme-input-bg)',
          color: 'var(--theme-input-color)',
        }}
        value={value || ''}
        onValueChange={(values) => {
          setValue(values.value)
        }}
      />
    </div>
  )
}
