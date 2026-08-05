export default function JobCard({

    title,
    description,
    salary,
    location,
    onClick,
    children

}){

    return(

        <div
            className="job-card"
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >

            <h3>{title}</h3>

            <p>{description}</p>

            <p><strong>Salary:</strong> KES {salary}</p>

            <p><strong>Location:</strong> {location}</p>

            {children}

        </div>

    );

}