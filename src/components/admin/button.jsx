import Head from 'next/head';
import { useState } from 'react';
import styles from '@styles/Admin.module.css';

export const Button = ({type, actionFn, _id}) => {

	// console.log(type);
	return (
		<button onClick={()=>actionFn()} className={styles[type]}>{type ? type : '-'}</button>
	); 
};
