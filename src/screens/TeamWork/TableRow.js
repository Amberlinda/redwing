import React from 'react'
import axios from 'axios';
import './TeamWork.css';
import { Button, Container as MdContainer, Grid, Modal, Box,CardMedia, Card, CardContent, TextField } from '@material-ui/core';
import moment from 'moment';
import useLongPress from '../../hooks/useLongPress'


const TableRow = props => {

    const token = localStorage.getItem('red_wing_token');
    const token_expiry_date = localStorage.getItem('red_wing_token_expiry_date');

	const getProjectname=(projectid)=>{
		for(let i=0;i<props.projectsdata.length;i++){
			if(props.projectsdata[i].project_id===projectid){
				let c=getProjectCount(projectid,props.user_id)
				let s=props.projectsdata[i].name;
				// if(s.length>13){
				// 	s=s.slice(0,12)+'...';
				// }
				return s+' ('+c+')';
			}
		}
	}
	const getProjectCount=(projectid,userid)=>{
		// console.log(props.data);
		for(let i=0;i<props.data.length;i++){
			if(props.data[i].user_id===userid){
				return props.data[i]?.projects[projectid]?.count;
			}
		}
	}
	const handleDeleteMember = (user_id)=>{
		console.log(user_id)
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/pages/delete_user.php`,
				{ user_id: user_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Access-Control-Allow-Origin': '*'
					}
				}
			)
			.then(res => {
				if (res.data.success === true) {
					alert(res.data.message);
					// getProjectData();
				} else {
					alert('Something went wrong');
					console.log(res.data);
				}
				props.getTeamWorkData()
				props.setLoading(false);
			})
			.catch(error => {
				console.error(error);
				props.setLoading(false);
			});
	}

	const onAvatarLongPress = () => {
		// props.setDeleteMember({img:props.img, name:props.name, user_id:props.user_id})
        // props.setOpenDeleteModal(true)
		if(window.confirm("Do you want to delete this user?")){
			handleDeleteMember(props.user_id)
		}
		
    };

    const onAvatarClick = () => {
        console.log('click is triggered')
    }

	const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
	const longPressAvatarEvent = useLongPress(onAvatarLongPress, onAvatarClick, defaultOptions)
	// console.log(parseInt(props.active.split('(')[0])-props.completed_todo)
	// console.log(props.active)
	return (
		<tr style={{ marginTop: '0', paddingTop: '0' }}>
			<td style={{ fontSize: '14px' }}>
				<Grid container spacing={2}>
					<Grid  item xs={2} sm={1} style={{ transform: 'translateY(-2px)' }}>
						<img {...longPressAvatarEvent} src={props.img} alt='profile' style={{ width: '24px', height: '24px' }}></img>
					</Grid>
					<Grid item xs={8} sm={10} style={{ fontSize: '14px' }}>
						<a
							href={`https://3.basecamp.com/4954106/reports/users/progress/${props.user_id}`}
							style={{
								color: (props.exceptionNameList.indexOf(props.name.split(' ')[0].toLowerCase()) !== -1) 
								? "#fff" : props.active_todo === 0 ? 'red' : (moment().diff(moment(props.last_active_at), 'hours') >= 3 ? '#EDFC45' : 'white'),
								paddingLeft: '2rem',
								fontSize: '14px'
							}}
							target='_blank'
							rel='noreferrer'
						>
							{props.name.split(' ')[0]}{' '}
						</a>
					</Grid>
				</Grid>
			</td>
			<td style={{ transform: 'translate(0, -3px)', fontSize: '14px' }}>
				<div style={{display: 'flex', justifyContent: 'flex-start',marginLeft:"30px"}}>
				{props.completed_todo && parseInt(props.completed_todo) !== 0
					? [...Array(props.completed_todo)].map((count, key) => {
						if (key !== 1 && key !== 0 && (key + 1) % 5 === 0) {
							return (
								<span
									style={{
										marginRight: '5px',
										fontSize: '14px'
									}}
									key={key}
								>
									<svg
										width='16'
										height='13'
										viewBox='0 0 16 13'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M13.2982 1.2859C13.5588 1.0378 13.9056 0.900638 14.2654 0.90336C14.6252 0.906083 14.9699 1.04848 15.2267 1.3005C15.4835 1.55252 15.6324 1.89445 15.6419 2.25414C15.6514 2.61384 15.5208 2.96316 15.2777 3.2284L7.89621 12.4599C7.76928 12.5966 7.61609 12.7063 7.44579 12.7824C7.2755 12.8586 7.09159 12.8996 6.90508 12.9031C6.71856 12.9065 6.53326 12.8723 6.36026 12.8025C6.18726 12.7327 6.03012 12.6288 5.89822 12.4969L1.00313 7.60178C0.866812 7.47476 0.757474 7.32158 0.681639 7.15138C0.605804 6.98118 0.565026 6.79745 0.561739 6.61115C0.558452 6.42485 0.592723 6.2398 0.662507 6.06703C0.73229 5.89427 0.836158 5.73732 0.967912 5.60557C1.09967 5.47381 1.25661 5.36995 1.42938 5.30016C1.60214 5.23038 1.7872 5.19611 1.9735 5.1994C2.1598 5.20268 2.34352 5.24346 2.51372 5.3193C2.68392 5.39513 2.8371 5.50447 2.96413 5.64079L6.83801 9.51283L13.263 1.3266C13.2746 1.31236 13.287 1.29877 13.3 1.2859H13.2982Z'
											fill='#14FF00'
										/>
									</svg>
									<br />
								</span>
							);
						}
						return (
							<span
								style={{
									marginRight: '5px',
									fontSize: '14px'
								}}
								key={key}
							>
								<svg
									width='16'
									height='13'
									viewBox='0 0 16 13'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M13.2982 1.2859C13.5588 1.0378 13.9056 0.900638 14.2654 0.90336C14.6252 0.906083 14.9699 1.04848 15.2267 1.3005C15.4835 1.55252 15.6324 1.89445 15.6419 2.25414C15.6514 2.61384 15.5208 2.96316 15.2777 3.2284L7.89621 12.4599C7.76928 12.5966 7.61609 12.7063 7.44579 12.7824C7.2755 12.8586 7.09159 12.8996 6.90508 12.9031C6.71856 12.9065 6.53326 12.8723 6.36026 12.8025C6.18726 12.7327 6.03012 12.6288 5.89822 12.4969L1.00313 7.60178C0.866812 7.47476 0.757474 7.32158 0.681639 7.15138C0.605804 6.98118 0.565026 6.79745 0.561739 6.61115C0.558452 6.42485 0.592723 6.2398 0.662507 6.06703C0.73229 5.89427 0.836158 5.73732 0.967912 5.60557C1.09967 5.47381 1.25661 5.36995 1.42938 5.30016C1.60214 5.23038 1.7872 5.19611 1.9735 5.1994C2.1598 5.20268 2.34352 5.24346 2.51372 5.3193C2.68392 5.39513 2.8371 5.50447 2.96413 5.64079L6.83801 9.51283L13.263 1.3266C13.2746 1.31236 13.287 1.29877 13.3 1.2859H13.2982Z'
										fill='#14FF00'
									/>
								</svg>
							</span>
						);
					})
				
					: ''}
					
				<span style={{ marginLeft: '2rem' }}></span>
				{props.active && parseInt(props.active.split('(')[0]) !== 0
					? [
						...Array(
							(parseInt(props.active.split('(')[0])) - props.completed_todo <=0 
								? 0
								: (parseInt(props.active.split('(')[0])) - props.completed_todo>0
								?(parseInt(props.active.split('(')[0])) - props.completed_todo:
								0
								
						)
					]?.map((count, key) => {
						return (
							<span style={{ marginRight: '5px', fontSize: '14px' }}>
								<svg
									width='7'
									height='7'
									viewBox='0 0 7 7'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									style={{ fontSize: '14px', transform: 'translateY(-40%)' }}
									>
									<circle cx='3.58691' cy='3.90332' r='3' fill='#666666' />
								</svg>
							</span>
									
						);
					})
					: ''}
				</div>
			</td>
			<td style={{ transform: 'translateX(-8px)',fontSize: '14px',textAlign:"center",paddingLeft:'25px'}}>
				<a
					href={`https://3.basecamp.com/4954106/reports/todos/assigned/${props.user_id}`}
					style={{
						color:
							props?.tasks > 15 || props?.tasks <= 2 ? 'red' : 'white',
						fontSize: '14px',
						alignContent:'center',
						
						
					}}
					target='_blank'
					rel='noreferrer'
				>
					{props.tasks>0?props.tasks:''}
				</a>
			</td>
			<td style={{ textAlign: 'center', transform: 'translateX(-8px)'}}>
				<p
					style={{
						color:
							props.projects.length > 3 ? 'red' : props.projects.length === 1 ? '#98FB58' : 'white',
						fontSize: '13px',
						position: 'relative',
						display: 'inline-block'
					}} className='projectCount'
				>{props.projects.length>0?props.projects.length:''}
					<div style={{display: 'inline-block'}} className='ProjectCounttip'>{props.projects.map((each,i)=>{
						
						const projectname=getProjectname(each);
				
						return <div>{projectname}</div>;
					})}</div>
				</p>
			</td>
		</tr>
	);
};

export default TableRow;
