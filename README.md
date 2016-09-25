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

## Output Formats
Below are example outputs for the designated event type:

- `[database event]`
	- `query` - 160925/065549.166, [knex:query] select [ sql: select * from `log` ]
	- `end`	-	160925/071149.107, [knex:end] info: Query executed successfully
	- `queryerror` - 160925/072007.936, [knex:queryerror] error: [ select * from `logg` - ER_NO_SUCH_TABLE: Table 'sample.logg' doesn't exist ]
	- `error`	- 160925/074231.942, [knex:error] error: [ select * from `logg` - ER_NO_SUCH_TABLE: Table 'sample.logg' doesn't exist ]



- `[httpclient]`
	- `request` - 160925/060859.691, [wreck:request] get https://github.com/hawdi/proteusjs
	- `response` - 160925/062323.377, [wreck:response] get https://github.com/hawdi/proteusjs (200|OK)
