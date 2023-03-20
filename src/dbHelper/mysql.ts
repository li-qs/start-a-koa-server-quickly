import { DataSource } from 'typeorm'
import { mainDataSource } from '../config'

const dataResource = new DataSource(mainDataSource)
dataResource
    .initialize()
    .then(() => {
        console.log('MySQL has been initialized!')
    })
    .catch((e) => {
        console.error('Error during MySQL initialization\n', e)
    })

export const mysql = dataResource
