
export class Container{
    private services: Map<string, unknown>;

    constructor() {
        this.services = new Map<string,unknown>();
    }

    public set<T extends object>(service:T){
        if (this.has(service.constructor.name)){
            throw new Error(`Service with name [${service.constructor.name}] already exists.`);
        }
        this.services.set(service.constructor.name,service);
    }

    public get<T>(className:new (... args:any[]) => T ):T{
        if (this.has(className.name)){
            return this.services.get(className.name) as T;
        }
        else {
            throw new Error(`Service with name [${className.name}] does not exist.`);
        }

    }

    public has(className:string ):boolean{
        return this.services.has(className);
    }




}