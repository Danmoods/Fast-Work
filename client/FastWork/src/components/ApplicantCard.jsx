export default function ApplicantCard({

    workerId,

    status,

    children

}){

    return(

        <div
            style={{
                border:"1px solid gray",
                padding:"15px",
                marginBottom:"15px",
                borderRadius:"8px"
            }}
        >

            <p>

                <strong>Worker ID:</strong>

                {workerId}

            </p>

            <p>

                <strong>Status:</strong>

                {status}

            </p>

            {children}

        </div>

    );

}