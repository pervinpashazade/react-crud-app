import React, { useEffect, useState } from 'react'
import ProCard from '../../Lib/ProCard'
import { Button, Table } from 'reactstrap'
import axios from 'axios'

function Home() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/user_list").then(res => {
            if (res.status === 200) {
                setData(res.data)
            }
        })
    }, [])

    console.log("data", data);

    return (
        <div className="container">
            <div className='home-wrapper'>
                <ProCard>
                    <Table hover>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.fullname}</td>
                                        <td>
                                            <Button
                                                color='primary'
                                            >
                                                Detay
                                            </Button>
                                            <Button
                                                color='success'
                                            >
                                                Düzenle
                                            </Button>
                                            <Button
                                                color='danger'
                                            >
                                                Sil
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </ProCard>
            </div>
        </div>
    )
}

export default Home