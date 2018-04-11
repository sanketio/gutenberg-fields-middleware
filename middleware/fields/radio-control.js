/**
 * Radio Control field.
 */

const { RadioControl } = wp.components;

export default function radioControl( props, config, attributeKey ) {
	const defaultValue = config.default || '';
	const defaultAttributes = {
		selected: props.attributes[ attributeKey ] || defaultValue,
	};

	const fieldAttributes = _.extend( defaultAttributes, config );

	fieldAttributes.onChange = ( value ) => {
		if ( config.onChange ) {
			config.onChange( value, props );
		} else {
			const newAttributes = {};
			newAttributes[ attributeKey ] = value;
			props.setAttributes( newAttributes );
		}
	};

	delete fieldAttributes.type;

	return (
		<RadioControl
			{ ...fieldAttributes }
		/>
	);
}
