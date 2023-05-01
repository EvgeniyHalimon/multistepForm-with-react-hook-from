import { FC, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'



export const FileInput: FC<any> = (props) => {
  const { name = 'files', label = name, register,
  unregister,
  setValue,
  watch, mode = 'update' } = props
  const files: any[] = watch(name)

  const onDrop = useCallback(
    (droppedFiles: any) => {
      /*
         This is where the magic is happening.
         Depending upon the mode we are replacing old files with new one,
         or appending new files into the old ones, and also filtering out the duplicate files. 
      */
      let newFiles = mode === 'update' ? droppedFiles : [...(files || []), ...droppedFiles]
      if (mode === 'append') {
        newFiles = newFiles.reduce((prev: any[], file: { [s: string]: unknown } | ArrayLike<unknown>) => {
          const fo = Object.entries(file)
          if (
            prev.find((e: File) => {
              const eo = Object.entries(e)
              return eo.every(
                ([key, value], index) => key === fo[index][0] && value === fo[index][1],
              )
            })
          ) {
            return prev
          } else {
            return [...prev, file]
          }
        }, [])
      }
      // End Magic.
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, name, mode, files],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  })

  useEffect(() => {
    /* register(name)
    return () => {
      unregister(name)
    } */
  }, [register, unregister, name])
  
  return (
    <>
      <label
        className='block text-gray-700 text-sm font-bold mb-2 capitalize'
        htmlFor={name}
      >
        {label}
      </label>
      <div {...getRootProps()}>
        <input
          {...props}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id={name}
          {...getInputProps()}
        />
        <div
          className={
            'w-full mb-4 p-2 border border-dashed border-gray-900 ' +
            (isDragActive ? 'bg-gray-400' : 'bg-gray-200')
          }
        >
          <p className='text-center my-2'>Drop the files here ...</p>
          {/* Optionally you may display a preview of the file(s) */}
          {!!files?.length && (
            <div className='grid gap-1 grid-flow-col-dense mt-2'>
              {files.map((file) => {
                return (
                  <div key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className='object-cover w-24 h-24'
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}