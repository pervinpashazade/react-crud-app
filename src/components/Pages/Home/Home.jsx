import React, { useEffect, useState } from 'react'
import ProCard from '../../Lib/ProCard'
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Home() {

    const [data, setData] = useState([])
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/users").then(res => {
            if (res.status === 200) {
                setData(res.data)
            }
        })
    }, [])

    const deleteItem = (id) => {

        Swal.fire({
            icon: "warning",
            title: 'Silmək istədiyinizə əminsinizmi?',
            showDenyButton: true,
            confirmButtonText: 'Bəli, sil',
            denyButtonText: `Xeyr, silmə`,
        }).then((result) => {
            console.log("sweetalert result", result);
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/users/${id}`)
                    .then(resp => {
                        if (resp.status === 200) {
                            setData(prevState => prevState.filter(item => item.id !== id))
                            Swal.fire('Məlumat silindi', '', 'success')
                        }
                    })
            }
        })
    }

    const editItem = (id) => {
        alert(id)
    }

    console.log("selectedRow", selectedRow);

    return (
        <div className="container">
            <div className='home-wrapper'>
                <ProCard>
                    {
                        !data.length ?
                            <Alert color='warning'>
                                Melumat yoxdur
                            </Alert>
                            :
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
                                                        Ətraflı
                                                    </Button>
                                                    <Button
                                                        color='success'
                                                        onClick={() => {
                                                            setIsOpenEditModal(true)
                                                            setSelectedRow(item)
                                                        }}
                                                    >
                                                        Redakdə et
                                                    </Button>
                                                    <Button
                                                        color='danger'
                                                        onClick={() => deleteItem(item.id)}
                                                    >
                                                        Sil
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                    }
                </ProCard>
            </div>
            {
                !selectedRow ? "" :
                    <Modal
                        isOpen={isOpenEditModal}
                        toggle={() => setIsOpenEditModal(false)}
                    >
                        <ModalHeader toggle={() => setIsOpenEditModal(false)}>Modal title</ModalHeader>
                        <ModalBody>
                            {
                                selectedRow.fullname
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => setIsOpenEditModal(false)}>
                                Do Something
                            </Button>{' '}
                            <Button color="secondary" onClick={() => setIsOpenEditModal(false)}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

            }
        </div>
    )
}

export default Home