


export const post = (path: string, args: any, callback: (data: any) => void) => {
    const CREDENTIALS = {
        method:'POST',
        body: JSON.stringify(args),
        headers: new Headers()
    }

    fetch(path, CREDENTIALS)
        .then( res => res.json() )
        .then(data => callback(data) );
}

export const get = (path: string, callback: (data: any) => void ) => {
    fetch(path)
        .then( res => res.json() )
        .then(data => callback(data) );
}