

export const UsePut = ()=>{
  const UpdateExercise = async (url, exercise)=>{
    try{
   const Request = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(exercise)
   })
   const data = await Request.json()
   return console.log(data)
  }
catch{
  console.error("Error: Ocorreu erro na sua atualização")
}
}
 
  return {UpdateExercise}
}