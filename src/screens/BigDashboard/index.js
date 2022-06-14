import React, { useEffect, useState } from 'react';
import TeamWork from 'screens/TeamWork/TeamWork';
import styles from './BigDashboard.module.css';
import { TopStatistics } from './TopStatistics';
import ProjectsColumn from './ProjectsColumn';
import ActivitiesColumn from './ActivitiesColumn';
import moment from 'moment';
import axios from 'axios';
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import MinimizeIcon from '@mui/icons-material/Maximize';
import { motion } from 'framer-motion'

const BigDashboard = ({ selectedProject, setSelectedProject, timer }) => {
	useEffect(() => {
		getTeamWorkData();
		setInterval(async () => getTeamWorkData(), 120000);
	}, []);

	const [totalTickets, setTotalTickets] = useState(0);
	const [completedTask, setCompletedTask] = useState(0);
	const [showColumns,setShowColumns] = useState({
		activity:true,
		project:true,
		teamwork:true,
	})

	const localStorageData = localStorage.getItem('redwing_data');

	const [allusers, setAllUsers] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData) : {}
	);

	const [data, setData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData) : {}
	);
	const [projectData, setProjectData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData).projects : []
	);

	const scrollTop=()=>{
		window.scrollTo({top:0,behaviour:'smooth'})
	}

	const maxIconStyle = {
		fontSize:"25px",
		transition:"transform 0.5s",
		cursor:"pointer"
	}

	useEffect(() => {
		if (allusers.users) {
			const teamMembers = allusers.users.filter(user => user.user_id !== 33629907);
			const totalTasks = teamMembers.reduce((acc, user) => {
				return acc + user.tasks_count;
			}, 0);
			if(totalTasks !== totalTickets){
				setTotalTickets(totalTasks);
				setTopStatisticsCount(prev => {
					return {
						...prev,
						teamLoad: totalTasks
					};
				});
			}
		}
	}, [allusers]);

	useEffect(() => {
		if(allusers.users) {
			const teamMembers = allusers.users.filter(user => user.user_id !== 33629907);
			const totalCompleteTask  = teamMembers.reduce((acc,user) => {
				return acc + user.completed_todo;
			},0);
			if(totalCompleteTask !== completedTask){
				setCompletedTask(totalCompleteTask);
				setTopStatisticsCount(prev => {
					return {
						...prev,
						taskCompleted: completedTask
					}
				});
			}
		}
	},[allusers]);

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
				// console.log(res.data);
				localStorage.setItem('redwing_data', JSON.stringify(res.data));
				setData(res.data);
				setAllUsers(res.data);
				setProjectData(res.data.projects);
				// setLoading(false);
			})
			.catch(error => {
				console.error(error);
				// setLoading(false);
			});
	};

	useEffect(()=>{
		setTopStatisticsCount(()=>{
			return {
				...topStatisticsCount,
				tasksToday: data.tickets_created_today
			};
		});
	},[data]);

	const [topStatisticsCount, setTopStatisticsCount] = useState({
		hoursOfWeek: 0,
		completion: 0,
		worthOrders: '$0',
		tasksToday: data.tickets_created_today,
		teamLoad: totalTickets,
		taskCompleted: completedTask
	});
	useEffect(() => {
		// console.log(timer);
		setTopStatisticsCount(prev => {
			return {
				...prev,
				hoursOfWeek: timer.day,
				completion: moment().add(timer.day, 'hours').format('hh:mm')
			};
		});
	}, [timer]);

	const maximiseColHandler = (type) => {
		if(!type)return

		const obj = {...showColumns}

		Object.keys(showColumns).forEach((val) => {
			obj[val] = (val == type) ? true : false
		})

		setShowColumns(obj)
	}

	const minimizeColHandler = () => {

		const obj = {...showColumns}

		Object.keys(showColumns).forEach((val) => {
			obj[val] = true
		})

		setShowColumns(obj)
	}


	return (
		<div className={styles.bigdashboard}>
			<Helmet>
				<meta name="apple-mobile-web-app-capable" content="yes" />
			</Helmet>
			{showColumns.activity && 
			<div 
			className={`${styles.activity} ${showColumns.project ? "" : styles.expandCol}`}
			>
				{showColumns.project ? 
				<HomeMaxIcon style={maxIconStyle} className={styles.maxIcon} onClick={() => maximiseColHandler("activity")}/>
				:<MinimizeIcon className={styles.minIcon} style={maxIconStyle} onClick={minimizeColHandler}/>}
				<div className={styles.outertopStatisticsBar}>
					<div className={styles.topStatisticsBar}>
						<TopStatistics text={'Hours of work'} count={topStatisticsCount.hoursOfWeek} />
						<TopStatistics text={'Completion'} count={topStatisticsCount.completion} />
					</div>
				</div>
				<div className={styles.alignActivitiesContent}>
					<ActivitiesColumn
						setTopStatisticsCount={setTopStatisticsCount}
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
					/>
				</div>
			</div>}
			{showColumns.project && <div className={`${styles.project} ${showColumns.teamwork ? "" : styles.expandCol}`}>
				{showColumns.teamwork ? 
				<HomeMaxIcon style={maxIconStyle} className={styles.maxIcon} onClick={() => maximiseColHandler("project")}/>
				:<MinimizeIcon className={styles.minIcon} style={maxIconStyle} onClick={minimizeColHandler}/>}
				<div className={styles.outertopStatisticsBar}>
					<div className={styles.topStatisticsBar}>
						<TopStatistics text={'Worth Orders'} count={topStatisticsCount.worthOrders} />
					</div>
				</div>
				<div className={styles.alignProjectsContent}>
					<ProjectsColumn setTopStatisticsCount={setTopStatisticsCount} />
				</div>
			</div>}
			{showColumns.teamwork && <div className={`${styles.teamWork} ${showColumns.project ? "" : styles.expandCol}`}>
				{showColumns.project ? 
				<HomeMaxIcon style={maxIconStyle} className={styles.maxIcon} onClick={() => maximiseColHandler("teamwork")}/>
				:<MinimizeIcon className={styles.minIcon} style={maxIconStyle} onClick={minimizeColHandler}/>}
				<div className={styles.outertopStatisticsBar}>
					<div className={styles.topStatisticsBar}>
						<TopStatistics text={'Tasks Today'} count={topStatisticsCount.tasksToday} />
						<TopStatistics text={'Team Load'} count={totalTickets} />
						<TopStatistics text={'Completions'} count={completedTask} />
					</div>
				</div>
				<div className={styles.alignTeamContent}>
					<TeamWork
						isInverted={false}
						screenIndex={2}
						showTeamTabTop={false}
						showTabComponent={false}
						showActionButtons={false}
					/>
				</div>
			</div>}
			<div className="big-dashboard-footer" style={{margin:"1rem"}}>
				<Link to='/homepage'onClick={scrollTop}>Go to Homepage</Link>
			</div>
		</div>
	);
};

export default BigDashboard;
