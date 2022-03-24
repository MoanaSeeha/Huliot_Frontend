import React from 'react'

export const Arrow = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  disabled: boolean
  onClick: VoidFunction
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        right: '1%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '24px',
        padding: 0,
        opacity: disabled ? '0' : '1',
        background: 'inherit',
        border: 'none',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
