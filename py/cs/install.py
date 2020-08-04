#!/usr/bin/env python3

DEFAULT_ALIGNMENT = 1024
PAGE_ALIGNMENT = 64

import os

#python -m ledgerblue.loadApp --curve secp256k1 --tlv --targetId 0x31100004 --delete --fileName bin/app.hex --appName "Bitcoin" --appVersion 1.3.18 --dataSize 64 --icon $ICON --path "" --appFlags 0xa50 --targetVersion 1.6.0

#SCP_PRIVKEY=f40462f8af76350149aaa4d8f788fd9b9823c0e2f15d5f99d7919267747cec6d
#SIGNATURE0=304402207cb93364c87bbe6a810836dff9884075ac6b0cd6f08741bc5edf130d2e2523a4022015a42245c3e31b67899d0e6fc3bb785a097f0c40d94ea28f2cced63961fddfa0
#SIGNATURE1=3045022100a89b3a9767546160244ed82874ec658017d4c330fa21e4926190800d5f659a690220158fa7e8b3eaf3151e8ef8d84da8763fc5cdd008edf9fbedf4b5456b27e90670
#SIGNATURE2=3045022100b20695e02d7fbd6410922082824a81f0bad8ae9236c72df80cdde5f77d5140db022078022128fa82c766036f2b999f2afa63af6b4233d0dd3c5026f630529b2c6d4c
#
#python -m ledgerblue.loadApp --curve secp256k1 --tlv --targetId 0x31100004 --delete --fileName ../custom-bitcoin-app/docker-build/bin/$APP_NAME/$BUILD_DATE/app.hex --appName $APP_NAME --appVersion 1.3.18 --dataSize 64 --icon 010000000000ffffffffffffffffffffff83c183c1f3f9f3c1f3c1f3cf83c183c1ffffffffffffffff --rootPrivateKey $SCP_PRIVKEY --path "" --appFlags 0xa50 --targetVersion 1.6.0-cs --signature $SIGNATURE0 --signature $SIGNATURE1 --signature $SIGNATURE2

#(Pdb) print(args)
#Namespace(apdu=False, apilevel=None, appFlags=2640, appName='Bitcoin', appVersion='1.3.18', bootAddr=None, curve=['secp256k1'], dataSize=64, delete=True, dep=None, deployLegacy=False, fileName='bin/app.hex', icon='010000000000ffffffffffffffffffbffe0ffc9ff99ff91ff89ff19ff39ff10ff8bffeffffffffffff', installparamsSize=None, nocrc=False, offline=None, offlineText=False, params=False, path=[''], path_slip21=None, rootPrivateKey=None, signApp=False, signApp2=None, signPrivateKey=None, signature=None, targetId=823132164, targetVersion='1.6.0', tlv=True, tlvraw=None)
class Foo:
    def __init__(self):
        self.apdu = False
        self.apilevel = None
        self.appFlags = 2640
        #self.appName = "Bitcoin"
        self.appName = "test06-regtest"
        self.appVersion = "1.3.18"
        self.bootAddr = None
        self.curve = ["secp256k1"]
        self.dataSize = 64
        self.delete = True
        self.dep = None
        self.deployLegacy = False
        self.fileName = "bin/app.hex"
        #self.icon = "010000000000ffffffffffffffffffbffe0ffc9ff99ff91ff89ff19ff39ff10ff8bffeffffffffffff"
        self.icon = "010000000000ffffffffffffffffffffff83c183c1f3f9f3c1f3c1f3cf83c183c1ffffffffffffffff"
        self.installparamsSize = None
        self.nocrc = False
        self.offline = None
        self.offlineText = False
        self.params = False
        self.path = [""]
        self.path_slip21 = None
        self.rootPrivateKey = "f40462f8af76350149aaa4d8f788fd9b9823c0e2f15d5f99d7919267747cec6d"
        self.signApp = False
        self.signApp2 = None
        self.signPrivateKey = None
        #self.signature = None
        self.signature = ["304402207cb93364c87bbe6a810836dff9884075ac6b0cd6f08741bc5edf130d2e2523a4022015a42245c3e31b67899d0e6fc3bb785a097f0c40d94ea28f2cced63961fddfa0","3045022100a89b3a9767546160244ed82874ec658017d4c330fa21e4926190800d5f659a690220158fa7e8b3eaf3151e8ef8d84da8763fc5cdd008edf9fbedf4b5456b27e90670","3045022100b20695e02d7fbd6410922082824a81f0bad8ae9236c72df80cdde5f77d5140db022078022128fa82c766036f2b999f2afa63af6b4233d0dd3c5026f630529b2c6d4c"]
        self.targetId = 823132164
        #self.targetVersion = "1.6.0"
        self.targetVersion = "1.6.0-cs"
        self.tlv = True
        self.tlvraw = None

NOCRC=False
#if "NOCRC" in os.environ and len(os.environ["NOCRC"]) != 0:
#    NOCRC=os.environ["NOCRC"]
#
#def get_argparser():
#    parser = argparse.ArgumentParser(description="Load an app onto the device from a hex file.")
#    parser.add_argument("--targetId", help="The device's target ID (default is Ledger Blue)", type=auto_int)
#    parser.add_argument("--targetVersion", help="Set the chip target version")
#    parser.add_argument("--fileName", help="The application hex file to be loaded onto the device")
#    parser.add_argument("--icon", help="The icon content to use (hex encoded)")
#    parser.add_argument("--curve", help="""A curve on which BIP 32 derivation is locked ("secp256k1", "prime256r1", or
#"ed25519"), can be repeated""", action='append')
#    parser.add_argument("--path", help="""A BIP 32 path to which derivation is locked (format decimal a'/b'/c), can be
#repeated""", action='append')
#    parser.add_argument("--path_slip21", help="""A SLIP 21 path to which derivation is locked""", action='append')
#    parser.add_argument("--appName", help="The name to give the application after loading it")
#    parser.add_argument("--signature", help="A signature of the application (hex encoded)", action='append')
#    parser.add_argument("--signApp", help="Sign application with provided signPrivateKey", action='store_true')
#    parser.add_argument("--signApp2", help="Sign application with provided signPrivateKey")
#    parser.add_argument("--appFlags", help="The application flags", type=auto_int)
#    parser.add_argument("--bootAddr", help="The application's boot address", type=auto_int)
#    parser.add_argument("--rootPrivateKey", help="""The Signer private key used to establish a Secure Channel (otherwise
#a random one will be generated)""")
#    parser.add_argument("--signPrivateKey", help="Set the private key used to sign the loaded app")
#    parser.add_argument("--apdu", help="Display APDU log", action='store_true')
#    parser.add_argument("--deployLegacy", help="Use legacy deployment API", action='store_true')
#    parser.add_argument("--apilevel", help="Use given API level when interacting with the device", type=auto_int)
#    parser.add_argument("--delete", help="Delete the app with the same name before loading the provided one", action='store_true')
#    parser.add_argument("--params", help="Store icon and install parameters in a parameter section before the code", action='store_true')
#    parser.add_argument("--tlv", help="Use install parameters for all variable length parameters", action='store_true')
#    parser.add_argument("--dataSize", help="The code section's size in the provided hex file (to separate data from code, if not provided the whole allocated NVRAM section for the application will remain readonly.", type=auto_int)
#    parser.add_argument("--appVersion", help="The application version (as a string)")
#    parser.add_argument("--offline", help="Request to only output application load APDUs into given filename")
#    parser.add_argument("--offlineText", help="Request to only output application load APDUs into given filename in text mode", action='store_true')
#    parser.add_argument("--installparamsSize", help="The loaded install parameters section size (when parameters are already included within the .hex file.", type=auto_int)
#    parser.add_argument("--tlvraw", help="Add a custom install param with the hextag:hexvalue encoding", action='append')
#    parser.add_argument("--dep", help="Add a dependency over an appname[:appversion]", action='append')
#    parser.add_argument("--nocrc", help="Skip CRC generation when loading", action='store_true')
#
#    return parser

def auto_int(x):
    return int(x, 0)

def parse_bip32_path(path, apilevel):
        import struct
        if len(path) == 0:
                return b""
        result = b""
        elements = path.split('/')
        if apilevel >= 5:
            result = result + struct.pack('>B', len(elements))
        for pathElement in elements:
                element = pathElement.split('\'')
                if len(element) == 1:
                        result = result + struct.pack(">I", int(element[0]))
                else:
                        result = result + struct.pack(">I", 0x80000000 | int(element[0]))
        return result

def parse_slip21_path(path):
    import struct
    result = struct.pack('>B', 0x80 | (len(path) + 1))
    result = result + b'\x00' + string_to_bytes(path)
    return result

def string_to_bytes(x):
    import sys
    if sys.version_info.major == 3:
        return bytes(x, 'ascii')
    else:
        return bytes(x)

def f():
    from ledgerblue.ecWrapper import PrivateKey
    from ledgerblue.comm import getDongle
    from ledgerblue.hexParser import IntelHexParser, IntelHexPrinter
    from ledgerblue.hexLoader import HexLoader, encodetlv, BOLOS_TAG_APPNAME, BOLOS_TAG_APPVERSION, BOLOS_TAG_ICON, BOLOS_TAG_DERIVEPATH
    from ledgerblue.deployed import getDeployedSecretV1, getDeployedSecretV2
    import struct
    import binascii
    import sys

    print('Hello from Python!')
    sys.stdout.flush()

#    args = get_argparser().parse_args()
    args = Foo()

    if args.apilevel == None:
        args.apilevel = 10
    if args.targetId == None:
        args.targetId = 0x31000002
    if args.fileName == None:
        raise Exception("Missing fileName")
    if args.appName == None:
        raise Exception("Missing appName")
    if args.path_slip21 != None and args.apilevel < 10:
        raise Exception("SLIP 21 path not supported using this API level")
    if args.appFlags == None:
        args.appFlags = 0
    if args.rootPrivateKey == None:
        privateKey = PrivateKey()
        publicKey = binascii.hexlify(privateKey.pubkey.serialize(compressed=False))
        print("Generated random root public key : %s" % publicKey)
        args.rootPrivateKey = privateKey.serialize()
    
    args.appName = string_to_bytes(args.appName)

    parser = IntelHexParser(args.fileName)
    if args.bootAddr == None:
        args.bootAddr = parser.getBootAddr()

    path = b""
    curveMask = 0xff
    if args.curve != None:
        curveMask = 0x00
        for curve in args.curve:
            if curve == 'secp256k1':
                curveMask |= 0x01
            elif curve == 'prime256r1':
                curveMask |= 0x02
            elif curve == 'ed25519':
                curveMask |= 0x04
            else:
                raise Exception("Unknown curve " + curve)

    if args.apilevel >= 5:        
        if (args.path_slip21 != None):
            curveMask |= 0x08
        path += struct.pack('>B',curveMask)
        if args.path != None:
            for item in args.path:
                if len(item) != 0:
                    path += parse_bip32_path(item, args.apilevel)
        if args.path_slip21 != None:
            for item in args.path_slip21:
                if len(item) != 0:
                    path += parse_slip21_path(item)
            if (args.path == None) or ((len(args.path) == 1) and (len(args.path[0]) == 0)):
                path += struct.pack('>B', 0) # Unrestricted, authorize all paths for regular derivation
    else:
        if args.curve != None:
            print("Curve not supported using this API level, ignoring")
        if args.path != None:
            if len(args.path) > 1:
                print("Multiple path levels not supported using this API level, ignoring")
            else:
                path = parse_bip32_path(args.path[0], args.apilevel)

    if not args.icon is None:
        args.icon = bytearray.fromhex(args.icon)
    
    signature = None
    if not args.signature is None:
        signature = []
        for sig in args.signature:
            signature.append(bytearray.fromhex(sig))
    
    #prepend app's data with the icon content (could also add other various install parameters)
    printer = IntelHexPrinter(parser)

    # Use of Nested Encryption Key within the SCP protocol is mandartory for upgrades
    cleardata_block_len=None
    if args.appFlags & 2:
        # Not true for scp < 3
        # if signature is None:
        #     raise BaseException('Upgrades must be signed')

        # ensure data can be decoded with code decryption key without troubles.
        cleardata_block_len = 16

    dongle = None
    secret = None
    if not args.offline:
        dongle = getDongle(args.apdu)

        if args.deployLegacy:
            secret = getDeployedSecretV1(dongle, bytearray.fromhex(args.rootPrivateKey), args.targetId)
        else:
            secret = getDeployedSecretV2(dongle, bytearray.fromhex(args.rootPrivateKey), args.targetId)
    else:
        fileTarget = open(args.offline, "wb")
        class FileCard():
            def __init__(self, target):
                self.target = target
            def exchange(self, apdu):
                if (args.apdu):
                    print(binascii.hexlify(apdu))
                apdu = binascii.hexlify(apdu)
                if sys.version_info.major == 2:
                    self.target.write(str(apdu) + '\n')
                else:
                    self.target.write(apdu + '\n'.encode())
                return bytearray([])
            def apduMaxDataSize(self):
                # ensure to allow for encryption of those apdu afterward
                return 240
        dongle = FileCard(fileTarget)

    loader = HexLoader(dongle, 0xe0, not(args.offline), secret, cleardata_block_len=cleardata_block_len)

    #tlv mode does not support explicit by name removal, would require a list app before to identify the hash to be removed
    if (not (args.appFlags & 2)) and args.delete:
            loader.deleteApp(args.appName)

    if (args.tlv):
        #if code length is not provided, then consider the whole provided hex file is the code and no data section is split
        code_length = printer.maxAddr() - printer.minAddr()
        if not args.dataSize is None:
            code_length -= args.dataSize
        else:
            args.dataSize = 0

        installparams = b""

        # express dependency
        if (args.dep):
            for dep in args.dep:
                appname = dep
                appversion = None
                # split if version is specified
                if (dep.find(":") != -1):
                    (appname,appversion) = dep.split(":")
                depvalue = encodelv(string_to_bytes(appname))
                if(appversion):
                    depvalue += encodelv(string_to_bytes(appversion))
                installparams += encodetlv(BOLOS_TAG_DEPENDENCY, depvalue)

        #add raw install parameters as requested
        if (args.tlvraw):
            for tlvraw in args.tlvraw:
                (hextag,hexvalue) = tlvraw.split(":")
                installparams += encodetlv(int(hextag, 16), binascii.unhexlify(hexvalue))

        if (not (args.appFlags & 2)) and ( args.installparamsSize is None or args.installparamsSize == 0 ):
            #build install parameters
            #mandatory app name
            installparams += encodetlv(BOLOS_TAG_APPNAME, args.appName)
            if not args.appVersion is None:
                installparams += encodetlv(BOLOS_TAG_APPVERSION, string_to_bytes(args.appVersion))
            if not args.icon is None:
                installparams += encodetlv(BOLOS_TAG_ICON, bytes(args.icon))
            if len(path) > 0:
                installparams += encodetlv(BOLOS_TAG_DERIVEPATH, path)

            # append install parameters to the loaded file
            param_start = printer.maxAddr()+(PAGE_ALIGNMENT-(args.dataSize%PAGE_ALIGNMENT))%PAGE_ALIGNMENT
            # only append install param section when not an upgrade as it has already been computed in the encrypted and signed chunk
            printer.addArea(param_start, installparams)
            paramsSize = len(installparams)
        else:
            paramsSize = args.installparamsSize
            # split code and install params in the code
            code_length -= args.installparamsSize
        # create app
        #ensure the boot address is an offset
        if args.bootAddr > printer.minAddr():
            args.bootAddr -= printer.minAddr()
        loader.createApp(code_length, args.dataSize, paramsSize, args.appFlags, args.bootAddr|1)
    elif (args.params):
        paramsSectionContent = []
        if not args.icon is None:
            paramsSectionContent = args.icon
        #take care of aligning the parameters sections to avoid possible invalid dereference of aligned words in the program nvram.
        #also use the default MPU alignment
        param_start = printer.minAddr()-len(paramsSectionContent)-(DEFAULT_ALIGNMENT-(len(paramsSectionContent)%DEFAULT_ALIGNMENT))
        printer.addArea(param_start, paramsSectionContent)
        # account for added regions (install parameters, icon ...)
        appLength = printer.maxAddr() - printer.minAddr()
        loader.createAppNoInstallParams(args.appFlags, appLength, args.appName, None, path, 0, len(paramsSectionContent), string_to_bytes(args.appVersion))
    else:
        # account for added regions (install parameters, icon ...)
        appLength = printer.maxAddr() - printer.minAddr()
        loader.createAppNoInstallParams(args.appFlags, appLength, args.appName, args.icon, path, None, None, string_to_bytes(args.appVersion))


    hash = loader.load(0x0, 0xF0, printer, targetId=args.targetId, targetVersion=args.targetVersion, doCRC=not (args.nocrc or NOCRC)) 

    print("Application full hash : " + hash)

    if (signature == None and args.signApp):
        masterPrivate = PrivateKey(bytes(bytearray.fromhex(args.signPrivateKey)))
        signature = masterPrivate.ecdsa_serialize(masterPrivate.ecdsa_sign(bytes(binascii.unhexlify(hash)), raw=True))
        print("Application signature: " + str(binascii.hexlify(signature)))
        signature = [ signature ]

    if (signature == None and args.signApp2):
        apduMessage = "E003"
        apdu = bytearray.fromhex(apduMessage)
        apdu.extend(parse_bip32_path(args.signApp2, args.apilevel))
        apdu.extend(binascii.unhexlify(hash))
        dongle = getDongle(True)
        signature = dongle.exchange(apdu)
        print("Application signature: " + str(binascii.hexlify(signature)))
        signature = [ signature ]

    if (args.tlv):
        loader.commit(signature)
    else:
        loader.run(args.bootAddr-printer.minAddr(), signature)

if __name__ == '__main__':
    f()

