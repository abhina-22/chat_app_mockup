import { useState, useEffect } from 'react'

const useForm = (callback, initialValues) => {
  const [message, setMessage] = useState(initialValues)
 
  useEffect(() => {
    setMessage(initialValues)
  }, [initialValues])

  const handleChange = messages => {
    setMessage(values => ({ ...values, message: messages }))
  }
  return {
    message,
    handleChange,
  }
}
export default useForm
