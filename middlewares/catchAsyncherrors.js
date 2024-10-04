// ai portion tau aktu dekte hobe
export const catchAssyncherros=(thefunction)=>{
    return(req,res,next)=>{
        Promise.resolve(thefunction(req,res,next)).catch(next)
    }
}