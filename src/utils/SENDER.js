import axios from 'axios'

export default axios.create({
        baseURL: process.env.REACT_APP_NODE_ENV === "production" ? " https://ontask-back.herokuapp.com/api" :'http://localhost:8080/api',
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
      })
