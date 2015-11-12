// Type definitions for ByteBuffer.js 5.0.0
// Project: https://github.com/dcodeIO/bytebuffer.js

/// <reference path="../long/long.d.ts" />

declare class ByteBuffer
{
    /**
     * Constructs a new ByteBuffer.
     */
    constructor( capacity?: number, littleEndian?: boolean, noAssert?: boolean );

    /**
     * Big endian constant that can be used instead of its boolean value. Evaluates to false.
     */
    static BIG_ENDIAN: boolean;

    /**
     * Default initial capacity of 16.
     */
    static DEFAULT_CAPACITY: number;

    /**
     * Default no assertions flag of false.
     */
    static DEFAULT_NOASSERT

    /**
     * Little endian constant that can be used instead of its boolean value. Evaluates to true.
     */
    static LITTLE_ENDIAN: boolean;
    /**
     * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
     */
    static MAX_VARINT32_BYTES: number;
    /**
     * Maximum number of bytes required to store a 64bit base 128 variable-length integer.
     */
    static MAX_VARINT64_BYTES: number;
    /**
     * Metrics representing number of bytes.Evaluates to 2.
     */
    static METRICS_BYTES: number;
    /**
     * Metrics representing number of UTF8 characters.Evaluates to 1.
     */
    static METRICS_CHARS
    /**
     * ByteBuffer version.
     */
    static VERSION: string;

    /**
     * Backing buffer.
     */
    buffer: ArrayBuffer;

    /**
     * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
     */
    limit: number;

    /**
     * Whether to use little endian byte order, defaults to false for big endian.
     */
    littleEndian: boolean;

    /**
     * Marked offset.
     */
    markedOffset: number;

    /**
     * Whether to skip assertions of offsets and values, defaults to false.
     */
    noAssert: boolean;

    /**
     * Absolute read/write offset.
     */
    offset: number;

    /**
     * Data view to manipulate the backing buffer. Becomes null if the backing buffer has a capacity of 0.
     */
    view:DataView;

    /**
     * Switches (to) big endian byte order.
     */
    static BE( bigEndian?: boolean ): ByteBuffer;

    /**
     * Switches (to) little endian byte order.
     */
    static LE( bigEndian?: boolean ): ByteBuffer;

    /**
     * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended data's length.
     */
    static append( source: ByteBuffer | ArrayBuffer | Uint8Array | string, encoding?: string | number, offset?: number ): ByteBuffer;

    /**
     * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
     */
    static allocate( capacity?: number, littleEndian?: number, noAssert?: boolean ): ByteBuffer;

    static calculateUTF8Char(charCode:number):number;

    static calculateUTF8String(str:string):number;

    static calculateVariant32(value:number):number;

    static calculateVariant64(value:number):number;

    static decode64(str:string, littleEndian?:boolean):ByteBuffer;

    static decodeHex(str:string, littleEndian?:boolean):ByteBuffer;

    static decodeUTF8Char(str:string, offset:number):{char:number; length:number};

    static encode64(bb:ByteBuffer):string;

    static encodeUTF8Char(charCode:number, dst:ByteBuffer, offset:number):number;

    /**
     * Wraps a buffer or a string. Sets the allocated ByteBuffer's ByteBuffer#offset to 0 and its ByteBuffer#limit to the length of the wrapped data.
     * @param buffer Anything that can be wrapped
     * @param encoding String encoding if buffer is a string ("base64", "hex", "binary", defaults to "utf8")
     * @param littleEndian Whether to use little or big endian byte order. Defaults to ByteBuffer.DEFAULT_ENDIAN.
     * @param noAssert Whether to skip assertions of offsets and values. Defaults to ByteBuffer.DEFAULT_NOASSERT.
     */
    static wrap( buffer: ByteBuffer | ArrayBuffer | Uint8Array | string, enc?: string | boolean, littleEndian?: boolean, noAssert?: boolean ): ByteBuffer;

    static zigZagDecode32(n:number):number;

    static zigZagDecode64(n:number):Long;

    static zigZagEncode32(n:number):number;

    static zigZagEncode64(n:number):Long;

    append(src:any, offset?:number):ByteBuffer;

    capacity(): number;

    /**
     * Clears this ByteBuffer's offsets by setting ByteBuffer#offset to 0 and
     * ByteBuffer#limit to the backing buffer's capacity. Discards ByteBuffer#markedOffset.
     */
    clear(): ByteBuffer;

    clone():ByteBuffer;

    compact():ByteBuffer;

    copy():ByteBuffer;

    destroy():ByteBuffer;

    ensureCapacity(capacity:number):ByteBuffer;

    flip():ByteBuffer;

    LE(littleEndian?:boolean):ByteBuffer;

    mark(offset?:number):ByteBuffer;

    prepend( src: any, offset?: number ): ByteBuffer;

    prependTo( target: ByteBuffer, offset?: number ): ByteBuffer;

    printDebug(out?:(string)=>void):void;

    readByte(offset?:number):number;

    readCString(offset?:number):string;

    readDouble(offset?:number):number;

    readFloat(offset?:number):number;

    readFloat32(offset?:number):number;

    readFloat64(offset?:number):number;

    readInt(offset?:number):number;

    readInt8(offset?:number):number;

    readInt16(offset?:number):number;

    readInt32(offset?:number):number;

    readInt64( offset?: number ): number;

    readIString( offset?: number ): string;

    readJSON(offset?:number, parse?:(string)=>void):any;

    readLong(offset?:number):Long;

    readLString(offset?:number):any;

    readShort(offset?:number):number;

    readUint8(offset?:number):number;

    readUint16(offset?:number):number;

    readUint32(offset?:number):number;

    readUint64(offset?:number):Long;

    readUTF8String(chars:number, offset?:number):string;

    readUTF8StringBytes(length:number, offset?:number):string;

    readVarint(offset?:number):number;

    readVarint32(offset?:number):number;

    readVarint64(offset?:number):Long;

    readVString(offset?:number):string;

    readZigZagVarint(offset?:number):number;

    readZigZagVarint32(offset?:number):number;

    readZigZagVarint64(offset?:number):Long;

    remaining():number;

    reset():ByteBuffer;

    resize(capacity:number):ByteBuffer;

    reverse():ByteBuffer;

    slice( begin?: number, end?: number ): ByteBuffer;

    skip( length: number ): ByteBuffer;

    toArrayBuffer( forceCopy?: boolean ): ArrayBuffer;

    toBase64():string;

    toBuffer( forceCopy?: boolean ): ArrayBuffer;

    toColumns(wrap?:number):string;

    toHex(debug?:boolean):string;

    toString(enc?:string):string;

    toUTF8():string;

    writeByte(value:number, offset?:number):ByteBuffer;

    writeCString(str:string, offset?:number):ByteBuffer;

    writeDouble(value:number, offset?:number):ByteBuffer;

    writeFloat(value:number, offset?:number):ByteBuffer;

    writeFloat32(value:number, offset?:number):ByteBuffer;

    writeFloat64(value:number, offset?:number):ByteBuffer;

    writeInt(value:number, offset?:number):ByteBuffer;

    writeInt8(value:number, offset?:number):ByteBuffer;

    writeInt16(value:number, offset?:number):ByteBuffer;

    writeInt32(value:number, offset?:number):ByteBuffer;

    writeInt64( value: number, offset?: number ): ByteBuffer;

    writeIString( str: string, offset?: number ): ByteBuffer;

    writeJSON(data:any, offset?:number, stringify?:any):ByteBuffer;

    writeLong(value:number, offset?:number):ByteBuffer;

    writeLString(str:string, offset?:number):ByteBuffer;

    writeShort(value:number, offset?:number):ByteBuffer;

    writeUint8(value:number, offset?:number):ByteBuffer;

    writeUint16(value:number, offset?:number):ByteBuffer;

    writeUint32(value:number, offset?:number):ByteBuffer;

    writeUint64(value:number, offset?:number):ByteBuffer;

    writeUTF8String(str:string, offset?:number):ByteBuffer;

    writeVarint(value:number, offset?:number):ByteBuffer;

    writeVarint32(value:number, offset?:number):ByteBuffer;

    writeVarint64(value:number, offset?:number):ByteBuffer;

    writeVString(str:string, offset?:number):ByteBuffer;

    writeZigZagVarint(value:number, offset?:number):ByteBuffer;

    writeZigZagVarint32(value:number, offset?:number):ByteBuffer;

    writeZigZagVarint64(value:number, offset?:number):ByteBuffer;
}

declare module 'bytebuffer' {
    export = ByteBuffer;
}
