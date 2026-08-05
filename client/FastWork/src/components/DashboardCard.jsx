export default function DashboardCard({

    title,

    value

}){

    return(

        <div
            style={{
                background:"#1f2937",
                padding:"20px",
                borderRadius:"10px",
                textAlign:"center"
            }}
        >

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

}