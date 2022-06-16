import React from 'react';
export const TopStatistics = ({ text, count, link=false }) => {
	return (
		<div style={{ color: 'white', fontSize: 12 }}>
			<div style={{ fontSize: 25 }}>
				{link ? <a href={link} target="__blank" style={{color:"#fff"}}>{count}</a> : count}
			</div>

			<div style={{ fontSize: 12 }}>{text}</div>
		</div>
	);
};
