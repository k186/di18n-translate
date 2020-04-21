import { getValueByPath } from './util'

export default class T {
    constructor ( options ) {
        this.locale = options.locale || 'zh'
        this.messages = options.messages || {}
    }

    $d ( key, ...args ) {
        let str = String( getValueByPath( this.messages[ this.locale ], key ) )

        if (args.length === 1 && typeof args[ 0 ] === 'object') {
            args = args[ 0 ]
        } else {
            args = {}
        }

        if (!args || !args.hasOwnProperty) {
            args = {}
        }

        let RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g

        return str.replace( RE_NARGS, ( match, prefix, i, index ) => {
            let result = ''
            if (str[ index - 1 ] === '{' &&
                str[ index + match.length ] === '}') {
                return i
            } else {
                result = args.hasOwnProperty( i ) ? args[ i ] : match
                if (!result) {
                    return ''
                }

                return result
            }
        } )
    }

    $html ( content ) {
        //这里 cabinX不处理 html 全部都走js数据
        console.warn( 'cabinX不支持html翻译,请勿使用此方法' )
        content = String( content )
        let RE_NARGS = /\$\{locale\}|\$t\(['"]([\s\S]+?)['"]\)/g
        return content.replace( RE_NARGS, ( match, prefix, i, index ) => {
            if (match === '${locale}') {
                return this.locale
            } else {
                return getValueByPath( this.messages[ this.locale ], prefix ) || prefix
            }
        } )
    }
}