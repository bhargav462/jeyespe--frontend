import swal from 'sweetalert';
import {MESSAGES} from './Messages'
import history from './history'

export  function authentication(response,callback) {
    // console.log('this function runs',history)
    if (!response.ok) {
      if (response.status === 403) {
        response.json().then((data) => {
          if (data.error === "Login") {
            // alert('Please Login');
            callback(MESSAGES.LOGIN_ERROR)
            history.push('/404')
          }else{
              callback(data)
          }
        }).catch(err=> {
          swal("Internal Error, Sorry for inconvinience").then(
            history.push('/home'))
          })
      }else{
        swal("Internal Error, Sorry for inconvinience").then(
          history.push('/home')
        )
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