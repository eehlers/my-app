#!/usr/bin/env python3

from contextlib import contextmanager
import os

from hwilib.serializations import PSBT
from hwilib.hwwclient import HardwareWalletClient
from hwilib import commands
from hwilib.devices import coldcard, ledger, trezor, checksig

NETWORK = "regtest"
network_marker = ""
if NETWORK != "mainnet":
    network_marker = "-" + NETWORK
ENV = "test06"
ENV_NET = ENV + network_marker
TX_DATA_FOLDER = "tx_data" + network_marker
FRZN = "frzn"
FRZN_FEDE = FRZN + "_fede"
KEYCHAIN_TXTYPE_DICT = {
    #COLD_CUST: ENV_NET + "-" + COLD_CUST,
    #COLD_RECO: ENV_NET + "-" + COLD_RECO,
    #FRZN_AUTH: ENV_NET + "-" + FRZN_AUTH,
    FRZN_FEDE: ENV_NET + "-" + FRZN_FEDE,
    #FRZN_RECO: ENV_NET + "-" + FRZN_RECO,
}
STATE_PSBT = "-psbt"
STATE_SIGN = "-sign"

def psbt_filename(txid, keychain, state, device_fingerprint = None):
    "Return the full filename of a transaction."
    keychain = keychain.lower()
    filename = os.path.join(TX_DATA_FOLDER, KEYCHAIN_TXTYPE_DICT[keychain] + state)
    if device_fingerprint is not None:
        filename += "-" + device_fingerprint
    return filename + "." + txid[:8]

def read_psbt(txid, keychain, state):
    filename = psbt_filename(txid, keychain, state)
    with open(filename) as f:
        s = f.read()
    psbt = PSBT()
    psbt.deserialize(s)
    return psbt

def write_psbt(txid, psbt, keychain, state, device_fingerprint = None):
    filename = psbt_filename(txid, keychain, state, device_fingerprint)
    with open(filename, "w") as f:
        f.write(psbt.serialize())

def _get_client(device, testnet):
    "Turn hwi device into a client instance that can interact with the device"
    if device["type"] == "ledger":
        client = ledger.LedgerClient(device["path"])
    elif device["type"] == "coldcard":
        client = coldcard.ColdcardClient(device["path"])
    elif device["type"] == "trezor":
        client = trezor.TrezorClient(device["path"])
    elif device["type"] == "checksig":
        client = checksig.SoftwareClient(device["path"])
    else:
        raise ValueError(f'Unsupported device: {device["type"]}')
    client.is_testnet = testnet
    return client

@contextmanager
def get_client(testnet):
    "Create client for plugged-in hardware wallet"

    devices = commands.enumerate()
    n = len(devices)
    assert n > 0, "no device connected"
    assert n == 1, f"{n} devices connected: only one device allowed for now"
    device = devices[0]
    try:
        client = _get_client(device, testnet)
        yield (client, device["fingerprint"])
    finally:
        client.close()

def sign(txid, keychain, device_index = None):
    "Add a signature to a PSBT"

    keychain = keychain.lower()
    psbt = read_psbt(txid, keychain, STATE_PSBT)

    is_testnet = NETWORK != "mainnet"
    with get_client(is_testnet) as (client, device_fingerprint):
        unsigned = psbt.serialize()
        #if keychain == FRZN_FEDE:
        #    if AUTH_KEY not in psbt.unknown:
        #        raise RuntimeError("PSBT not authorized")
        raw_psbt = client.sign_tx(psbt)["psbt"]
        assert raw_psbt != unsigned, "PSBT did not change"
        psbt = PSBT()
        psbt.deserialize(raw_psbt)

    write_psbt(txid, psbt, keychain, STATE_SIGN, device_fingerprint)
    return psbt

txid = "9a9a47f3da0469fac0193af00da484e9350763bf5bf3c30229696203127e7da6"
keychain = "frzn_fede"
sign(txid, keychain)
#sign(txid, keychain, "a7d7d1a0")
print("Sign done")

