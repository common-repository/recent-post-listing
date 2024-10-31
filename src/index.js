const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, useBlockProps } = wp.editor;
const { ServerSideRender } = wp.editor;
const { ToggleControl, PanelBody, PanelRow, CheckboxControl, SelectControl, ColorPicker } = wp.components;
const { useSelect } = wp.data;

registerBlockType('recent-post-block-gutenberg/recent-post-block', {
	title: 'SS Recent Post',		// Block name visible to user
	icon: 'lightbulb',	// Toolbar icon can be either using WP Dashicons or custom SVG
	category: 'common',	// Under which category the block would appear
	attributes: {			// The data this block will be storing
		postcount: { type: 'number', default: 4 },	// Post Count
		rangeslider: { type: 'range', default: 4 },	// Post Count
		title: { type: 'string' },			// Section Title
		'preview' : true,
	},
	description: 'Show Recent Posts',
	keywords: ['recent post', 'post' , 'selected post'],
	edit: (props) => {
		const { attributes } = props;

		function updateTitle( event ) {
			props.setAttributes( { title: event.target.value } );
		 }

		 function updatePostCount( event ) {
			props.setAttributes( { postcount: event.target.value } );
		 }
		// Make the data request.
		const postData = useSelect((select) => {
			//return select('core').getEntityRecords('postType', 'post', { per_page: attributes.postcount , _embed: true,});
			return{
				posts : select('core').getEntityRecords('postType', 'post', { per_page: attributes.postcount , _embed: 'wp:featuredmedia'}),
				authors : select( 'core' ).getUsers({ who: 'authors' })

			}
		});
		return (<div>
				<InspectorControls>
					<PanelBody title={'Post Display Setting'}>
						<p><strong>Enter PostCount</strong></p>
						<div><input type="number" name="postcount" value={attributes.postcount} onChange={updatePostCount} /></div>
						<div><input type="range" name="rangslider" placeholder="Enter Post Count..." value={attributes.postcount} onChange={updatePostCount} /></div>
						<div><input type="text" name="title" placeholder="Enter title here..." value={attributes.title} onChange={updateTitle} /></div>
					</PanelBody>
				</InspectorControls>
				<div>
					<div class="ss-post-container">
						<h2>{attributes.title}</h2>
								<ul>
									{
										postData.posts &&
										postData.posts.map(( post, i) => {
											{ postImg = (post._embedded ? post._embedded['wp:featuredmedia'][0]['source_url']  : '../wp-content/plugins/recent-post-block-master/images/No-image-available.png') }
						
											const currentAuthor = postData.authors?.find(
												( author ) => author.id === post.author
											);
											{console.log(currentAuthor)}

										return <li class="post-box">
											<p><img src={postImg}></img></p>
											<p><a href={post.link} target="_blank">{post.title.raw}</a></p>
											<p>By - {currentAuthor.first_name}{currentAuthor.last_name} ({currentAuthor.name})</p>
											</li>;
										})
									}

								</ul>
					</div>
				</div>
				</div>
		)

	},
	save: (props) => {
		return <div></div>;
	}
});