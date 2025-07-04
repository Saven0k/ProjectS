import { useEffect, useState } from 'react'
import './ControlUniversityGroups.css'
import trash from './red_trash.svg'
import { addUniversityGroup, deleteUniversityGroup, getUniversityGroups } from '../../../services/ApiToServer/universityGroups'

const ControlUniversityGroups = () => {
    const [groups, setGroups] = useState([])
    const [newGroupName, setNewGroupName] = useState('')

    const prepairData = async () => {
        const groupsB = await getUniversityGroups();
        if (groupsB.length === 0) {
            setGroups([])
        }
        else {
            setGroups(groupsB)
        }
    }

    useEffect(() => {
        prepairData()
    }, [])

    const handleSaveGroup = async () => {
        const data = await addUniversityGroup(newGroupName)
        setGroups([...groups, { name: data.response.universityGroupName, id: data.response.groupId }])
        setNewGroupName('')
    }

    const handleDeleteGroup = (id) => {
        setGroups(groups.filter(group => group.id !== id))
        deleteUniversityGroup(id)
    }

    return (
        <div className='groups_component'>

            <div className="group_list">
                {groups.length !== 0 ?
                    groups.map((group, index) => (
                        <div className="group_block" key={index}>
                            <h3>{group.name}</h3>
                            <div className="delete_group">
                                <button
                                    className='button_delete_group'
                                    onClick={() => handleDeleteGroup(group.id)}
                                >
                                    <img height={24} src={trash} alt="Delete" className='delete_group_img' />
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    <p>Ничего нет</p>
                }
            </div>
            <div className="group_create">
                <h4>Добавление новой группы </h4>
                <div className="new_group_block">
                    <input
                        type="text"
                        className="group_name"
                        onChange={(e) => setNewGroupName(e.target.value)}
                        value={newGroupName}
                        minLength={5}
                        maxLength={15}
                        placeholder='Что-то....'
                    />
                    <button className='button_done' onClick={() => handleSaveGroup()}>
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlUniversityGroups;