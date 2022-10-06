import axios from 'axios'

var CENT_TOKEN='Waiting for login ...'

const auth_http = process.env.BE_AUTH_HTTP || 'http://localhost:9090'
//const monk_http = process.env.BE_MONK_HTTP || 'http://localhost:8080'
const monk_http = 'https://be-monk.herokuapp.com'
const uac_logout= ()=>{ CENT_TOKEN = 'Waiting for login ...' }
const uac_login = (email, password, fCompleted)=>{
  axios({ method: 'post',
          url:    auth_http + '/uac/login',
          data:   {email, password}
  }).then( res=>{
          console.log('/uac/login: ', res.data)
          if( res.data.ok ) {
              CENT_TOKEN = res.data.token
              fCompleted(res.data.ok, 'Welcome back.')
          } else {
              fCompleted(res.data.ok, 'Login fail!')
          }
  })
}
const uac_create = (name, email, password, fCompleted)=>{
  axios({ method: 'post',
          url:    auth_http + '/uac/create',
          data:   [{name, email, password}],
  }).then( res=>{
          console.log('/uac/create: ', res.data)
          fCompleted(res.data.ok, res.data.msg)
  })
}

// Do something need authorization
const uac_info  = (fCompleted)=>{
  axios({ method: 'post',
          url:    auth_http+'/uac/info', headers:{token:CENT_TOKEN},
          data:   null
   }).then( res=>{
          console.log('/uac/info:', res.data)
          fCompleted(res.data.ok, res.data.msg)
   })
}
const uac_read  = (pgN, pgSize, fCompleted)=>{
  axios({ method: 'post',
          url:    auth_http+'/uac/read', headers:{token:CENT_TOKEN},
          data:   { pgN, pgSize }
  }).then( res=>{ 
          console.log('/uac/read:', res.data)
          fCompleted(res.data.ok, res.data.msg)
  })
}
const uac_update= (who, entity, fCompleted)=>{
  axios({ method: 'post',
          url:    auth_http+'/uac/update', headers:{token:CENT_TOKEN},
          data:   { who, entity }
  }).then( res=>{
          console.log('/uac/update:', res.data)
          fCompleted(res.data.ok, res.data.msg)
  })    
}
const uac_renew = (who, password, fCompleted)=>{
  axios({ method: 'post', 
          url:    auth_http+'/uac/renew', headers:{token:CENT_TOKEN},
          data:  { who, password }
  }).then( res=>{
        console.log('/uac/renew:', res.data)
        fCompleted(res.data.ok, res.data.msg)
  })
}
const uac_delete= (who, fCompleted)=>{
  axios({ method: 'post',
          url:    auth_http + '/uac/delete', headers:{token:CENT_TOKEN},
          data:  { who }
  }).then( res=>{
          console.log('/uac/delete:', res.data)
          fCompleted(res.data.ok, res.data.msg)
  })
}
 
// GQL          
const sendGQL = async (query, fCompleted) => {
        console.log('[sendGQL]: ', query)
        return axios({
                method: 'post',
                url:    monk_http + '/graphql', headers:{token:CENT_TOKEN},
                data:   { query }
        }).then( (res) =>{
                console.log('[sendGQL] res.data\n', res.data)
                fCompleted(res.data.data)
        }).catch( err=> {
                // handle error
                console.log('  - error: ', err)
        }).finally( ()=> {
                // always executed
        })
}

export {
    uac_login, uac_logout, uac_create,
    uac_info, uac_read, uac_renew, uac_update, uac_delete,
    sendGQL
}