export default function joinStyles(...args){
    return args.filter(e=>e).join(" ");
}