import { IPlatformConfig } from './types/IPlatformConfig';
import { IHttpStatic } from './types/http';
import { TransportInitialiser } from './lib/transport/connectionmanager';
import IDefaults from './types/IDefaults';
import IWebStorage from './types/IWebStorage';
import IBufferUtils from './types/IBufferUtils';
import * as WebBufferUtils from '../platform/web/lib/util/bufferutils';
import * as NodeBufferUtils from '../platform/nodejs/lib/util/bufferutils';
import { IUntypedCryptoStatic } from '../common/types/ICryptoStatic';
import TransportName from './constants/TransportName';
import { VcdiffDecoder } from './lib/types/message';

type Bufferlike = WebBufferUtils.Bufferlike | NodeBufferUtils.Bufferlike;
type BufferUtilsOutput = WebBufferUtils.Output | NodeBufferUtils.Output;
type ToBufferOutput = WebBufferUtils.ToBufferOutput | NodeBufferUtils.ToBufferOutput;

export type TransportImplementations = Partial<Record<TransportName, TransportInitialiser>>;

export default class Platform {
  static Config: IPlatformConfig;
  /*
     What we actually _want_ is for Platform to be a generic class
     parameterised by Bufferlike etc, but that requires far-reaching changes to
     components that make use of Platform. So instead we have to advertise a
     BufferUtils object that accepts a broader range of data types than it
     can in reality handle.
   */
  static BufferUtils: IBufferUtils<Bufferlike, BufferUtilsOutput, ToBufferOutput>;
  /*
     We’d like this to be ICryptoStatic with the correct generic arguments,
     but Platform doesn’t currently allow that, as described in the BufferUtils
     comment above.
   */
  static Crypto: IUntypedCryptoStatic | null;
  static Http: IHttpStatic;
  static Transports: {
    order: TransportName[];
    // Transport implementations that always come with this platform
    bundledImplementations: TransportImplementations;
  };
  static Defaults: IDefaults;
  static WebStorage: IWebStorage | null;
  static Vcdiff:
    | { supported: false; errorMessage: string /* explains why this platform does not support vcdiff */ }
    | {
        supported: true;
        bundledDecode: VcdiffDecoder | null /* { supported: true, bundledDecode: null } means that the decode implementation can be provided via ModulesMap */;
      };
}
