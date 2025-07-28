'use client';
import { useState } from 'react';

export default function Calculator() {
  const [value, setValue] = useState('');

  const buttons = {
    text: [
      1,
      2,
      3,
      '÷',
      4,
      5,
      6,
      'x',
      7,
      8,
      9,
      '-',
      '%',
      '0',
      '⌫',
      '+',
      'AC',
      '',
      '',
      '=',
    ],
  };

  const handleButtonClick = (buttonValue: string | number) => {
    if (buttonValue == 'AC') {
      setValue('');
      return;
    } else if (buttonValue == '⌫') {
      setValue(value.slice(0, value.length - 1));
      return;
    } else if (howManyMath() > 1) {
      setValue('ERROR');
      return;
    } else if (buttonValue == '%') {
      if (value && howManyMath() == 0) {
        setValue(String(parseFloat(value) * 0.01));
        return;
      } else {
        setValue('ERROR');
        return;
      }
    } else if (value == 'ERROR') {
      setValue('');
    } else if (buttonValue == '=') {
      const numbersString = value.match(/\d+(\.\d+)?/g) as string[];
      if (howManyMath() == 1 && numbersString.length > 1) {
        if (value.includes('+')) {
          setValue(
            String(
              numbersString
                .map((val) => parseFloat(val) ?? 0)
                .reduce((acc, currentValue) => acc + currentValue),
            ),
          );
        } else if (value.includes('-')) {
          setValue(
            String(
              numbersString
                .map((val) => parseFloat(val) ?? 0)
                .reduce((acc, currentValue) => acc - currentValue),
            ),
          );
        } else if (value.includes('x')) {
          setValue(
            String(
              numbersString
                .map((val) => parseFloat(val) ?? 0)
                .reduce((acc, currentValue) => acc * currentValue),
            ),
          );
        } else if (value.includes('÷')) {
          setValue(
            String(
              numbersString
                .map((val) => parseFloat(val) ?? 0)
                .reduce((acc, currentValue) => acc / currentValue)
                .toFixed(2),
            ),
          );
        }
        return;
      } else {
        setValue('ERROR');
        return;
      }
    }
    setValue((prevValue) => prevValue + String(buttonValue));
  };
  const howManyMath = () => {
    let operationsNumber = 0;

    if (!value || typeof value == 'number') {
      return 0;
    } else if (typeof value == 'string') {
      for (let i = 0; i < value.length; i++) {
        if (
          value[i] == '+' ||
          value[i] == '-' ||
          value[i] == 'x' ||
          value[i] == '÷'
        ) {
          operationsNumber += 1;
        }
      }
    }
    return operationsNumber;
  };

  return (
    <section className="bg-[#353535] w-100 h-160  mx-auto flex flex-col items-center pt-8 rounded-xl">
      <div className="flex items-center bg-gray-600 p-3s rounded-xl right-20 text-white text-2xl font-bold h-10 w-55 text-left center">
        <span className="p-4">{value}</span>
      </div>
      <div className="relative bottom-[-30] grid grid-cols-4 h-120 right-0.5">
        {buttons.text.map((text, index) => {
          let bg: string = '';
          if (!(text === '')) {
            bg = 'bg-amber-500';
          }
          return (
            <div
              onClick={() => handleButtonClick(text)}
              key={index}
              className={`flex justify-center rounded-full size-[90px] items-center ${bg} text-white font-bold text-4xl m-2`}
            >
              {text}
            </div>
          );
        })}
      </div>
    </section>
  );
}
