//backend 
export const url = "http://localhost:3001"
//headers
export function headers() {
    //supposed to be  function headers(token)
    return(
        {   
            headers: {
           /* 'Authorization' : `Bearer ${token}`*/
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
            }
        }
    )
}