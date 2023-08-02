import React, { useEffect, useState } from 'react'
import ProCard from '../../Lib/ProCard'
import {
    Alert,
    Button,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../../../config'
import { Link } from 'react-router-dom'

function Home() {

    const [data, setData] = useState([])
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

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
                axios.delete(`${apiUrl}/users/${id}`)
                    .then(resp => {
                        if (resp.status === 200) {
                            setData(prevState => prevState.filter(item => item.id !== id))
                            Swal.fire('Məlumat silindi', '', 'success')
                        }
                    })
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()

        console.log(e);

        const formData = new FormData(e.target)
        const data = {}

        for (const [key, value] of formData.entries()) {
            // console.log(key, value);
            data[key] = value
        }

        console.log("data", data);

        if (!data.fullname) {
            toast.error("Ad daxil edilməyib", toast_config)
            return
        }

        // request to backend
        axios.put(`${apiUrl}/users/${selectedRow.id}`, {
            fullname: data.fullname
        }).then(resp => {
            console.log("edit result", resp);
            if (resp.status === 200) {
                toast.success('Uğurla redakdə edildi.', toast_config);
                setIsOpenEditModal(false)
                setData(prevState => {
                    const selectedItem = prevState.find(x => x.id === selectedRow.id)

                    console.log("selectedItem old", selectedItem);

                    selectedItem.fullname = data.fullname

                    console.log("selectedItem new", selectedItem);

                    return prevState
                })
            }
        })

    }

    const addUser = () => {

        setIsOpenCreateModal(true)

        // axios.post("http://localhost:3000/users", {
        //     id: Date.now(),
        //     fullname: "Rufet Rzayev"
        // }).then(res => {
        //     console.log("new user resp", res);
        // })
    }

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
                            <div>
                                <Button
                                    color='success'
                                    className='mb-4'
                                    onClick={addUser}
                                >
                                    Add User
                                </Button>
                                <Table hover>
                                    <tbody>
                                        {
                                            data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.fullname}</td>
                                                    <td>
                                                        {/* <Button
                                                        color='primary'
                                                    >
                                                        Ətraflı
                                                    </Button> */}
                                                        <Link
                                                            to={`/user/${item.id}`}
                                                            className='btn btn-primary'
                                                        >
                                                            Ətraflı
                                                        </Link>
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
                            </div>

                    }
                </ProCard>
            </div>
            {/* edit modal */}
            {
                !selectedRow ? "" :
                    <Modal
                        isOpen={isOpenEditModal}
                        toggle={() => setIsOpenEditModal(false)}
                    >
                        <ModalHeader toggle={() => setIsOpenEditModal(false)}>Redakdə et</ModalHeader>
                        <Form onSubmit={e => handleEdit(e)}>
                            <ModalBody>
                                <Input
                                    name='fullname'
                                    // value={selectedRow.fullname}
                                    defaultValue={selectedRow.fullname}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type='submit'
                                    color="primary"
                                >
                                    Yadda saxla
                                </Button>{' '}
                                <Button type='button' color="secondary" onClick={() => setIsOpenEditModal(false)}>
                                    İmtina
                                </Button>
                            </ModalFooter>
                        </Form>
                    </Modal>

            }
            {/* create modal */}
            <Modal
                isOpen={isOpenCreateModal}
                toggle={() => setIsOpenCreateModal(false)}
            >
                <ModalHeader toggle={() => setIsOpenCreateModal(false)}>İstifadəçi əlavə et</ModalHeader>
                {/* <Form onSubmit={ }>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => setIsOpenCreateModal(false)}>
                            Do Something
                        </Button>{' '}
                        <Button color="secondary" onClick={() => setIsOpenCreateModal(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form> */}
            </Modal>
        </div >
    )
}

export default Home