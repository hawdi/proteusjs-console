# proteusjs-console

`proteusjs-console` is a transform stream useful for turning [proteusjs](https://github.com/hawdi/proteusjs) `server`, `database` and `http call` events into formatted strings.

Lead Maintainer: [Jai Kishan](https://github.com/geekjai)

## Usage

## `new ProteusjsConsole([config])`
Creates a new ProteusjsConsole object with the following arguments:

- `[config]` - optional configuration object with the following keys
	- `format` - [MomentJS](http://momentjs.com/docs/#/displaying/format/) format string. Defaults to 'YYMMDD/HHmmss.SSS'.
	- `utc` - boolean controlling Moment using [utc mode](http://momentjs.com/docs/#/parsing/utc/) or not. Defaults to `true`.
	- `color` - a boolean specifying whether to output in color. Defaults to `true`.
