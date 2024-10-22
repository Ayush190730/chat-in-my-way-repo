// export const baseUrl = "http://localhost:5001/api"
export const baseUrl = "https://chat-in-my-way-repo-5.onrender.com/api";

export const postRequest = async (url, body) => {
         const response =   await fetch(url,
              {
                    mode: 'no-cors',
                    method: 'POST',
                    headers: {
                              "Content-Type" : "application/json"
                    }
});

            const data = await response.json();

            if(!response.ok){
                    let message;

                    if(data?.message){
                              message = data.message;
                    } else{
                              message = data;
                    }

                    return {error: true, message};
            }

            return data;
};


export const getRequest = async(url) => {
       const response = await fetch(url,{
        mode: 'no-cors'
       });

       const data = await response.json();

       if(!response.ok){
        let message = "An error occured....";

        if(data?.message){
                message = data.message;
        }

        return{error: true, message}
       }

       return data;
}

    
