// main.js

// import all dependencies:
import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'

export const updateProfileOnCeramic = async() => {
    try {
        if (window.ethereum == null) {
            return
            // throw new Error('No injected Ethereum provider found')
        }

        // create a new CeramicClient instance:
        const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")

        // reference the data models this application will use:
        const aliases = {
            schemas: {
                basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudarykf6ly9vx21hqu4r6k1jqio',

            },
            definitions: {
                BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
            },
            tiles: {},
        }

        // configure the datastore to use the ceramic instance and data models referenced above:
        const datastore = new DIDDataStore({ ceramic, model: aliases })



        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })

        const authProvider = new EthereumAuthProvider(window.ethereum, accounts[0])
        console.log(authProvider)
        const session = new DIDSession({ authProvider })

        const did = await session.authorize()
        console.log(did)
        ceramic.did = did


        // upload
        const name = '11'
        const country = '222'
        const gender = 'female'

        // object needs to conform to the datamodel
        // name -> exists
        // hair-color -> DOES NOT EXIST
        const updatedProfile = {
            name,
            country,
            gender
        }
        // use the DIDDatastore to merge profile data to Ceramic
        await datastore.merge('BasicProfile', updatedProfile)

        // use the DIDDatastore to get profile data from Ceramic
        const profile = await datastore.get('BasicProfile')
        console.log(profile)
    } catch (error) {
        console.error(error)
    }
}
export const updateInfoOnCeramic = async() => {
    await updateProfileOnCeramic()
}
