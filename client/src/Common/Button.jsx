
function Button({type,value,onSubmit}) {
  return (
   <button type={type} style={{padding:20,borderRadius:18,backgroundColor:'green',borderWidth:0,width:'30%',color:'white'}} onClick={onSubmit}>{value}</button>
  )
}

export default Button