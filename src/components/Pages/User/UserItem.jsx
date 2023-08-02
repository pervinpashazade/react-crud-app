import React, { useEffect, useState } from 'react'
import ProCard from '../../Lib/ProCard'
import { Alert, Container } from 'reactstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function UserItem(props) {

    const { id } = useParams()

    const [data, setData] = useState(null)
    const [error, setError] = useState("")

    // 4xx => client erros
    // 400, 401, 403, 422, 
    // 5xx =>  server error

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data)
                }
            })
            .catch(err => {
                console.log("ERROR !!!!", err)
                setError(err.message)
            })
    }, [])

    return (
        <Container>
            <ProCard>
                {
                    !data ? 
                    <Alert
                        color='warning'
                    >
                        Məlumat tapılmadı
                    </Alert>
                    :
                    <h1>{data.fullname}</h1>
                }
            </ProCard>
        </Container>
    )
}

export default UserItem