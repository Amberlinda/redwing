import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TableRow from './TableRow';

const TeamWorkTable = ({
    userData,
    projects,
    getTeamWorkData,
    setLoading,
    exceptionNameList,
    data,
    propsSortingColumn
}) => {

    const [users,setUsers] = useState([])
    const [sortingOrder, setSortingOrder] = useState('DEC');
	const [sortingColumn, setSortingColumn] = useState('tasks_count');

    const sorting = (col, sortingOrder1) => {
		if (col === 'tasks_count' || col === 'active_count') {
			if (sortingOrder1 === 'ASC') {
				const sorted = [...users].sort((a, b) => (a[col] < b[col] ? 1 : -1));

				setUsers(sorted);

				setSortingOrder('DEC');
			} else if (sortingOrder1 === 'DEC') {
				const sorted = [...users].sort((a, b) => (a[col] > b[col] ? 1 : -1));

				setUsers(sorted);

				setSortingOrder('ASC');
			}
		} else if (col === 'project_ids') {
			if (sortingOrder1 === 'ASC') {
				const sorted = [...users].sort((a, b) => (a[col].length < b[col].length ? 1 : -1));

				setUsers(sorted);

				setSortingOrder('DEC');
			} else if (sortingOrder1 === 'DEC') {
				const sorted = [...users].sort((a, b) => (a[col].length > b[col].length ? 1 : -1));

				setUsers(sorted);

				setSortingOrder('ASC');
			}
		} else if (col === 'name') {
			if (sortingOrder1 === 'ASC') {
				const sorted = [...users].sort((a, b) =>
					a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
				);

				setUsers(sorted);

				setSortingOrder('DEC');
			} else if (sortingOrder1 === 'DEC') {
				const sorted = [...users].sort((a, b) =>
					a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
				);

				setUsers(sorted);

				setSortingOrder('ASC');
			}
		}else if (col === 'completed_todo') {
			if (sortingOrder1 === 'ASC') {
				const sorted = [...users].sort((a, b) => (a[col] < b[col] ? 1 : -1));

				setUsers(sorted);

				setSortingOrder('DEC');
			} else if (sortingOrder1 === 'DEC') {
				const sorted = [...users].sort((a, b) => (a[col] > b[col] ? 1 : -1));

				setUsers(sorted);

				setSortingOrder('ASC');
			}
		}
		//(sortingOrder);
	};


    useEffect(() => {
        setUsers(userData)
    },[userData])

    useEffect(() => {
       setSortingColumn(propsSortingColumn)
    },[propsSortingColumn])

    

    return(
        <table cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th
                        onClick={e => {
                            e.preventDefault();
                            setSortingColumn('name');
                            if (sortingOrder === 'ASC') {
                                sorting('name', 'ASC');
                            } else {
                                sorting('name', 'DEC');
                            }
                        }}
                        style={{
                            transform: 'translateX(-6px)',
                            fontSize: '14px',
                            lineHeight: '21px',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            width: '1%',
                            'white-space': 'nowrap',
                            cursor:"pointer"
                        }}
                    >
                        {users.length} Team Members
                        {sortingColumn === 'name' ? (
                            <a href='/' style={{ color: 'white', marginLeft: '2px' }}>
                                {sortingOrder === 'ASC' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            </a>
                        ) : (
                            ''
                        )}
                    </th>

                    <th
                        onClick={(e) => {
                            e.preventDefault();
                            setSortingColumn('completed_todo');
                            if (sortingOrder === 'ASC') {
                                sorting('completed_todo', 'ASC');
                            } else {
                                sorting('completed_todo', 'DEC');
                            }
                        }}
                        style={{
                            textAlign: 'left',
                            position:'relative',
                            right:"-30px",
                            paddingRight: '5rem',
                            fontSize: '14px',
                            lineHeight: '21px',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            width: 'max-content',
                            cursor:"pointer"
                        }}
                    >
                        Activity
                        {sortingColumn === 'completed_todo' ? (
                            <a style={{ color: 'white', marginLeft: '2px' }} href='/'>
                                {sortingOrder === 'ASC' ? <ArrowUpwardIcon style={{position:'relative',top:"2px"}} /> : <ArrowDownwardIcon style={{position:'relative',top:"2px"}} />}
                            </a>
                        ) : (
                            ''
                        )}{' '}
                    </th>

                    <th
                        onClick={e => {
                            e.preventDefault();
                            setSortingColumn('tasks_count');
                            if (sortingOrder === 'ASC') {
                                sorting('tasks_count', 'ASC');
                            } else {
                                sorting('tasks_count', 'DEC');
                            }
                        }}
                        style={{
                            textAlign: 'center',
                            paddingRight: '2%',
                            fontSize: '14px',
                            lineHeight: '21px',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            width: '1%',
                            'white-space': 'nowrap',
                            cursor:"pointer"
                        }}
                    >
                        Tasks
                        {sortingColumn === 'tasks_count' ? (
                            <a style={{ color: 'white', marginLeft: '2px' }} href='/'>
                                {sortingOrder === 'ASC' ? <ArrowUpwardIcon style={{position:'relative',top:"2px"}} /> : <ArrowDownwardIcon style={{position:'relative',top:"2px"}} />}
                            </a>
                        ) : (
                            ''
                        )}{' '}
                    </th>
                    {/* <th
                        onClick={e => {
                            e.preventDefault();
                            setSortingColumn('active_count');
                            if (sortingOrder === 'ASC') {
                                sorting('active_count', 'ASC');
                            } else {
                                sorting('active_count', 'DEC');
                            }
                        }}
                        style={{
                            textAlign: 'center',
                            paddingRight: '1.5rem',
                            fontSize: '14px',
                            lineHeight: '21px',
                            fontFamily: 'Poppins',
                            fontWeight: '500'
                        }}
                    >
                        Comments
                        {sortingColumn === 'active_count' ? (
                            <a style={{ color: 'white', marginLeft: '2px' }} href='/'>
                                {sortingOrder === 'ASC' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            </a>
                        ) : (
                            ''
                        )}
                    </th> */}
                    <th
                        onClick={e => {
                            e.preventDefault();
                            setSortingColumn('project_ids');
                            if (sortingOrder === 'ASC') {
                                sorting('project_ids', 'ASC');
                            } else {
                                sorting('project_ids', 'DEC');
                            }
                        }}
                        style={{
                            textAlign: 'center',
                            // paddingRight: '1.5rem',
                            fontSize: '14px',
                            lineHeight: '21px',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            width: '1%',
                            'white-space': 'nowrap',
                            cursor:"pointer"
                        }}
                    >
                        Projects
                        {sortingColumn === 'project_ids' ? (
                            <a style={{ color: 'white', marginLeft: '2px' }} href='/'>
                                {sortingOrder === 'ASC' ? <ArrowUpwardIcon style={{position:'relative',top:"2px"}} /> : <ArrowDownwardIcon style={{position:'relative',top:"2px"}} />}
                            </a>
                        ) : (
                            ''
                        )}
                    </th>
                </tr>
            </thead>
            <tbody>
                {users
                    ? users.map((user, key) => {
                        return (
                            <TableRow
                                key={key}
                                img={user.avatar}
                                user_id={user.user_id}
                                tasks={user.tasks_count}
                                name={user.name}
                                active={user.active_count}
                                active_todo={user.active_todo_count}
                                projects={user.project_ids}
                                completed_todo={user.completed_todo}
                                last_active_at={user.last_active_at}
                                projectsdata={projects}
                                data={data.users}
                                getTeamWorkData={getTeamWorkData}	
                                setLoading={setLoading}
                                exceptionNameList={exceptionNameList}				
                            />
                        );
                    })
                    : ''}
            </tbody>
        </table>
    )
}

export default TeamWorkTable