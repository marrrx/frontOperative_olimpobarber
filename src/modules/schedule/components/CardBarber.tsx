import React from 'react'
import { Barber } from '../interfaces/Barber';

interface CardBarberProps {
    barbers: Barber[];
  }

export const CardBarber: React.FC<CardBarberProps> = ({barbers}) => {


  return (
    <div>CardBarber</div>
  )
}
