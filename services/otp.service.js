export const generateOtp =() =>{
    const newOtp = Math.floor(Math.random()*10000000)
    .toString()
    .padStart(6,"0");

    return newOtp;
}

