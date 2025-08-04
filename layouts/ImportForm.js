// Define your UI plan here
export const plan = {
	tag: 'mega-demo',
	atoms: [
		{ type: 'ColourAtom', config: { role: 'background', value: '#202939' } },
		{
			type: 'LayoutAtom',
			config: {
				display: 'flex',
				width: '100%',
				height: '100%',
				justify: 'center',
				align: 'center',
			},
		},
	],
	children: [
		{
			tag: 'frame-1',
			atoms: [
				{
					type: 'ColourAtom',
					config: { role: 'background', value: '#ffffff' },
				},
				{
					type: 'LayoutAtom',
					config: {
						display: 'flex',
						justify: 'center',
						align: 'center',
						height: '70%',
						width: '30%',
						gap: '6px',
						'border-radius': '13px',
					},
				},
			],
			children: [
				{
					tag: 'template-container',
					atoms: [
						{
							type: 'LayoutAtom',
							config: {
								display: 'flex',
								flexDirection: 'column',
								align: 'center',
								justify: 'center',
								height: '95%',
								width: '95%',
								gap: '6%',
								margin: '0.8rem 0rem 0rem 0rem',
							},
						},
					],
					children: [
						{
							tag: 'import-figma',
							atoms: [
								{
									type: 'LayoutAtom',
									config: {
										display: 'flex',
										align: 'center',
										justify: 'center',
										flexDirection: 'column',
										borderRadius: '13px',
										gap: '20%',
										width: '95%',
										height: '12%',
										// padding: '4px',
									},
								},
							],
							children: [
								{
									tag: 'import-text',
									atoms: [
										{
											type: 'ContentAtom',
											config: { text: 'Import from Figma' },
										},
										{
											type: 'ColourAtom',
											config: { role: 'text', value: '#000000' },
										},
										{
											type: 'LayoutAtom',
											config: {
												gap: '12%',
												'font-weight': 'bold',
											},
										},
									],
								},
								{
									tag: 'import-2',
									atoms: [
										{
											type: 'ContentAtom',
											config: {
												text: 'Import color, text styles and components directly from your Figma file to map them into your CX Design System settings effortlessly.',
											},
										},
										{
											type: 'ColourAtom',
											config: { role: 'text', value: '#697586' },
										},
										{
											type: 'LayoutAtom',
											config: {
												'font-size': '12px',
											},
										},
									],
								},
								{},
							],
						},
						{
							tag: 'container-child-2',
							atoms: [
								{
									type: 'LayoutAtom',
									config: {
										width: '90%',
										height: '70%',
										gap: '8%',
										display: 'flex',
										flexDirection: 'column',
										// align:'center'
									},
								},
							],
							children: [
								{
									tag: 'image-div',
									atoms: [
										{
											type: 'LayoutAtom',
											config: {
												display: 'flex',
												justify: 'center',
												align: 'center',
												height: '30%',
												// width:"80%",
												gap: '0.436%',
											},
										},
									],
									children: [
										{
											tag: 'image-1',

											atoms: [
												{
													type: 'LayoutAtom',
													config: {
														height: '100%',
														display: 'flex',
														align: 'center',
														justify: 'center',
														width: '35%',
														// border: '1px solid #000000',
														// "border-radius": "24px",
														'box-shadow': '1px 1px 3px rgba(0, 0, 0, 0)',
													},
												},
											],
											children: [
												{
													tag: 'figma-img-1',
													atoms: [
														{
															type: 'ImageAtom',
															config: {
																src: 'https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/12ed9a56-7fca-457e-b7d7-07e647651a3e_$$_V1_Frame%202147225231figma-img.svg',
																'background-size': 'cover',
															},
														},
														{
															type: 'LayoutAtom',
															config: {
																height: '100%',
																width: '100%',
																'border-radius': '24px',
																'background-size': 'cover',
																'background-repeat': 'no-repeat',
																'background-position': 'center',
																overflow: 'hidden',
															},
														},
													],
												},
											],
										},
										{
											tag: 'image-2',
											atoms: [
												{
													type: 'LayoutAtom',
													config: {
														width: '30%',
														height: '30%',
														display: 'flex',
														align: 'center',
														justify: 'center',
														gap: '3px',

														// border: '1px dashed #697586',
													},
												},
											],
											children: [
												{
													tag: 'circle-1',
													atoms: [
														{
															type: 'ColourAtom',
															config: { role: 'background', value: '#697586' },
														},
														{
															type: 'LayoutAtom',
															config: {
																width: '5%',
																height: '7%',
																border: '1px  solid #697586',
																'border-radius': '50%',
															},
														},
													],
												},
												{
													tag: 'dotted-line',
													atoms: [
														{
															type: 'LayoutAtom',
															config: {
																width: '70%',
																border: '1px  dotted #697586',
															},
														},
													],
												},
												{
													tag: 'circle-2',
													atoms: [
														{
															type: 'ColourAtom',
															config: { role: 'background', value: '#697586' },
														},
														{
															type: 'LayoutAtom',
															config: {
																width: '5%',
																height: '7%',
																border: '1px  solid #697586',
																'border-radius': '50%',
															},
														},
													],
												},
											],
										},
										{
											tag: 'image-3',

											atoms: [
												{
													type: 'LayoutAtom',
													config: {
														height: '100%',
														display: 'flex',
														align: 'center',
														// justify:"center",
														width: '35%',
														'justify-content': 'center',
														'border-radius': '24px',
														'box-shadow': '1px 1px 3px rgba(0, 0, 0, 0.2)',
													},
												},
											],
											children: [
												{
													tag: 'figma-img-2',
													atoms: [
														{
															type: 'ImageAtom',
															config: {
																src: 'https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/2b3cb703-3919-4a4f-993c-af41a2cde82f_$$_V1_figma2.png',
															},
														},
														{
															type: 'LayoutAtom',
															config: {
																height: '100%',
																width: '90%',
																'background-size': 'contain',
																'background-repeat': 'no-repeat',
																'background-position': 'center',
																overflow: 'hidden',
															},
														},
													],
												},
											],
										},
									],
								},
								{
									tag: 'importfile-div',
									atoms: [
										{
											type: 'LayoutAtom',
											config: {
												display: 'flex',
												gap: '10%',
												height: '60%',
												flexDirection: 'column',
											},
										},
									],
									children: [
										{
											tag: 'node-container',
											atoms: [
												{
													type: 'LayoutAtom',
													config: {
														display: 'flex',
														flexDirection: 'column',
														gap: '5px',
													},
												},
											],
											children: [
												{
													tag: 'node-id',
													atoms: [
														{
															type: 'LayoutAtom',
															config: {
																'font-size': '14px',
																'font-weight': 'bold',
															},
														},
														{
															type: 'ContentAtom',
															config: { text: 'Figma File URL/Node ID' },
														},
														{
															type: 'ColourAtom',
															config: { role: 'text', value: '#000000' },
														},
													],
												},
												{
													tag: 'input-label-1',
													atoms: [
														{
															type: 'attributeAtom',
															config: {
																attribute: 'contenteditable',
																value: 'true',
															},
														},
														{
															type: 'LayoutAtom',
															config: {
																display: 'flex',
																width: 'full',
																height: '21px',
																border: '1px solid #9AA4B2',
																'border-radius': '5px',
																// "padding": "4px",
																outline: '1px solid blue',
															},
														},
														{
															type: 'ColourAtom',
															config: { role: 'background', value: 'white' },
														},
														{
															type: 'BorderAtom',
															config: { role: 'border', value: 'rounded' },
														},
													],
													children: [],
												},

												{
													tag: 'figma-text-2',
													atoms: [
														{
															type: 'LayoutAtom',
															config: {
																'font-size': '12px',
															},
														},
														{
															type: 'ContentAtom',
															config: {
																text: "Paste the Figma file link you want to import styles and components from. Make sure it's accessible via your token.",
															},
														},
														{
															type: 'ColourAtom',
															config: { role: 'text', value: '#697586' },
														},
													],
												},
											],
										},
										{
											tag: 'personal-data',
											atoms: [
												{
													type: 'LayoutAtom',
													config: {
														display: 'flex',
														flexDirection: 'column',
														gap: '6px',
													},
												},
											],
											children: [
												{
													tag: 'personla-text',
													atoms: [
														{
															type: 'LayoutAtom',
															config: {
																'font-size': '14px',
																'font-weight': 'bold',
															},
														},
														{
															type: 'ContentAtom',
															config: { text: 'Personal Access Token' },
														},
														{
															type: 'ColourAtom',
															config: { role: 'text', value: '#000000' },
														},
													],
												},
												{
													tag: 'input-label-2',
													atoms: [
														{
															type: 'attributeAtom',
															config: {
																attribute: 'contenteditable',
																value: 'true',
															},
														},
														{
															type: 'LayoutAtom',
															config: {
																display: 'flex',
																width: 'full',
																height: '21px',
																border: '1px solid #9AA4B2',
																'border-radius': '5px',
																// "padding": "4px",
																outline: '1px solid blue',
															},
														},
														{
															type: 'ColourAtom',
															config: { role: 'background', value: 'white' },
														},
														{
															type: 'BorderAtom',
															config: { role: 'border', value: 'rounded' },
														},
													],
													children: [],
												},
												{
													tag: 'personla-text-2',
													atoms: [
														{
															type: 'LayoutAtom',
															config: {
																'font-size': '12px',
															},
														},
														{
															type: 'ContentAtom',
															config: {
																text: 'Enter your Figma personal access token. This is required to fetch styles from your file. How to get it?',
															},
														},
														{
															type: 'ColourAtom',
															config: { role: 'text', value: '#697586' },
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							tag: 'template-container',
							atoms: [
								{
									type: 'ContentAtom',
									config: {
										text: 'You’re agreeing to share personal information with this app. View the developer’s privacy policy before you share anything with this app.',
									},
								},
								{
									type: 'ColourAtom',
									config: { role: 'text', value: '#697586' },
								},
								{
									type: 'LayoutAtom',
									config: {
										height: '10%',
										width: '95%',
										'font-size': '12px',
									},
								},
							],
							children: [],
						},
					],
				},
			],
		},
	],
};
