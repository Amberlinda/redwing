import axios from 'axios';
import './TeamWork.css';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { pageTransitions, pageVariants } from 'animations';
import { Container, TeamTabBottom, TeamTabTop, ModalBody, Projects } from './Style';
import { Button, Container as MdContainer, Grid, Modal, Box,CardMedia, Card, CardContent, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TabComponent from 'components/TabComponent/TabComponent';
import moment from 'moment';
import useLongPress from '../../hooks/useLongPress'
import { alertClasses } from '@mui/material';
import BottomStatistics from './BottomStatistics'
import TableRow from './TableRow'

const token = localStorage.getItem('red_wing_token');
const token_expiry_date = localStorage.getItem('red_wing_token_expiry_date');

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

const deleteMemberStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#353935',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };
  

const TeamWork = ({
	isInverted,
	showTeamTabTop = true,
	showTabComponent = true,
	showActionButtons = true
}) => {
	const [tabValue, setTabValue] = useState('Team');
	const localStorageData = localStorage.getItem('redwing_data');
	const [data, setData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData) : {}
	);
	const [projectData, setProjectData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData).projects : []
	);
	const [projects, setProjects] = useState([]);
	const [users, setUsers] = useState([]);
	const [projectId, setProjectId] = useState('');
	const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [sortingOrder, setSortingOrder] = useState('DEC');
	const [sortingColumn, setSortingColumn] = useState('tasks_count');
	const [openDeleteModal,setOpenDeleteModal]=useState(false);
	const [deleteMember,setDeleteMember] = useState({img:'',name:'', user_id:''})
	const [exceptionNameList,setExceptionNameList] = useState(["kajal"])

	useEffect(() => {
		getTeamWorkData();
		setInterval(async () => getTeamWorkData(), 120000);
	}, []);

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

	const getTeamWorkData = () => {
		// setLoading(true);
		axios
			.get(`${process.env.REACT_APP_API_URL}/pages/team_work.php`, {
				headers: {
					// Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(res => {
				setData(res.data);
				setProjectData(res.data.projects);
				localStorage.setItem('redwing_data', JSON.stringify(res.data));
				// setLoading(false);
			})
			.catch(error => {
				console.error(error);
				// setLoading(false);
			});
	};

	// const getProjectData = () => {
	// 	setProjectLoading(true);
	// 	axios
	// 		.get(`${process.env.REACT_APP_API_URL}/pages/projects.php`, {
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 				'Access-Control-Allow-Origin': '*'
	// 			}
	// 		})
	// 		.then(res => {
	// 			setProjectData(res.data);
	// 			setProjectLoading(false);
	// 		})
	// 		.catch(error => {
	// 			console.error(error);
	// 			setProjectLoading(false);
	// 		});
	// };

	useEffect(() => {
		var users = [];
		if (data && data.users && data.users.length) {
			data.users.forEach(user => {
				if (user.user_id !== 33629907) {
					users.push(user);
				}
			});
			// for (var k in data.users) {
			// 	users.push(data.users[k]);
			// }
			setUsers(users);
			setSortingOrder('DEC');
			setSortingColumn('tasks_count');
		}
	}, [data]);

	useEffect(() => {
		var projects = [];
		for (var k in projectData) {
			projects.push(projectData[k]);
		}
		setProjects(projects);
		console.log(projects);
	}, [projectData]);

	const handleRefreshUserList = () => {
		setLoading(true);
		axios
			.get(`${process.env.REACT_APP_API_URL}/pages/refresh_user_list.php`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(res => {
				if (res.data.status === true) {
					alert(res.data.message);
					getTeamWorkData();
					// getProjectData();
				} else {
					alert('Something went wrong');
					console.log(res.data);
				}
				setLoading(false);
			})
			.catch(error => {
				console.error(error);
				setLoading(false);
			});
	};

	const onSVGClick = () => {
		if (tabValue === 'Team') {
			setTabValue('Projects');
		}
		if (tabValue === 'Projects') {
			setTabValue('Team');
		}
	};

	const handleOpenProjectModal = () => {
		setOpenAddProjectModal(true);
	};

	const handleCloseProjectModal = () => {
		setOpenAddProjectModal(false);
	};

	const handleAddProjectId = () => {
		if (projectId) {
			setLoading(true);
			handleCloseProjectModal();
			axios
				.post(
					`${process.env.REACT_APP_API_URL}/pages/add_project.php`,
					{ project_id: projectId },
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Access-Control-Allow-Origin': '*'
						}
					}
				)
				.then(res => {
					if (res.data.status === true) {
						alert(res.data.message);
						setProjectId('');
						getTeamWorkData();
						// getProjectData();
					} else {
						handleOpenProjectModal();
						alert('Something went wrong');
						console.log(res.data);
					}
					setLoading(false);
				})
				.catch(error => {
					console.error(error);
					setLoading(false);
				});
		}
	};


	const handleCloseDeleteModal = ()=>{
		setOpenDeleteModal(false);
	}

	const bottomStatisticsHandler = (userArr) => {
		if(!userArr && userArr.length === 0) return
		
		const absents = []
		const slowdowns= []
		const idles=[]

		const userNameHandler = (userName) => {
			if(!userName){return "profile"}
			return userName.split(' ')[0]
		}

		userArr.forEach((user,index) => {
			if(exceptionNameList.indexOf(userNameHandler(user.name).toLowerCase()) !== -1 ){
				idles.push(userNameHandler(user.name))
			}else{
				user.active_todo_count === 0 ? 
				absents.push(userNameHandler(user.name))
				: (moment().diff(moment(user.last_active_at), 'hours') >= 3) ? slowdowns.push(userNameHandler(user.name))
				: idles.push(userNameHandler(user.name))
				}
		})

		return(
			<div className='statisticsBottomCont'>
				<BottomStatistics count={absents} color="red" label="Absents"/> 
				<BottomStatistics count={slowdowns} color="#EDFC45" label="Slowdowns"/>
				<BottomStatistics count={idles} label="Idles"/>
			</div>
		)
	}
	
	

	return (
		<>
			<motion.div
				initial='initial'
				animate={isInverted ? 'inRight' : 'inLeft'}
				exit={isInverted ? 'outRight' : 'outLeft'}
				variants={pageVariants}
				transition={pageTransitions}
				style={{ width: '100%', height: '100%',position:"relative"}}
			>
				<Container>
					{showTabComponent && (
						<TabComponent
							active={tabValue}
							setActive={setTabValue}
							tabList={['Team', 'Projects']}
							counts={{ Team: users?.length }}
						/>
					)}
					{tabValue === 'Team' && (
						<>
							{showTeamTabTop && (
								<TeamTabTop>
									<table style={{width: '100%'}}>
										<tr align='center'>
											<th align='center'>Today</th>
											<th align='center'>Average</th>
											<th align='center'>Sleeping</th>
											<th align='center'>Unassigned</th>
										</tr>
										<tr style={{ alignItems: 'center', margin: 'auto' }}>
											<td align='center'>{data.tickets_created_today}</td>
											<td>{data.average}</td>
											<td>
												<a
													href='https://redwing.puneetpugalia.com/pages/sleeping_task.php'
													target='_blank'
													rel='noreferrer'
													style={{ color: 'white' }}
												>
													{data.sleeping_tasks}
												</a>
											</td>
											<td>
												<a
													href='https://redwing.puneetpugalia.com/pages/unassigned_task.php'
													target='_blank'
													rel='noreferrer'
													style={{ color: 'white' }}
												>
													{data.unassigned_tasks}
												</a>
											</td>
										</tr>
									</table>
								</TeamTabTop>
							)}
							<TeamTabBottom>
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

								{bottomStatisticsHandler(users)}

								{showActionButtons && (
									<MdContainer maxWidth='md'>
										{token && token !== 'undefined' && new Date(token_expiry_date) > new Date() && (
											<Grid container spacing={3} direction='row' justifyContent='center'>
												<Grid item>
													<Button
														variant='contained'
														color='primary'
														onClick={handleOpenProjectModal}
													>
														Add New Project
													</Button>
												</Grid>
												<Grid item>
													<Button
														variant='contained'
														onClick={handleRefreshUserList}
														color='primary'
													>
														Refresh User List
													</Button>
												</Grid>
											</Grid>
										)}
										{(!token ||
											token === 'undefined' ||
											new Date(token_expiry_date) <= new Date()) && (
												<Grid container spacing={3} direction='row' justifyContent='center'>
													<Grid item>
														<a href='https://launchpad.37signals.com/authorization/new?type=web_server&client_id=7d03697adc886996a673634b89d51d8febb29979&redirect_uri=https://touch-dashborad.herokuapp.com/auth/callback'>
															<Button variant='contained' color='primary'>
																Login to Basecamp
															</Button>
														</a>
													</Grid>
												</Grid>
											)}
									</MdContainer>
								)}
							</TeamTabBottom>
						</>
					)}
					{tabValue === 'Projects' && (
						<Projects>
							<h2>Projects</h2>
							<table>
								<thead>
									<tr>
										<th>Projects</th>
										<th style={{ textAlign: 'center' }}>Tasks Today</th>
									</tr>
								</thead>
								<tbody>
									{projects
										? projects.map((project, key) => {
											return (
												<tr>
													<td>{project.name}</td>
													<td>{project.todos_created_today_count}</td>
												</tr>
											);
										})
										: ''}
								</tbody>
							</table>
							<MdContainer maxWidth='md'>
								{token && token !== 'undefined' && new Date(token_expiry_date) > new Date() && (
									<Grid container spacing={3} direction='row' justifyContent='center'>
										<Grid item>
											<Button variant='contained' color='primary' onClick={handleOpenProjectModal}>
												Add New Project
											</Button>
										</Grid>
										<Grid item>
											<Button variant='contained' onClick={handleRefreshUserList} color='primary'>
												Refresh User List
											</Button>
										</Grid>
									</Grid>
								)}
								{(!token || token === 'undefined' || new Date(token_expiry_date) <= new Date()) && (
									<Grid container spacing={3} direction='row' justifyContent='center'>
										<Grid item>
											<a href='https://launchpad.37signals.com/authorization/new?type=web_server&client_id=7d03697adc886996a673634b89d51d8febb29979&redirect_uri=https://touch-dashborad.herokuapp.com/auth/callback'>
												<Button variant='contained' color='primary'>
													Login to Basecamp
												</Button>
											</a>
										</Grid>
									</Grid>
								)}
							</MdContainer>
						</Projects>
					)}
				</Container>
				{/* Modal for deleting team member */}
				{/* <Modal
					open={openDeleteModal}
					onClose={handleCloseDeleteModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					 <Box sx={deleteMemberStyle}>
					<Card sx={{ display: 'flex' }}>
						<CardMedia
							component="img"
							sx={{ width: 151 }}
							image={deleteMember.img}
							alt="Live from space album cover"
						/>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="div" variant="h5">
								{deleteMember.name.split(' ')[0]}{' '}
							</Typography>
							</CardContent>
							<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
								<Button variant='contained'  color='primary' onClick={()=>handleDeleteMember(deleteMember.user_id)}>Delete</Button>
							</Box>
						</Box>
						
					</Card>
					 </Box>
				</Modal> */}

				<Modal
					open={openAddProjectModal}
					onClose={handleCloseProjectModal}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'
				>
					<Grid
						container
						spacing={3}
						direction='row'
						justifyContent='center'
						alignItems='center'
						style={{ height: '100vh' }}
					>
						<Grid
							item
							xs={10}
							sm={8}
							md={5}
							style={{
								width: 400,
								backgroundColor: 'white',
								border: '2px solid #000',
								padding: '3px'
							}}
						>
							<ModalBody>
								<div className='modal_header'>
									<Typography variant='h2' style={{ position: 'relative' }}>
										Add Project
										<CloseIcon
											fontSize='large'
											style={{ position: 'absolute', right: '0', cursor: 'pointer' }}
											onClick={handleCloseProjectModal}
										/>
									</Typography>
								</div>
								<div className='modal_body'>
									<TextField
										id='outlined-basic'
										label='Project Id'
										variant='outlined'
										fullWidth={true}
										onChange={function (event) {
											setProjectId(event.target.value);
										}}
									/>
									<Button variant='contained' onClick={handleAddProjectId}>
										Add
									</Button>
								</div>
							</ModalBody>
						</Grid>
					</Grid>
				</Modal>
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color='inherit' />
				</Backdrop>
			</motion.div>
		</>
	);
};

export default TeamWork;
