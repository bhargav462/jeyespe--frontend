import swal from 'sweetalert';
import {MESSAGES} from './Messages'
export function authentication(response,callback) {
    if (!response.ok) {
      if (response.status === 403) {
        response.json().then((data) => {
          if (data.error === "Login") {
            alert('Please Login');
            callback(MESSAGES.LOGIN_ERROR)
          }else{
              callback(data)
          }
        });
      }else{
        swal("Internal Error, Sorry for inconvinience")
        return 
        // response.json().then(data=> callback(data))
      }
    }else{
      response.json().then(data=> {
        //  console.log('security000000000000',data)
        //  console.log(callback)  
         callback(data)
      })
    }
  };

// export function renderData(response){
//     response.json().then(data => {
      
//     })
//   }