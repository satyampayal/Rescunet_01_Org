
function Input({placeholder,type,onChange,value,name}) {
  return (
        <input 
        style={{
          padding:8,
          borderRadius:10,
          width:'30%'
        }}
        type={type} 
        placeholder={placeholder}
        name={name} 
        value={value}
        onChange={(e)=>onChange(e)}
        />
  )
}

export default Input