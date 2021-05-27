
export default function Input({label, error, ...rest}) {
    return (
        <div className={error?"error":""}>
            <label className="label">{label}</label>
            <input className="input" {...rest}></input>
        </div>
    )
}
