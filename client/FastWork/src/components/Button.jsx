export default function Button({
    text,
    onClick,
    color="#2563eb"
}){

    return(

        <button
            onClick={onClick}
            style={{
                background:color,
                color:"white",
                padding:"10px 20px",
                border:"none",
                borderRadius:"8px",
                cursor:"pointer"
            }}
        >

            {text}

        </button>

    );

}