export function Avatar({name}:{name:string}){
    return( <div className="flex items-center justify-center w-full mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-bold text-xl">
          {name[0].toUpperCase()}
        </div>
      </div>)
}