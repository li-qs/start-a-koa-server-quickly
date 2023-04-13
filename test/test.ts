import 'reflect-metadata'

const classArr = []

@Controller('/test')
class Test {
    id: string

    @Action('get', '/set-id')
    setId(id: string) {
        console.log('setId', id)
        this.id = id
    }

    getId() {
        console.log('getId', this.id)
        return this.id
    }

    static say(s) {
        console.log('say', s)
    }
}

// const test = new Test()

function Controller(prefix: string) {
    return function (target: any) {
        Reflect.defineMetadata('prefix', prefix, target)
        classArr.push(target)
    }
}

function Action(method: string, path: string) {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        Reflect.defineMetadata('method', method, descriptor.value)
        Reflect.defineMetadata('path', path, descriptor.value)
    }
}

// const keys = Reflect.getMetadataKeys(classArr[0])
// const values = Reflect.getMetadata('prefix', classArr[0])
// console.log('keys', keys, values)

const instance = new classArr[0]()
console.log(instance)
console.log(Reflect.ownKeys(Test.prototype))
console.log(typeof instance.getId)
// const mkeys = Reflect.getMetadataKeys(instance.setId)
// const mvalue = Reflect.getMetadata('method', instance.setId)
// const mvalue2 = Reflect.getMetadata('path', instance.setId)
// console.log('mkeys', mkeys, mvalue, mvalue2)
// instance.setId('123')
// instance.getId()
