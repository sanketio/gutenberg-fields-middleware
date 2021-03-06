# Gutenberg Fields Middleware

Register fields for Gutenberg blocks with a simple, declarative API.

This project is in its early stages. Please [open an issue](https://github.com/rtCamp/gutenberg-fields-middleware/issues) with questions, feedback, suggestions, and bug reports.

Haven't written a Gutenberg block yet? During the month of April, rtCamp is offering [complimentary technical introductions to Gutenberg](https://gutenberg.rtcamp.com/) as a public service campaign for the community.

[Using](#using) | [Available Fields](#available-fields)

## Using

1. First, install the Gutenberg Fields Middleware as a standalone WordPress plugin. This will register a `gutenberg-fields-middleware` handle you can add as a dependency for your block script:

```php
wp_enqueue_script( 'script-handle', plugins_url( 'blocks.js', __FILE__ ), array( 'gutenberg-fields-middleware' ) );
```

2. Fields are now registered as attribute configuration details. Here's how you might register `url`, `text` and `range` fields:

```js
registerBlockType( 'example-namespace/example-block', {
	title: 'Example Block',
	attributes: {
		url: {
			type: 'string',
			field: {
				type: 'link',
			},
		},
		text: {
			type: 'string',
			field: {
				type: 'text',
				placeholder: 'Enter link text',
			},
		},
		range: {
			type: 'string',
			field: {
				type: 'range',
				label: 'Columns',
				placement: 'inspector', // To show in sidebar.
			},
		},
	},

	edit: function( props ) {
		return [
			props.middleware.inspectorControls, // Contains ALL inspector controls.
			props.middleware.fields.url,
			props.middleware.fields.text,
		];
	},
	
	save: function( props ) {}
});
```



✔️ Gutenberg Fields Middleware also works for PHP block registration:

```php
register_block_type( 'example-namespace/example-block', array(
	'attributes' => array(
		'image' => array(
			'type' => 'object',
			'field' => array(
				'type' => 'image',
				'buttonText' => 'Upload',
				'imagePlaceholder' => true,
				'removeButtonText' => 'Remove',
			),
		),
		'color' => array(
			'type' => 'string',
			'field' => array(
				'type' => 'color'
			)
		)
	),
	'render_callback' => 'example_callback',
) );
```

✔️ Alternatively the middleware can also be used just by enqueuing `buid/middleware.min.js` file as dependency. Be sure to use `array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-date' )` as dependency. 



## Available Fields

Gutenberg Fields Middleware supports the following field types and type configuration.

### text

Render an auto-growing textarea allow users to fill any textual content.

#### value:

The current value of text field.

- Type: `string`
- Required: No

#### onChange:

A function that receives the new value of the text field each time it changes. It passes the new `value` as first argument and `props` as second argument.

- Type: `Function`
- Required: No

You can also pass any extra prop to the textarea rendered by this field. 

For more read gutenberg [readme.](https://github.com/WordPress/gutenberg/tree/master/blocks/plain-text)

**Example:**

```js
text: {
	type: 'string',
	field: {
		type: 'text',
		placeholder: __( 'Enter text' ),
	},
}
```

### rich-text

#### placeholder:

- Type: `String`
- Required: No

#### value:

The current value of rich text field.

- Type: `array`
- Required: No

#### onChange:

A function that receives the new value of the rich text field each time it changes. It passes the new `value` as first argument and `props` as second argument.

- Type: `Function`
- Required: No

For full documentation read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/blocks/rich-text).

**Example:**

```js
text: {
	type: 'string',
	field: {
		type: 'rich-text',
		placeholder: __( 'Enter text' ),
	},
}
```

### button

#### buttonText:

Fallback button text.
* Type: `string`
* Required: No
* Default: null

#### isPrimary:

Button class. Other button classes are `isPrimary`, `isSmall`, `isToggled`, `isBusy`.

* Type: `bool`
* Required: No
* Default: null

#### disabled:

- Type: `bool`
- Required: No
- Default: null

#### href:

If set, `button` will be replaced with `a`
* Type: `bool`
* Required: No
* Default: null

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/button).

**Example:**

```js
button: {
	type: 'string',
	field: {
		type: 'button',
	},
}
```



### button-editable

#### onChange:

A function that receives the new value when button text changes. It passes the new `value` as first argument and `props` as second argument.

- Type: `function`
- Required: No

#### style:

The style applies to the button.

- Type: `object`
- Required: No



**Example:**

```js
buttonEditable: {
	type: 'object',
	field: {
		type: 'button-editable',
		style: {
			backgroundColor: 'red',
		},
	},
},
```



### radio

#### label:

If set, a label will be generated using label property as the content.
* Type: `String`
* Required: No

#### help:

If set, a help text will be generated using help property as the content.
* Type: `String`
* Required: No


#### selected:

The value property of the currently selected option.
* Type: `Object`
* Required: No

#### options:

An array of objects containing the following properties:
* label: (string) The label to be shown to the user.
* value: (Object) The internal value compared against select and passed to onChange.


* Type: `Array`
* Required: No

#### onChange:

A function that receives the value of the new option that is being selected as input. It passes the new `value` as first argument and `props` as second argument.
* Type: `function`
* Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/radio-control).

**Example:**

```js
radio: {
	type: 'string',
	field: {
		type: 'radio',
		label: 'User type',
		help: 'The type of the current user',
		options: [
			{
				value: 'one',
				label: 'one',
			},
			{
				value: 'two',
				label: 'two',
			},
		],
	},
}
```



### checkbox

#### heading:

A heading for the input field, that appears above the checkbox. If the prop is not passed no heading will be rendered.
* Type: `String`
* Required: No

#### label:

A label for the input field, that appears at the side of the checkbox. The prop will be rendered as content a label element. If no prop is passed an empty label is rendered.
* Type: `String`
* Required: No


#### help:

If this property is added, a help text will be generated using help property as the content.
* Type: `String`
* Required: No

#### checked:

If checked is true the checkbox will be checked. If checked is false the checkbox will be unchecked. If no value is passed the checkbox will be unchecked.
* Type: `Boolean`
* Required: No

#### onChange:

A function that receives the checked state (boolean) as input. It passes the new `checked` value as first argument and `props` as second argument.
* Type: `function`
* Required: Yes

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/checkbox-control).

**Example:**

```js
check: {
	type: 'boolean',
	field: {
		default: false,
		type: 'checkbox',
		heading: 'User',
		label: 'Is author',
		help: 'Is the user a author or not?',
	}
}
```

### range

#### label:

If set, a label will be generated using label property value as the content.
* Type: `String`
* Required: No

#### help:

If set, a help text will be generated using help property value as the content.
* Type: `String`
* Required: No

#### beforeIcon:

If set, a dashIcon component will be rendered before the slider with the icon equal to beforeIcon.
* Type: `String`
* Required: No

#### afterIcon:

If set, a dashIcon component will be rendered after the slider with the icon equal to afterIcon.
* Type: `String`
* Required: No

#### allowReset:

If set to `true`, a button to reset the the slider is rendered.
* Type: `Boolean`
* Required: No

#### value:

The current value of the range slider.
* Type: `Number`
* Required: Yes

#### onChange:

A function that receives the new value. If allowReset is true, when onChange is called without any parameter passed it should reset the value. It passes the new `value` as first argument and `props` as second argument.
* Type: `function`
* Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/range-control).

**Example:**

```js
range: {
	type: 'string',
	field: {
		type: 'range',
		label: 'Columns',
		value: columns,
		onChange: onChange,
		min: 2,
		max: 10
	},
}
```



### link

#### value:

Value of url field.

- Type: `String`
- Required: No

#### onChange:

A function that receives the value of the new option that is being selected as input. It passes the new `value` as first argument and `props` as second argument.

- Type: `function`
- Required: No

#### label:

Label for input but applicable only when using it in inspector controls.

- Type: `String`
- Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/blocks/url-input).

**Example:**

```js
url: {
	type: 'string',
	field: {
		type: 'link',
	},
}
```



### select

#### label:

If set, a label will be generated using label property value as the content.
* Type: `String`
* Required: No

#### help:

If set, a help text will be generated using help property value as the content.
* Type: `String`
* Required: No

#### multiple:

If set, multiple values can be selected.
* Type: `Boolean`
* Required: No

#### options:

An array of objects containing the following properties:
* `label:` (string) The label to be shown to the user.
* `value:` (Object) The internal value used to choose the selected value. This is also the value passed to onChange when the option is selected.


* Type: `Array`
* Required: No

#### onChange:

A function that receives the value of the new option that is being selected as input . If multiple is true the value received is an array of the selected value. If multiple is false the value received is a single value with the new selected value. It passes the new `value` as first argument and `props` as second argument.
* Type: `Function`
* Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/select-control).

**Example:**

```js
selectOption: {
	type: 'string',
	field: {
		type: 'select',
		label: 'Select Numbers',
		options: [
			{
				value: 'one',
				label: 'one',
			},
			{
				value: 'two',
				label: 'two',
			},
		],
	},
}
```



### image

#### buttonText:

Upload button text.  Only applicable when `imagePlaceholder` is not set to true.

- Type: `string`
- Required: No
- Default: null

#### imagePlaceholder:

Show image placeholder.

- Type: `bool`
- Required: No
- Default: false

#### removeButtonText:

Remove media button text. Remove button is visible only when `removeButtonText` is set.

- Type: `string`
- Required: No
- Default: null

#### multiple:

Whether to allow multiple selections or not.

- Type: `Boolean`
- Required: No
- Default: false

#### value:

Media ID (or media IDs if multiple is true) to be selected by default when opening the media library.

- Type: `Number|Array`
- Required: No

#### onSelect:

Callback when the media modal is closed, the selected `media` are passed as the first argument and `props` as second argument.

- Type: `Function`
- Required: No

#### render:

A callback invoked to render the Button opening the media library.

- Type: `Function`
- Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/blocks/media-upload).

**Example:**

```js
image: {
	type: 'object',
	field: {
		type: 'image',
		buttonText: __( 'Upload' ),
		imagePlaceholder: true,
		removeButtonText: __( 'Remove' ),
	},
}
```

### video / audio

#### buttonText:

Upload button text.

- Type: `string`
- Required: No
- Default: null

#### placeholderText:

Video placeholder text.

- Type: `string`
- Required: No
- Default: null

**Example:**

```js
video: {
	type: 'object',
	field: {
		type: 'video',
		buttonText: __( 'Upload' ),
		placeholderText: __( 'Select a video file from your library, or upload a new one' ),
	},
}
```



### code-editor

#### value:

The source code to load into the code editor.

- Type: `string`
- Required: No

#### focus:

Whether or not the code editor should be focused.

- Type: `bool`
- Required: No
- Default: false

#### onFocus:

The function called when the editor is focused.

- Type: Function
- Required: No

#### onChange:

The function called when the user has modified the source code via the editor. It passes the new `value ` as an argument and `props` as second param.

- Type: `Function`
- Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/code-editor).

**Example:**

```js
editorContent: {
	type: 'string',
	field: {
		type: 'editor',
	},
}
```



### date-time

#### label:

Field Label

- Type: `string`
- Required: No
- Default: 'Date'

#### currentDate:

The current date and time at initialization.

- Type: `string`
- Required: No

#### onChange:

The function called when a new date or time has been selected.It passes the `currentDate` as the first argument and `props` as second argument.

- Type: `Function`
- Required: No

#### locale:

The localization for the display of the date and time.

- Type:`string`
- Required: No

#### is12Hour:

Whether the current timezone is a 12 hour time.

- Type: `bool`
- Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/date-time).

**Example:**

```js
dateTime: {
	type: 'string',
	field: {
		type: 'date-time',
		placement: 'inspector',
	},
}
```



### color

#### label:

The title of color control

- Type: `string`
- Required: No
- Default: 'Color'

#### value:

The value of color.

- Type: `string`
- Required: No

#### onChange:

The function called when a new color has been selected. It passes the new `value` as first argument and `props` as second argument.

- Type: `Function`
- Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/blocks/color-palette ).

**Example:**

```js
color: {
	type: 'string',
	field: {
		type: 'color',
		placement: 'inspector',
	},
}
```



### switch

#### label:

Field Label

- Type: `string`
- Required: No

#### checked:

Checked attribute of checkbox. Changes the accessibility text to "On/Off".

- Type: `bool`
- Required: No

#### onChange:

The function called when switch toggles. It passes the new `value` as first argument and `props` as second argument.

- Type: `Function`
- Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/form-toggle ).

**Example:**

```js
switch: {
	type: 'string',
	field: {
		type: 'switch',
		label: __( 'Form Toggle' ),
		placement: 'inspector',
	},
}
```



### textarea

#### value:

The current value of the textarea.

- Type: `string`
- Required: No

#### onChange:

A function that receives the new value of the textarea each time it changes. It passes the new `value` as first argument and `props` as second argument.

- Type: `Function`
- Required: No

#### label:

If this property is added, a label will be generated using label property as the content.

- Type: `String`
- Required: No

#### help:

If set, a help text will be generated using help property as the content.

- Type: `String`
- Required: No

#### row:

The number of rows the textarea should contain. Defaults to four.

- Type: `String`
- Required: No
- Default: 4

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/textarea-control).

**Example:**

```js
textarea: {
	type: 'string',
	field: {
		type: 'textarea',
		label: __( 'Textarea' ),
		placement: 'inspector',
	},
},
```



### email / number/ hidden / search / tel

Creates input fields with above types. You can pass key value pairs will be passed to the input. 

#### onChange:

A function that receives the new value of the input field each time it changes. It passes the new `value` as first argument and `props` as second argument.

- Type: `Function`
- Required: No

#### label:

If this property is added, a label will be generated using label property value as the content.

- Type: `String`
- Required: No

#### help:

If set, a help text will be generated using help property as the content.

- Type: `String`
- Required: No

#### className:

CSS class name for the input field.

- Type: `String`
- Required: No

**Examples:**

```js
email: {
	type: 'string',
	field: {
		type: 'email',
		label: __( 'Email' ),
		placement: 'inspector',
	},
},
hidden: {
	type: 'string',
	field: {
		type: 'hidden',
		placement: 'inspector',
	},
},
number: {
	type: 'string',
	field: {
		type: 'number',
		label: __( 'Number' ),
		placement: 'inspector',
	},
},
search: {
	type: 'string',
	field: {
		type: 'search',
		label: __( 'Search' ),
		placement: 'inspector',
	},
},
tel: {
	type: 'string',
	field: {
		type: 'tel',
		label: __( 'Telephone' ),
		placement: 'inspector',
	},
},
```


### dropdown

#### className:

className of the global container

- Type: `String`
- Required: No

#### contentClassName:

If you want to target the dropdown menu for styling purposes, you need to provide a contentClassName because it's not being rendered as a children of the container node.

- Type: `String`
- Required: No

#### position:

The direction in which the popover should open relative to its parent node. Specify y- and x-axis as a space-separated string. Supports `"top"`, `"bottom"` y axis, and `"left"`, `"center"`, `"right"` x axis.

- Type: `String`
- Required: No
- Default: `"top center"`

#### renderToggle:

A callback invoked to render the dropdown Toggle Button.

- Type: `Function`
- Required: No

The first argument of the callback is an object containing the following properties:

- `isOpen`: whether the dropdown menu is opened or not
- `onToggle`: A function switching the dropdown menu's state from open to closed and vice versa
- `onClose`: A function that closes the menu if invoked

#### renderContent:

A callback invoked to render the content of the dropdown menu. Its first argument is the same as the `renderToggle` prop.

- Type: `Function`
- Required: No

#### expandOnMobile:

Opt-in prop to show popovers fullscreen on mobile, pass `false` in this prop to avoid this behavior.

- Type: `Boolean`
- Required: No
- Default: `false`

#### headerTitle:

Set this to customize the text that is shown in the dropdown's header when it is fullscreen on mobile.

- Type: `String`
- Required: No

For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/dropdown).

**Example:**

```js
dropdown: {
	type: 'string',
	field: {
		type: 'dropdown',
		position: 'top left',
	},
}
```


### tree-select

#### label:

If this property is added, a label will be generated using label property as the content.

- Type: `String`
- Required: No

#### noOptionLabel:

If this property is added, an option will be added with this label to represent empty selection.

- Type: `String`
- Required: No

#### onChange:

A function that receives the id of the new node element that is being selected. It passes the new `value` as first argument and `props` as second argument.

- Type: `function`
- Required: No

#### selectedId:

The id of the currently selected node.

- Type: `Object`
- Required: No

#### tree:

An array containing the tree objects with the possible nodes the user can select.

- Type: `String`
- Required: No


For more read gutenberg [readme](https://github.com/WordPress/gutenberg/tree/master/components/tree-select).

**Example:**

```js
treeSelect: {
	type: 'string',
	field: {
		type: 'tree-select',
		label: 'Parent page',
		placement: 'inspector',
		tree: [
			{
				name: 'Page 1',
				id: 'p1',
				children: [
					{ name: 'Descend 1 of page 1', id: 'p11' },
					{ name: 'Descend 2 of page 1', id: 'p12' },
				],
			},
			{
				name: 'Page 2',
				id: 'p2',
				children: [
					{
						name: 'Descend 1 of page 2',
						id: 'p21',
						children: [
							{
								name: 'Descend 1 of Descend 1 of page 2',
								id: 'p211',
							},
						],
					},
				],
			},
		],
	},
}
```


### file-upload

#### accept:

File types to accept with uploader.

- Type: `String`
- Required: No

#### fileType:

Selected file type to be upload on library.

- Type: `String`
- Required: No

#### onChange:

A function that receives the event object which has selected files..

- Type: `function`
- Required: No

#### isLarge:

Adds class `button-large` if set true.

- Type: `boolean`
- Required: No

#### buttonText:

Text of file-upload button.

- Type: `String`
- Required: No

**Example:**

```js
fileUpload: {
    type: 'object',
    field: {
        type: 'file-upload',
        placement: 'inspector',
    },
}
```


:heavy_check_mark: The following input type field are also supported `'email', 'hidden', 'number', 'search', 'tel', 'time', 'date', 'datetime-local', 'file', 'month', 'password', 'time', 'url', 'week'`



## Updating Field props

To update or add properties to a field from `edit` method use `props.middleware.fields.attributeKey.props`.

Example:

```js
registerBlockType( 'gb-m-example/simple-block', {
	title: 'Simple Block',

	attributes: {
		button: {
            type: 'string',
            field: {
                type: 'button',
            },
        },
        color: {
            type: 'string',
            field: {
                type: 'color',
                placement: 'inspector',
            },
        },
	},

	edit( props ) {
		props.middleware.fields.button.props.style = {
			backgroundColor: props.attributes.color,
		};
		
		return [
		    props.middleware.inspectorControls,
		    props.middleware.fields.button
		];
    }
}
```

![color-change](https://user-images.githubusercontent.com/6297436/38424317-46694046-39ce-11e8-8713-398c16a1b30c.gif)

