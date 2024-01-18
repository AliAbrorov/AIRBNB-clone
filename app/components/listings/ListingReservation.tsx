"use client";

import { Range } from "react-date-range";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

import React from "react";
import DatePicker from "../inputs/Calendar";
import Button from "../Button";

export default function ListingReservation({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  disabled,
  disabledDates,
  onSubmit,
}: ListingReservationProps) {
  return (
    <div
      className="bg-white rounded-xl border-[1px] border-neutral-200
    overflow-hidden"
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <DatePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <div
        className="p-4 flex flex-row items-center justify-between 
      font-semibold text-lg"
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
}
