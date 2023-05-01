import { FC } from "react";

interface IInput{
    register: any,
    id: string,
    type: 'email' | 'text' | 'tel' | 'file',
    name: string,
    errors: any,
    onChange?: any
}

export const Input: FC<IInput> = ({ register, id, type, name, errors, onChange }) => {
    return(
        <div className='mb-4 w-full'>
            <label
              className={`block text-left ${
                errors ? 'text-red-600' : 'text-gray-700'
              } text-sm font-bold mb-2 capitalize`}
              htmlFor={name}
            >
              {name}
            </label>
            <input
                {...register(name)}
                id={id}
                type={type}
                name={name}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                    errors ? 'border-red-600 focus:shadow-red bg-red-200' : 'focus:shadow-outline'
                } hover:shadow-md`}
                onChange={(event) => {
                  event.target.value = onChange(event.target.value);
                }}
            />
            {errors && <p className="text-left mt-1">{errors.message?.toString()}</p>}
        </div>
    )
}