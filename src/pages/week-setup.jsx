import Head from 'next/head';
import { useState, useEffect } from 'react';
import { usePlayers } from '@hooks/players';
import { useLineups } from '@hooks/lineups';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import styles from '@styles/Setup.module.css';
import { playerProfile } from '../../public/icons';
import _ from 'lodash';

var testData = [
	{
		number: 1,
		courtSides: {
			a: {
				_id: '652efa62458aca6401bcb5b8',
				first_name: 'Jane',
				last_name: 'Smith',
				passcode: '0000',
				level: 2,
				is_playing_this_week: false,
				registration_date: '2023-10-14T09:30:00.000Z',
			},
			b: {
				_id: '652efa62458aca6401bcb5bc',
				first_name: 'Sophia',
				last_name: 'Davis',
				passcode: '0000',
				level: 6,
				is_playing_this_week: false,
				registration_date: '2023-10-10T16:00:00.000Z',
			},
			c: {},
			d: {
				_id: '652efa62458aca6401bcb5bd',
				first_name: 'Robert',
				last_name: 'Moore',
				passcode: '0000',
				level: 7,
				is_playing_this_week: false,
				registration_date: '2023-10-09T17:30:00.000Z',
			},
		},
	},
	{
		number: 2,
		courtSides: {
			a: {
				_id: '652efa62458aca6401bcb5c2',
				first_name: 'Mia',
				last_name: 'Wright',
				passcode: '0000',
				level: 12,
				is_playing_this_week: false,
				registration_date: '2023-10-04T08:30:00.000Z',
			},
			b: {},
			c: {},
			d: {},
		},
	},
	{
		number: 3,
		courtSides: {
			a: {},
			b: {},
			c: {},
			d: {},
		},
	},
	{
		number: 4,
		courtSides: {
			a: {},
			b: {},
			c: {},
			d: {},
		},
	},
	{
		number: 5,
		courtSides: {
			a: {},
			b: {},
			c: {},
			d: {},
		},
	},
];

export default function Home() {
	const { getUsers, updateUser, data, error, isLoading, message } = usePlayers();
	const { addLineup, getLineups, lineups } = useLineups();
	const [dictionary, setDictionary] = useState({});
	const [courts, setCourts] = useState([]);
	const [lineup, setLineup] = useState({});
	const [hall, setHall] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const playersPerCourt = 4;

	useEffect(() => {
		async function fetchData (){

			await getUsers({ approved: true });
			await getLineups();
		}
		fetchData();
	}, []);


	useEffect(() => {
		if (data && data.length > 0) {
			setDictionary(convertIdToObject([...data]));
			const numCourts = Math.ceil(data.length / playersPerCourt);

			const courtsData = new Array(numCourts).fill().map((_, i) => {
				return {
					number: i + 1,
					courtSides: {
						a: {},
						b: {},
						c: {},
						d: {},
					},
				};
			});

			setCourts(courtsData);

			const existingPlayersInCourts = _.flatMap(testData, 'courtSides');
			const existingPlayerIdsInCourts = _.values(_.mapValues(existingPlayersInCourts, '_id'));

			let filledCourts = [...testData];
			lineups.courts

			filledCourts.forEach((court) => {
				Object.keys(court.courtSides).forEach((side) => {
					if (!court.courtSides[side]) return;

					const playerId = court.courtSides[side]._id;
					if (existingPlayerIdsInCourts.includes(playerId)) {
						court.courtSides[side] = dictionary[playerId];
					}
				});
			});
			filledCourts.length && setCourts(filledCourts);

			setHall([...data]);

			const playersInCourts = _.flatMap(testData, 'courtSides');
			let playerIdsInCourts = _.map(playersInCourts, (court) => {
				return _.values(_.mapValues(court, '_id'));
			});

			playerIdsInCourts = _.flatten(playerIdsInCourts).filter((id) => id);

			const newHallWithoutCourtPlayers = _.filter(data, (player) => !playerIdsInCourts.includes(player._id));
			setHall(newHallWithoutCourtPlayers);
			// console.log('lineup', lineups);
		}
	}, [data]);

	function convertIdToObject(inputArray) {
		const result = {};
		inputArray.forEach((item) => {
			const id = item._id;
			if (id) {
				const idValue = id;
				const itemCopy = { ...item };
				delete itemCopy.email;
				delete itemCopy.approved;
				delete itemCopy.partner;
				delete itemCopy.referrer;

				result[idValue] = itemCopy;
			}
		});
		return result;
	}

	const onDragStartHandler = () => {
		setIsDragging(true);
	};

	const onBeforeCaptureHandler = (res) => {
		console.log(res);
	};

	const onDragEndHandler = (res) => {
		const { source, destination, type, draggableId } = res;

		setIsDragging(false);

		if (!destination) return;

		if (type === 'group') {
			const newLineup = [...hall];
			let newCourts = [...courts];
			const sourceIndex = source.index;
			const destinationIndex = destination.index;

			if (source.droppableId !== 'HALL' && destination.droppableId !== 'HALL') {
				const [destinationCourtNumber, destinationCourtSide] = destination.droppableId.split('-');
				const [sourceCourtNumber, sourceCourtSide] = source.droppableId.split('-');
				let sourceSpot = courts[sourceCourtNumber - 1].courtSides[sourceCourtSide];
				let destinationSpot = courts[destinationCourtNumber - 1].courtSides[destinationCourtSide];

				newCourts[destinationCourtNumber - 1].courtSides[destinationCourtSide] = sourceSpot;
				newCourts[sourceCourtNumber - 1].courtSides[sourceCourtSide] = destinationSpot;

				return setCourts(newCourts);
			} else if (destination.droppableId !== 'HALL') {
				const [courtNumber, courtSide] = destination.droppableId.split('-');

				if (!!newCourts[courtNumber - 1].courtSides[courtSide]) return;

				newCourts[courtNumber - 1].courtSides[courtSide] = dictionary[draggableId];
				newLineup.splice(source.index, 1);

				setCourts(newCourts);
			} else if (source.droppableId !== 'HALL' && destination.droppableId === 'HALL') {
				const [courtNumber, courtSide] = source.droppableId.split('-');
				const movedPlayer = newCourts[courtNumber - 1].courtSides[courtSide];

				newLineup.splice(destinationIndex, 0, movedPlayer);

				newCourts[courtNumber - 1].courtSides[courtSide] = {};

				setCourts(newCourts);
			} else {
				const [movedPlayer] = newLineup.splice(sourceIndex, 1);

				newLineup.splice(destinationIndex, 0, movedPlayer);
			}

			return setHall(newLineup);
		}
	};

	const saveProgress = () => {
		const newLineup = {
			courts,
		};
		addLineup(newLineup);
		getLineups();
	};

	return (
		<>
			<Head>
				<title>Lineup</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<>
				{isLoading ? (
					<p>Loading...</p>
				) : error ? (
					<p>There has been a server issue.</p>
				) : (
					<div>
						<section className={styles.introSection}>
							<div>
								<p>
									<strong>Location</strong>
								</p>
								<p>Rose Mofford Complex</p>
							</div>
							<div>
								<p>
									<strong>Time</strong>
								</p>
								<p>6:00pm</p>
							</div>
						</section>
						<div className={styles.draggables}>
							<DragDropContext
								onDragStart={onDragStartHandler}
								onDragEnd={onDragEndHandler}
								onBeforeCapture={onBeforeCaptureHandler}
							>
								<Droppable droppableId='HALL' type='group' index={1}>
									{(provided) => (
										<section
											{...provided.droppableProps}
											ref={provided.innerRef}
											className={styles.hall}
										>
											{hall.map((player, i) => (
												<div key={player._id}>
													<Draggable draggableId={player._id.toString()} index={i}>
														{(provided, snapshot) => (
															<div
																className={styles.player}
																{...provided.dragHandleProps}
																{...provided.draggableProps}
																ref={provided.innerRef}
																dragging={JSON.stringify(snapshot.isDragging)}
															>
																{playerProfile}
																<h3>
																	{player.first_name} {player.last_name[0]}.
																</h3>
															</div>
														)}
													</Draggable>
												</div>
											))}
											{provided.placeholder}
										</section>
									)}
								</Droppable>
								<div className={styles.courts}>
									{courts.map((court, i) => (
										<div key={court.number + '-A'} courtid={court.number}>
											{['a', 'b', 'c', 'd'].map((courtSide, index) => (
												<Droppable
													key={court.number + '-' + courtSide}
													droppableId={court.number + '-' + courtSide}
													type='group'
													index={index}
													style='background-color: green'
												>
													{(provided) => (
														<div
															className={isDragging ? styles.isAvailable : ''}
															ref={provided.innerRef}
															{...provided.droppableProps}
															busy={
																court.courtSides[courtSide] &&
																(!_.isEmpty(court.courtSides[courtSide])).toString()
															}
														>
															<Draggable
																draggableId={court.number + '-' + courtSide}
																key={court.number + '-' + courtSide}
																index={index + i}
															>
																{(provided) => (
																	<div
																		{...provided.dragHandleProps}
																		{...provided.draggableProps}
																		ref={provided.innerRef}
																		className={styles.player}
																	>
																		{court.courtSides[courtSide]?._id ? (
																			<>
																				{playerProfile}
																				<h3>
																					{court.courtSides[courtSide].first_name}{' '}
																					{
																						court.courtSides[courtSide]
																							.last_name[0]
																					}
																					.
																				</h3>
																			</>
																		) : null}
																	</div>
																)}
															</Draggable>
															{provided.placeholder}
														</div>
													)}
												</Droppable>
											))}
										</div>
									))}
								</div>
							</DragDropContext>
						</div>
						<button onClick={saveProgress} className={styles.saveProgress}>
							Save
						</button>
					</div>
				)}
			</>
		</>
	);
}
